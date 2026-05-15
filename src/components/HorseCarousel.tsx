"use client";

import type { Horse } from "@/lib/horses";

type Props = {
  horses: Horse[];
  onOpenHorse: (id: string) => void;
  onContactHorse: (id: string) => void;
};

const S = {
  tierra:    "var(--color-tierra)",
  caoba:     "var(--color-caoba)",
  paja:      "var(--color-paja)",
  pajaMid:   "var(--color-paja-mid)",
  arena:     "var(--color-arena)",
  arenaDark: "var(--color-arena-dark)",
  crema:     "var(--color-crema)",
  humo:      "var(--color-humo, #F0E8D8)",
} as const;

export function HorseCarousel({ horses, onOpenHorse, onContactHorse }: Props) {
  return (
    <section
      style={{
        background: "#fff",
        border: `1px solid ${S.pajaMid}`,
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      {/* ── Header de sección ── */}
      <div
        style={{
          background: S.tierra,
          padding: "1.25rem 1.5rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            color: S.paja,
            fontSize: "1.25rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Caballos
        </h2>
        <p style={{ color: S.pajaMid, fontSize: "0.8rem", marginTop: "2px", fontWeight: 300 }}>
          Desliza y abre la ficha completa.
        </p>
      </div>

      {/* ── Carrusel ── */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          padding: "1.25rem 1.5rem 1.5rem",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          scrollbarColor: `${S.arena} ${S.crema}`,
        }}
      >
        {horses.map((h) => (
          <article
            key={h.id}
            style={{
              minWidth: "300px",
              width: "85%",
              maxWidth: "360px",
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
          >
            <div
              style={{
                border: `1px solid ${S.pajaMid}`,
                borderRadius: "6px",
                overflow: "hidden",
                background: S.crema,
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = `0 8px 24px rgba(74,36,24,0.12)`;
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "none";
                el.style.transform = "none";
              }}
            >
              {/* Imagen / placeholder */}
              <button
                onClick={() => onOpenHorse(h.id)}
                style={{
                  display: "block",
                  width: "100%",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background: "none",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/10",
                    background: `linear-gradient(135deg, ${S.tierra} 0%, ${S.arena} 60%, var(--color-campo) 100%)`,
                    overflow: "hidden",
                  }}
                >
                  {/* Patrón diagonal sutil */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.08,
                      backgroundImage: `repeating-linear-gradient(45deg, ${S.paja} 0, ${S.paja} 1px, transparent 1px, transparent 10px)`,
                    }}
                  />
                  {/* Badge Reg */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      left: "0.75rem",
                      background: "rgba(74,36,24,0.75)",
                      backdropFilter: "blur(6px)",
                      border: `1px solid ${S.arena}`,
                      borderRadius: "3px",
                      padding: "3px 10px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: S.paja,
                      letterSpacing: "0.05em",
                    }}
                  >
                    Reg {h.reg}
                  </div>
                  {/* Lote si existe */}
                  {h.lot && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        right: "0.75rem",
                        background: S.arena,
                        borderRadius: "3px",
                        padding: "2px 8px",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: S.caoba,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      Lote {h.lot}
                    </div>
                  )}
                </div>

                {/* Body info */}
                <div style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          color: S.caoba,
                          fontSize: "1rem",
                          margin: 0,
                        }}
                      >
                        {h.name}
                      </h3>
                      <div style={{ color: S.arenaDark, fontSize: "0.8rem", marginTop: "3px", fontWeight: 300 }}>
                        {h.workStatus}
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
                        flexShrink: 0,
                      }}
                    >
                      {h.height}
                    </span>
                  </div>

                  {h.description && (
                    <p
                      style={{
                        marginTop: "0.625rem",
                        fontSize: "0.8rem",
                        lineHeight: 1.6,
                        color: "#666",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontWeight: 300,
                      }}
                    >
                      {h.description}
                    </p>
                  )}
                </div>
              </button>

              {/* Botones */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem",
                  padding: "0 1rem 1rem",
                  borderTop: `1px solid ${S.pajaMid}`,
                  paddingTop: "0.75rem",
                }}
              >
                <button
                  onClick={() => onOpenHorse(h.id)}
                  style={{
                    height: "2.25rem",
                    borderRadius: "3px",
                    border: `1.5px solid ${S.tierra}`,
                    background: "transparent",
                    color: S.tierra,
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "'Lato', sans-serif",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  Ver ficha
                </button>
                <button
                  onClick={() => onContactHorse(h.id)}
                  style={{
                    height: "2.25rem",
                    borderRadius: "3px",
                    border: "none",
                    background: S.tierra,
                    color: S.paja,
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "'Lato', sans-serif",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.82")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  Contactar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
