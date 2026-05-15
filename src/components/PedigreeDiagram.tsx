"use client";

import type { PedigreeNode } from "@/lib/horses";

type Props = {
  sire?: PedigreeNode;
  dam?: PedigreeNode;
  generations?: 1 | 2 | 3;
};

type FlatNode = {
  key: string;
  name: string;
  gen: number;
  index: number;
};

function getNodeName(node: PedigreeNode | undefined) {
  const n = node?.name?.trim();
  return n ? n : "—";
}

function buildLevels(
  sire: PedigreeNode | undefined,
  dam: PedigreeNode | undefined,
  generations: 1 | 2 | 3,
) {
  const levels: FlatNode[][] = [];
  let current: Array<PedigreeNode | undefined> = [sire, dam];

  for (let gen = 1; gen <= generations; gen++) {
    const level: FlatNode[] = current.map((n, index) => ({
      key: `${gen}-${index}`,
      name: getNodeName(n),
      gen,
      index,
    }));
    levels.push(level);
    const next: Array<PedigreeNode | undefined> = [];
    for (const n of current) { next.push(n?.sire); next.push(n?.dam); }
    current = next;
  }
  return levels;
}

/* Paleta rodeo */
const TIER_COLORS = [
  /* gen 1 */ { fill: "#4A2418", stroke: "#9B7A45", text: "#F5E8C8" },  /* caoba */
  /* gen 2 */ { fill: "#6B3A2A", stroke: "#C9A96E", text: "#F5E8C8" },  /* tierra */
  /* gen 3 */ { fill: "#FAF5EC", stroke: "#C9A96E", text: "#4A2418" },  /* crema */
];

export function PedigreeDiagram({ sire, dam, generations = 3 }: Props) {
  const levels = buildLevels(sire, dam, generations);

  const columnWidth = 230;
  const nodeWidth   = 200;
  const nodeHeight  = 36;
  const xPadding    = 16;
  const yPadding    = 16;

  const totalSlots  = 2 ** generations;
  const slotHeight  = 60;
  const height      = yPadding * 2 + totalSlots * slotHeight;
  const width       = xPadding * 2 + generations * columnWidth;

  function nodeY(gen: number, index: number) {
    const count     = 2 ** gen;
    const localSlot = (height - yPadding * 2) / count;
    return yPadding + (index + 0.5) * localSlot - nodeHeight / 2;
  }

  function nodeX(gen: number) {
    return xPadding + (gen - 1) * columnWidth;
  }

  return (
    <div
      style={{
        overflowX: "auto",
        borderRadius: "6px",
        border: "1px solid var(--color-paja-mid)",
        background: "var(--color-crema, #FAF5EC)",
        padding: "0.75rem",
      }}
    >
      <svg width={width} height={height} style={{ display: "block" }}>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(155,122,69,0.5)" />
          </marker>
        </defs>

        {/* ── Conectores ── */}
        {levels.slice(0, generations - 1).flatMap((level) =>
          level.flatMap((n) => {
            const fromX  = nodeX(n.gen) + nodeWidth;
            const fromY  = nodeY(n.gen, n.index) + nodeHeight / 2;
            const nextGen = n.gen + 1;
            const toX    = nodeX(nextGen);
            const toY1   = nodeY(nextGen, n.index * 2)     + nodeHeight / 2;
            const toY2   = nodeY(nextGen, n.index * 2 + 1) + nodeHeight / 2;
            const mid    = fromX + (toX - fromX) * 0.5;

            return [
              <path
                key={`${n.key}-l`}
                d={`M ${fromX} ${fromY} C ${mid} ${fromY}, ${mid} ${toY1}, ${toX} ${toY1}`}
                fill="none"
                stroke="rgba(155,122,69,0.45)"
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />,
              <path
                key={`${n.key}-r`}
                d={`M ${fromX} ${fromY} C ${mid} ${fromY}, ${mid} ${toY2}, ${toX} ${toY2}`}
                fill="none"
                stroke="rgba(155,122,69,0.45)"
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />,
            ];
          })
        )}

        {/* ── Nodos ── */}
        {levels.flatMap((level) =>
          level.map((n) => {
            const x           = nodeX(n.gen);
            const y           = nodeY(n.gen, n.index);
            const placeholder = n.name === "—";
            const tier        = TIER_COLORS[(n.gen - 1) % TIER_COLORS.length]!;

            const fillColor   = placeholder ? "rgba(250,245,236,0.9)" : tier.fill;
            const strokeColor = placeholder ? "rgba(201,169,110,0.5)"  : tier.stroke;
            const textColor   = placeholder ? "rgba(107,58,42,0.5)"   : tier.text;

            const label = n.name.length > 23 ? `${n.name.slice(0, 22)}…` : n.name;

            return (
              <g key={n.key}>
                <rect
                  x={x}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx={4}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={1}
                />
                {/* Gen 1 acento izquierdo */}
                {n.gen === 1 && !placeholder && (
                  <rect x={x} y={y} width={4} height={nodeHeight} rx={2} fill="var(--color-arena, #C9A96E)" />
                )}
                <text
                  x={x + (n.gen === 1 ? 14 : 10)}
                  y={y + nodeHeight / 2 + 4}
                  fontSize={11}
                  fontFamily="'Lato', sans-serif"
                  fontWeight={n.gen === 1 ? "700" : "400"}
                  fill={textColor}
                  letterSpacing="0.02em"
                >
                  {label}
                </text>
              </g>
            );
          })
        )}

        {/* ── Etiquetas de generación ── */}
        {Array.from({ length: generations }, (_, i) => {
          const gen   = i + 1;
          const label = gen === 1 ? "Padres" : gen === 2 ? "Abuelos" : "Bisabuelos";
          return (
            <text
              key={`gen-label-${gen}`}
              x={nodeX(gen) + nodeWidth / 2}
              y={yPadding - 4}
              fontSize={9}
              fontFamily="'Lato', sans-serif"
              fontWeight="700"
              textAnchor="middle"
              fill="rgba(155,122,69,0.75)"
              letterSpacing="0.08em"
              textDecoration="none"
              style={{ textTransform: "uppercase" }}
            >
              {label.toUpperCase()}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
