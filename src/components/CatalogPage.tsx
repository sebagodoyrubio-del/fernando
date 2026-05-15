"use client";

import { useMemo, useState } from "react";
import type { Horse } from "@/lib/horses";
import { HorseCarousel } from "@/components/HorseCarousel";
import { HorseModal } from "@/components/HorseModal";
import { HorseNomina } from "@/components/HorseNomina";
import { ContactSection } from "@/components/ContactSection";

type Props = {
  horses: Horse[];
};

export function CatalogPage({ horses }: Props) {
  const [selectedHorseId, setSelectedHorseId] = useState<string | null>(null);
  const [contactHorseId, setContactHorseId] = useState<string | null>(null);

  const selectedHorse = useMemo(() => {
    if (!selectedHorseId) return null;
    return horses.find((h) => h.id === selectedHorseId) ?? null;
  }, [horses, selectedHorseId]);

  const contactHorse = useMemo(() => {
    if (!contactHorseId) return null;
    return horses.find((h) => h.id === contactHorseId) ?? null;
  }, [horses, contactHorseId]);

  return (
    <div className="min-h-full bg-crema text-tierra" style={{ fontFamily: "'Lato', sans-serif" }}>

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-20"
        style={{
          borderBottom: "1px solid #C9A96E",
          background: "rgba(74, 36, 24, 0.96)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <a href="#" className="flex items-center gap-3">
            {/* Logo con iniciales estilo sello */}
            <span
              className="inline-flex h-9 w-9 items-center justify-center font-display font-bold text-sm"
              style={{
                background: "var(--color-arena)",
                color: "var(--color-caoba)",
                borderRadius: "4px",
                border: "1.5px solid var(--color-paja-mid)",
                letterSpacing: "0.05em",
              }}
            >
              CR
            </span>
            <span
              className="font-display text-base tracking-wide"
              style={{ color: "var(--color-paja)", fontWeight: 600 }}
            >
              Catálogo Criollo
            </span>
          </a>
          <nav className="flex items-center gap-6 text-sm font-bold" style={{ letterSpacing: "0.06em" }}>
            {[
              { href: "#nomina", label: "NÓMINA" },
              { href: "#caballos", label: "CABALLOS" },
              { href: "#contacto", label: "CONTACTO" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                style={{
                  color: "var(--color-paja-mid)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  fontSize: "0.75rem",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--color-arena)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--color-paja-mid)")
                }
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        style={{
          background:
            "linear-gradient(160deg, var(--color-caoba) 0%, var(--color-tierra) 55%, var(--color-vino) 100%)",
          position: "relative",
          overflow: "hidden",
          padding: "4rem 1.5rem 5rem",
        }}
      >
        {/* Patrón decorativo geométrico tipo tejido */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage: `repeating-linear-gradient(
              45deg,
              var(--color-paja) 0px,
              var(--color-paja) 1px,
              transparent 1px,
              transparent 12px
            )`,
          }}
        />
        {/* Línea ornamental superior */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, var(--color-arena), var(--color-campo), var(--color-arena))",
          }}
        />

        <div className="mx-auto max-w-7xl relative">
          {/* Badge */}
          <span className="badge-available animate-fade-in-up">
            {horses.length} caballos disponibles
          </span>

          {/* Título */}
          <h1
            className="font-display animate-fade-in-up"
            style={{
              marginTop: "1.5rem",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--color-paja)",
              maxWidth: "700px",
              animationDelay: "0.1s",
            }}
          >
            Caballos criollos para{" "}
            <span style={{ color: "var(--color-arena)" }}>rodeo</span>,
            campo y familia
          </h1>

          {/* Divisor ornamental */}
          <div
            aria-hidden
            style={{
              marginTop: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              maxWidth: "360px",
            }}
          >
            <div
              style={{
                height: "1px",
                flex: 1,
                background: "var(--color-arena)",
                opacity: 0.5,
              }}
            />
            <span style={{ color: "var(--color-arena)", fontSize: "1rem" }}>✦</span>
            <div
              style={{
                height: "1px",
                flex: 1,
                background: "var(--color-arena)",
                opacity: 0.5,
              }}
            />
          </div>

          {/* Bajada */}
          <p
            className="animate-fade-in-up"
            style={{
              marginTop: "1.25rem",
              maxWidth: "540px",
              color: "var(--color-paja-mid)",
              lineHeight: 1.8,
              fontSize: "1rem",
              fontWeight: 300,
              animationDelay: "0.2s",
            }}
          >
            Revisa la nómina, abre la ficha completa con fotos, videos y
            genealogía, y contacta directamente por el caballo que te interese.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-in-up"
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              animationDelay: "0.3s",
            }}
          >
            <a href="#nomina" className="btn-primary">
              Ver nómina
            </a>
            <a
              href="#contacto"
              className="btn-secondary"
              style={{
                color: "var(--color-paja)",
                borderColor: "var(--color-paja-mid)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-paja)";
                (e.currentTarget as HTMLElement).style.color = "var(--color-caoba)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--color-paja)";
              }}
            >
              Contactar
            </a>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-10">

        {/* ── NÓMINA ── */}
        <section id="nomina">
          <div className="divider-ornament mb-8">
            <span
              className="font-display text-xs font-bold tracking-widest uppercase"
              style={{ color: "var(--color-arena-dark)" }}
            >
              Nómina
            </span>
          </div>
          <HorseNomina
            horses={horses}
            onOpenHorse={(id) => setSelectedHorseId(id)}
            onContactHorse={(id) => {
              setContactHorseId(id);
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </section>

        {/* ── CAROUSEL ── */}
        <section id="caballos" className="mt-16">
          <div className="divider-ornament mb-8">
            <span
              className="font-display text-xs font-bold tracking-widest uppercase"
              style={{ color: "var(--color-arena-dark)" }}
            >
              Caballos
            </span>
          </div>
          <HorseCarousel
            horses={horses}
            onOpenHorse={(id) => setSelectedHorseId(id)}
            onContactHorse={(id) => {
              setContactHorseId(id);
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </section>

        {/* ── COMO TRABAJAMOS ── */}
        <section className="mt-16">
          <div
            style={{
              background: "var(--color-caoba)",
              borderRadius: "0.5rem",
              padding: "2.5rem 2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Patrón de fondo */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.05,
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  var(--color-paja) 0px,
                  var(--color-paja) 1px,
                  transparent 1px,
                  transparent 14px
                )`,
              }}
            />
            <div className="relative">
              <h2
                className="font-display"
                style={{
                  color: "var(--color-paja)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Cómo trabajamos la venta
              </h2>
              <p
                style={{
                  color: "var(--color-paja-mid)",
                  fontSize: "0.875rem",
                  marginBottom: "2rem",
                  fontWeight: 300,
                }}
              >
                Vendemos con la misma honradez que se trabaja el campo.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    icon: "📋",
                    title: "Transparencia",
                    desc: "Fichas completas con estado de trabajo, alzada y genealogía.",
                  },
                  {
                    icon: "📷",
                    title: "Material",
                    desc: "Adjuntamos fotos y videos cuando están disponibles.",
                  },
                  {
                    icon: "🤝",
                    title: "Contacto directo",
                    desc: "Envía tu mensaje por el caballo elegido y coordinamos.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(201, 169, 110, 0.25)",
                      borderRadius: "0.375rem",
                      padding: "1.25rem",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
                    <div
                      style={{
                        color: "var(--color-arena)",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        marginBottom: "0.5rem",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        color: "var(--color-paja-mid)",
                        fontSize: "0.825rem",
                        lineHeight: 1.7,
                        fontWeight: 300,
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACTO ── */}
        <section id="contacto" className="mt-16">
          <div className="divider-ornament mb-8">
            <span
              className="font-display text-xs font-bold tracking-widest uppercase"
              style={{ color: "var(--color-arena-dark)" }}
            >
              Contacto
            </span>
          </div>
          <ContactSection horse={contactHorse} />
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid var(--color-paja-mid)",
          background: "var(--color-caoba)",
          padding: "2.5rem 1.5rem",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-display font-bold text-sm inline-flex h-8 w-8 items-center justify-center"
                style={{
                  background: "var(--color-arena)",
                  color: "var(--color-caoba)",
                  borderRadius: "4px",
                }}
              >
                CR
              </span>
              <span
                className="font-display"
                style={{ color: "var(--color-paja)", fontSize: "0.9rem", fontWeight: 600 }}
              >
                Catálogo Criollo
              </span>
            </div>
            <div
              style={{
                color: "var(--color-arena)",
                fontSize: "0.75rem",
                letterSpacing: "0.04em",
              }}
            >
              © {new Date().getFullYear()} · Todos los derechos reservados
            </div>
          </div>
          {/* Línea ornamental inferior */}
          <div
            aria-hidden
            style={{
              marginTop: "1.5rem",
              height: "2px",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, transparent, var(--color-arena), transparent)",
              opacity: 0.4,
            }}
          />
        </div>
      </footer>

      {/* ── MODAL ── */}
      <HorseModal
        horse={selectedHorse}
        onClose={() => setSelectedHorseId(null)}
        onContact={(id) => {
          setSelectedHorseId(null);
          setContactHorseId(id);
          document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}
