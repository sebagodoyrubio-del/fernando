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
  const maxGen = generations;
  const levels: FlatNode[][] = [];
  let current: Array<PedigreeNode | undefined> = [sire, dam];

  for (let gen = 1; gen <= maxGen; gen++) {
    const level: FlatNode[] = current.map((n, index) => ({
      key: `${gen}-${index}`,
      name: getNodeName(n),
      gen,
      index,
    }));
    levels.push(level);
    const next: Array<PedigreeNode | undefined> = [];
    for (const n of current) {
      next.push(n?.sire);
      next.push(n?.dam);
    }
    current = next;
  }

  return levels;
}

export function PedigreeDiagram({ sire, dam, generations = 3 }: Props) {
  const levels = buildLevels(sire, dam, generations);

  const maxGen = generations;
  const columnWidth = 240;
  const nodeWidth = 210;
  const nodeHeight = 38;
  const xPadding = 20;
  const yPadding = 18;

  const totalSlots = 2 ** maxGen;
  const slotHeight = 64;
  const height = yPadding * 2 + totalSlots * slotHeight;
  const width = xPadding * 2 + maxGen * columnWidth;

  function nodeY(gen: number, index: number) {
    const count = 2 ** gen;
    const localSlot = (height - yPadding * 2) / count;
    return yPadding + (index + 0.5) * localSlot - nodeHeight / 2;
  }

  function nodeX(gen: number) {
    return xPadding + (gen - 1) * columnWidth;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <svg width={width} height={height} className="block">
        {levels.slice(0, maxGen - 1).flatMap((level) =>
          level.flatMap((n) => {
            const fromX = nodeX(n.gen) + nodeWidth;
            const fromY = nodeY(n.gen, n.index) + nodeHeight / 2;
            const nextGen = n.gen + 1;
            const toX = nodeX(nextGen);
            const leftIndex = n.index * 2;
            const rightIndex = n.index * 2 + 1;
            const toY1 = nodeY(nextGen, leftIndex) + nodeHeight / 2;
            const toY2 = nodeY(nextGen, rightIndex) + nodeHeight / 2;

            return [
              <path
                key={`${n.key}-l`}
                d={`M ${fromX} ${fromY} C ${fromX + 28} ${fromY}, ${toX - 28} ${toY1}, ${toX} ${toY1}`}
                fill="none"
                stroke="rgba(87,83,78,0.55)"
                strokeWidth={1.5}
              />,
              <path
                key={`${n.key}-r`}
                d={`M ${fromX} ${fromY} C ${fromX + 28} ${fromY}, ${toX - 28} ${toY2}, ${toX} ${toY2}`}
                fill="none"
                stroke="rgba(87,83,78,0.55)"
                strokeWidth={1.5}
              />,
            ];
          }),
        )}

        {levels.flatMap((level) =>
          level.map((n) => {
            const x = nodeX(n.gen);
            const y = nodeY(n.gen, n.index);
            const isPlaceholder = n.name === "—";
            const fill = isPlaceholder ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.95)";
            const stroke = isPlaceholder ? "rgba(168,162,158,0.7)" : "rgba(120,113,108,0.8)";

            return (
              <g key={n.key}>
                <rect
                  x={x}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx={12}
                  fill={fill}
                  stroke={stroke}
                />
                <text
                  x={x + 12}
                  y={y + 22}
                  fontSize={12}
                  fill={isPlaceholder ? "rgba(120,113,108,0.8)" : "rgba(28,25,23,0.92)"}
                >
                  {n.name.length > 22 ? `${n.name.slice(0, 21)}…` : n.name}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
}
