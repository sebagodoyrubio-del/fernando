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
    <div className="min-h-full bg-gradient-to-b from-amber-50 via-stone-50 to-stone-100 text-stone-950">
      <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-stone-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-amber-100">
              CR
            </span>
            <span className="text-sm font-semibold tracking-wide text-stone-900">
              Catálogo Criollo
            </span>
          </a>
          <nav className="flex items-center gap-4 text-sm font-medium text-stone-700">
            <a className="hover:text-stone-950" href="#nomina">
              Nómina
            </a>
            <a className="hover:text-stone-950" href="#caballos">
              Caballos
            </a>
            <a className="hover:text-stone-950" href="#contacto">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-10">
        <section className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.18),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(120,113,108,0.14),transparent_55%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              {horses.length} caballos disponibles
            </div>
            <h1 className="mt-4 max-w-2xl text-pretty text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              Caballos criollos para rodeo, campo y familia
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-stone-700 sm:text-base">
              Revisa la nómina, abre la ficha completa (fotos, videos y genealogía) y envía un
              contacto directo por el caballo que te interese.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#nomina"
                className="inline-flex h-11 items-center justify-center rounded-full bg-stone-900 px-5 text-sm font-semibold text-amber-100 hover:bg-stone-800"
              >
                Ver nómina
              </a>
              <a
                href="#contacto"
                className="inline-flex h-11 items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-900 hover:bg-stone-50"
              >
                Contactar
              </a>
            </div>
          </div>
        </section>

        <section id="nomina" className="mt-10">
          <HorseNomina
            horses={horses}
            onOpenHorse={(id) => setSelectedHorseId(id)}
            onContactHorse={(id) => {
              setContactHorseId(id);
              const el = document.getElementById("contacto");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </section>

        <section id="caballos" className="mt-10">
          <HorseCarousel
            horses={horses}
            onOpenHorse={(id) => setSelectedHorseId(id)}
            onContactHorse={(id) => {
              setContactHorseId(id);
              const el = document.getElementById("contacto");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </section>

        <section className="mt-10 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight text-stone-950">
            Cómo trabajamos la venta
          </h2>
          <div className="mt-4 grid gap-4 text-sm text-stone-700 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="text-sm font-semibold text-stone-900">Transparencia</div>
              <div className="mt-1 leading-6">
                Fichas completas con estado de trabajo, alzada y genealogía.
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="text-sm font-semibold text-stone-900">Material</div>
              <div className="mt-1 leading-6">
                Adjuntamos fotos y videos cuando están disponibles.
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="text-sm font-semibold text-stone-900">Contacto directo</div>
              <div className="mt-1 leading-6">
                Envía tu mensaje por el caballo elegido y coordinamos.
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="mt-10">
          <ContactSection horse={contactHorse} />
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-stone-600 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Catálogo Criollo</div>
            <div className="text-stone-500">
              Hecho para Vercel · Mobile-first · React/Next
            </div>
          </div>
        </div>
      </footer>

      <HorseModal
        horse={selectedHorse}
        onClose={() => setSelectedHorseId(null)}
        onContact={(id) => {
          setSelectedHorseId(null);
          setContactHorseId(id);
          const el = document.getElementById("contacto");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />
    </div>
  );
}
