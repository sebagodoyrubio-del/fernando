"use client";

import { useMemo, useState } from "react";
import type { Horse } from "@/lib/horses";

type Props = {
  horses: Horse[];
  onOpenHorse: (id: string) => void;
  onContactHorse: (id: string) => void;
};

function formatDate(dateIso: string) {
  const [y, m, d] = dateIso.split("-");
  if (!y || !m || !d) return dateIso;
  return `${d}-${m}-${y.slice(2)}`;
}

const S = {
  tierra:     "var(--color-tierra)",
  vino:       "var(--color-vino)",
  caoba:      "var(--color-caoba)",
  campo:      "var(--color-campo)",
  paja:       "var(--color-paja)",
  pajaMid:    "var(--color-paja-mid)",
  arena:      "var(--color-arena)",
  arenaDark:  "var(--color-arena-dark)",
  crema:      "var(--color-crema)",
  humo:       "var(--color-humo, #F0E8D8)",
} as const;

export function HorseNomina({ horses, onOpenHorse, onContactHorse }: Props) {
  const [query, setQuery]   = useState("");
  const [status, setStatus] = useState<string>("Todos");

  const statuses = useMemo(() => {
    const set = new Set<string>();
    for (const h of horses) set.add(h.workStatus);
    return ["Todos", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [horses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return horses.filter((h) => {
      if (status !== "Todos" && h.workStatus !== status) return false;
      if (!q) return true;
      return `${h.name} ${h.reg} ${h.workStatus}`.toLowerCase().includes(q);
    });
  }, [horses, query, status]);

  /* ── shared input style ── */
  const inputStyle: React.CSSProperties = {
    height: "2.5rem",
    borderRadius: "4px",
    border: `1px solid ${S.pajaMid}`,
    background: "#fff",
    padding: "0 1rem",
    fontSize: "0.875rem",
    color: S.caoba,
    outline: "none",
    width: "100%",
    fontFamily: "'Lato', sans-serif",
  };

  return (
    <section
      style={{
        background: "#fff",
        border: `1px solid ${S.pajaMid}`,
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: S.tierra,
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              color: S.paja,
              fontSize: "1.25rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Nómina
          </h2>
          <p style={{ color: S.pajaMid, fontSize: "0.8rem", marginTop: "2px", fontWeight: 300 }}>
            {filtered.length} de {horses.length} caballos
          </p>
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: S.pajaMid, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Buscar
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre, reg, estado…"
              style={{ ...inputStyle, minWidth: "180px" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: S.pajaMid, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Estado
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ ...inputStyle, minWidth: "140px" }}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Tabla desktop ── */}
      <div style={{ overflowX: "auto", display: "none" }} className="md-table-wrapper">
        <style>{`@media(min-width:768px){.md-table-wrapper{display:block!important}.mobile-cards{display:none!important}}`}</style>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ background: S.humo }}>
              {["Nombre", "Reg", "F. nac", "Estado", "Alzada", ""].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "0.65rem 1rem",
                    textAlign: i === 5 ? "right" : "left",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: S.arenaDark,
                    borderBottom: `2px solid ${S.pajaMid}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((h, idx) => (
              <tr
                key={h.id}
                style={{
                  background: idx % 2 === 0 ? "#fff" : S.crema,
                  borderBottom: `1px solid ${S.pajaMid}`,
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FDF6E8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = idx % 2 === 0 ? "#fff" : S.crema)}
              >
                <td style={{ padding: "0.85rem 1rem" }}>
                  <button
                    onClick={() => onOpenHorse(h.id)}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      color: S.tierra,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      padding: 0,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
                  >
                    {h.name}
                  </button>
                </td>
                <td style={{ padding: "0.85rem 1rem", color: S.arenaDark, fontSize: "0.8rem" }}>{h.reg}</td>
                <td style={{ padding: "0.85rem 1rem", color: "#555", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{formatDate(h.birthDate)}</td>
                <td style={{ padding: "0.85rem 1rem" }}>
                  <StatusBadge status={h.workStatus} />
                </td>
                <td style={{ padding: "0.85rem 1rem", color: "#555", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{h.height}</td>
                <td style={{ padding: "0.85rem 1rem", textAlign: "right", whiteSpace: "nowrap" }}>
                  <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                    <ActionBtn variant="outline" onClick={() => onOpenHorse(h.id)}>Ver ficha</ActionBtn>
                    <ActionBtn variant="solid" onClick={() => onContactHorse(h.id)}>Contactar</ActionBtn>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: S.arenaDark, fontSize: "0.875rem" }}>
                  No hay resultados para tu búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Cards mobile ── */}
      <div className="mobile-cards" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.map((h) => (
          <div
            key={h.id}
            style={{
              background: S.crema,
              border: `1px solid ${S.pajaMid}`,
              borderRadius: "6px",
              padding: "1rem",
              borderLeft: `4px solid ${S.tierra}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
              <div>
                <button
                  onClick={() => onOpenHorse(h.id)}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    color: S.tierra,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    padding: 0,
                  }}
                >
                  {h.name}
                </button>
                <div style={{ color: S.arenaDark, fontSize: "0.75rem", marginTop: "2px" }}>
                  Reg {h.reg} · {formatDate(h.birthDate)}
                </div>
              </div>
              <span
                style={{
                  background: S.humo,
                  border: `1px solid ${S.pajaMid}`,
                  borderRadius: "3px",
                  padding: "2px 8px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: S.tierra,
                  whiteSpace: "nowrap",
                }}
              >
                {h.height}
              </span>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <StatusBadge status={h.workStatus} />
            </div>
            <div style={{ marginTop: "0.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <ActionBtn variant="outline" onClick={() => onOpenHorse(h.id)}>Ver ficha</ActionBtn>
              <ActionBtn variant="solid" onClick={() => onContactHorse(h.id)}>Contactar</ActionBtn>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center", color: S.arenaDark, fontSize: "0.875rem" }}>
            No hay resultados para tu búsqueda.
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Sub-components ── */

function StatusBadge({ status }: { status: string }) {
  const isRodeo = /rodeo/i.test(status);
  const isCampo = /campo/i.test(status);
  const bg    = isRodeo ? "#f5e8e8" : isCampo ? "#eef4e8" : "var(--color-humo, #F0E8D8)";
  const color = isRodeo ? "var(--color-vino)" : isCampo ? "var(--color-campo)" : "var(--color-arena-dark)";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "3px",
        background: bg,
        color,
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
}

function ActionBtn({
  variant,
  onClick,
  children,
}: {
  variant: "solid" | "outline";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const solid = variant === "solid";
  return (
    <button
      onClick={onClick}
      style={{
        height: "2.25rem",
        padding: "0 1rem",
        borderRadius: "3px",
        background:     solid ? "var(--color-tierra)" : "transparent",
        color:          solid ? "var(--color-paja)"   : "var(--color-tierra)",
        border:         solid ? "none"                : "1.5px solid var(--color-tierra)",
        fontWeight: 700,
        fontSize: "0.75rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "'Lato', sans-serif",
        transition: "opacity 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.82")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
    >
      {children}
    </button>
  );
}
