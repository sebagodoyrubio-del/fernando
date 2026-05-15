"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import type { Horse } from "@/lib/horses";
import { PedigreeDiagram } from "@/components/PedigreeDiagram";

type Props = {
  horse: Horse | null;
  onClose: () => void;
  onContact: (horseId: string) => void;
};

const S = {
  tierra:    "var(--color-tierra)",
  vino:      "var(--color-vino)",
  caoba:     "var(--color-caoba)",
  paja:      "var(--color-paja)",
  pajaMid:   "var(--color-paja-mid)",
  arena:     "var(--color-arena)",
  arenaDark: "var(--color-arena-dark)",
  crema:     "var(--color-crema)",
  humo:      "var(--color-humo, #F0E8D8)",
} as const;

function formatDate(dateIso: string) {
  const [y, m, d] = dateIso.split("-");
  if (!y || !m || !d) return dateIso;
  return `${d}-${m}-${y.slice(2)}`;
}

export function HorseModal({ horse, onClose, onContact }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (horse) { if (!dialog.open) dialog.showModal(); }
    else        { if (dialog.open)  dialog.close(); }
  }, [horse]);

  const media = useMemo(() => ({
    images: horse?.media?.images ?? [],
    videos: horse?.media?.videos ?? [],
  }), [horse]);

  return (
    <>
      <style>{`
        dialog.horse-modal::backdrop {
          background: rgba(30,15,8,0.65);
          backdrop-filter: blur(2px);
        }
        dialog.horse-modal {
          border: none;
          padding: 0;
          background: transparent;
        }
      `}</style>

      <dialog
        ref={dialogRef}
        className="horse-modal"
        style={{
          margin: "auto",
          maxHeight: "calc(100dvh - 24px)",
          width: "min(1040px, calc(100% - 24px))",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(30,15,8,0.45)",
        }}
        onClose={onClose}
        onClick={(e) => { if (e.target === e.currentTarget) dialogRef.current?.close(); }}
      >
        {horse && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "calc(100dvh - 24px)",
              background: "#fff",
            }}
          >
            {/* ── Top bar ── */}
            <div
              style={{
                background: S.caoba,
                padding: "1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexShrink: 0,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: S.paja,
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    {horse.name}
                  </h3>
                  {horse.lot && (
                    <span
                      style={{
                        background: S.arena,
                        color: S.caoba,
                        borderRadius: "3px",
                        padding: "2px 10px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      Lote {horse.lot}
                    </span>
                  )}
                </div>
                <div style={{ color: S.pajaMid, fontSize: "0.78rem", marginTop: "3px", fontWeight: 300 }}>
                  Reg {horse.reg} · {formatDate(horse.birthDate)} · {horse.workStatus} · Alzada {horse.height}
                </div>
              </div>

              <button
                onClick={() => dialogRef.current?.close()}
                aria-label="Cerrar"
                style={{
                  flexShrink: 0,
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "3px",
                  border: `1px solid ${S.arena}`,
                  background: "transparent",
                  color: S.paja,
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.2)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                ✕
              </button>
            </div>

            {/* ── Línea ornamental ── */}
            <div
              aria-hidden
              style={{
                height: "3px",
                background: `linear-gradient(90deg, ${S.tierra}, ${S.arena}, "var(--color-campo)")`,
                flexShrink: 0,
              }}
            />

            {/* ── Contenido scrollable ── */}
            <div
              className="scrollbar-stone"
              style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}
            >
              <div style={{ display: "grid", gap: "1.25rem" }}>

                {/* Imagen + Ficha */}
                <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>

                  {/* Imagen principal */}
                  <div
                    style={{
                      minHeight: "280px",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: `1px solid ${S.pajaMid}`,
                      position: "relative",
                    }}
                  >
                    {media.images.length > 0 ? (
                      <Image
                        src={media.images[0] ?? ""}
                        alt={`Foto de ${horse.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width:1024px) 100vw, 520px"
                      />
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          minHeight: "280px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `linear-gradient(135deg, ${S.tierra} 0%, ${S.arena} 60%, var(--color-campo) 100%)`,
                        }}
                      >
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            inset: 0,
                            opacity: 0.07,
                            backgroundImage: `repeating-linear-gradient(45deg, ${S.paja} 0, ${S.paja} 1px, transparent 1px, transparent 11px)`,
                          }}
                        />
                        <span
                          style={{
                            position: "relative",
                            background: "rgba(74,36,24,0.7)",
                            border: `1px solid ${S.arena}`,
                            borderRadius: "3px",
                            padding: "6px 14px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: S.paja,
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          Foto disponible pronto
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Ficha de datos */}
                  <div
                    style={{
                      background: S.crema,
                      border: `1px solid ${S.pajaMid}`,
                      borderRadius: "6px",
                      padding: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: S.arenaDark,
                        marginBottom: "1rem",
                        fontFamily: "'Lato', sans-serif",
                      }}
                    >
                      Ficha
                    </div>
                    <dl
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.625rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {[
                        { label: "Nombre",  value: horse.name },
                        { label: "Reg",     value: horse.reg  },
                        { label: "F. nac",  value: formatDate(horse.birthDate) },
                        { label: "Alzada",  value: horse.height },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          style={{
                            background: "#fff",
                            border: `1px solid ${S.pajaMid}`,
                            borderRadius: "4px",
                            padding: "0.625rem 0.75rem",
                            borderLeft: `3px solid ${S.arena}`,
                          }}
                        >
                          <dt style={{ fontSize: "0.65rem", fontWeight: 700, color: S.arenaDark, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {label}
                          </dt>
                          <dd style={{ marginTop: "3px", fontWeight: 700, color: S.caoba, fontFamily: "'Playfair Display', serif", fontSize: "0.95rem" }}>
                            {value}
                          </dd>
                        </div>
                      ))}
                      <div
                        style={{
                          gridColumn: "1 / -1",
                          background: "#fff",
                          border: `1px solid ${S.pajaMid}`,
                          borderRadius: "4px",
                          padding: "0.625rem 0.75rem",
                          borderLeft: `3px solid ${S.tierra}`,
                        }}
                      >
                        <dt style={{ fontSize: "0.65rem", fontWeight: 700, color: S.arenaDark, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Estado de trabajo
                        </dt>
                        <dd style={{ marginTop: "3px", fontWeight: 700, color: S.caoba }}>
                          {horse.workStatus}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Descripción y galería */}
                {(horse.description || media.images.length > 1 || media.videos.length > 0) && (
                  <div
                    style={{
                      background: "#fff",
                      border: `1px solid ${S.pajaMid}`,
                      borderRadius: "6px",
                      padding: "1.25rem",
                    }}
                  >
                    {horse.description && (
                      <div>
                        <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: S.arenaDark, marginBottom: "0.5rem" }}>
                          Descripción
                        </div>
                        <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "#555", fontWeight: 300 }}>
                          {horse.description}
                        </p>
                      </div>
                    )}

                    {(media.images.length > 1 || media.videos.length > 0) && (
                      <div style={{ marginTop: horse.description ? "1.25rem" : 0 }}>
                        <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: S.arenaDark, marginBottom: "0.75rem" }}>
                          Galería
                        </div>
                        <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                          {media.images.slice(1).map((src) => (
                            <div
                              key={src}
                              style={{
                                position: "relative",
                                aspectRatio: "16/10",
                                overflow: "hidden",
                                borderRadius: "4px",
                                border: `1px solid ${S.pajaMid}`,
                              }}
                            >
                              <Image src={src} alt={`Foto de ${horse.name}`} fill className="object-cover" sizes="(max-width:640px) 100vw, 520px" />
                            </div>
                          ))}
                          {media.videos.map((src) => (
                            <video
                              key={src}
                              src={src}
                              controls
                              style={{
                                width: "100%",
                                borderRadius: "4px",
                                border: `1px solid ${S.pajaMid}`,
                                background: "#000",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Pedigrí */}
                <div
                  style={{
                    background: "#fff",
                    border: `1px solid ${S.pajaMid}`,
                    borderRadius: "6px",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: S.arenaDark }}>
                      Árbol genealógico
                    </div>
                    <div style={{ fontSize: "0.7rem", color: S.arenaDark, fontWeight: 300 }}>3 generaciones</div>
                  </div>
                  <PedigreeDiagram sire={horse.pedigree?.sire} dam={horse.pedigree?.dam} generations={3} />
                </div>

              </div>
            </div>

            {/* ── Footer acciones ── */}
            <div
              style={{
                borderTop: `1px solid ${S.pajaMid}`,
                background: S.crema,
                padding: "1rem 1.5rem",
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.625rem",
                flexShrink: 0,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => dialogRef.current?.close()}
                style={{
                  height: "2.5rem",
                  padding: "0 1.25rem",
                  borderRadius: "3px",
                  border: `1.5px solid ${S.tierra}`,
                  background: "transparent",
                  color: S.tierra,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Lato', sans-serif",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Cerrar
              </button>
              <button
                onClick={() => { onContact(horse.id); dialogRef.current?.close(); }}
                style={{
                  height: "2.5rem",
                  padding: "0 1.25rem",
                  borderRadius: "3px",
                  border: "none",
                  background: S.tierra,
                  color: S.paja,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Lato', sans-serif",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Contactar
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
