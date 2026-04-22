"use client";

import type { Horse } from "@/lib/horses";

type Props = {
  horses: Horse[];
  onOpenHorse: (id: string) => void;
  onContactHorse: (id: string) => void;
};

export function HorseCarousel({ horses, onOpenHorse, onContactHorse }: Props) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-stone-950">Caballos</h2>
          <p className="mt-1 text-sm text-stone-600">
            Desliza y abre la ficha completa.
          </p>
        </div>
      </div>

      <div className="mt-6 -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-3">
        {horses.map((h) => (
          <article
            key={h.id}
            className="w-[85%] shrink-0 snap-start sm:w-[360px]"
          >
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50">
              <button
                onClick={() => onOpenHorse(h.id)}
                className="group block w-full text-left"
              >
                <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-amber-100 via-stone-100 to-emerald-50">
                  <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.25),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.12),transparent_55%)]" />
                  <div className="absolute bottom-3 left-3 rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-xs font-semibold text-stone-800 backdrop-blur">
                    Reg {h.reg}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-stone-950">{h.name}</h3>
                      <div className="mt-1 text-sm text-stone-700">{h.workStatus}</div>
                    </div>
                    <div className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-700">
                      Alzada {h.height}
                    </div>
                  </div>
                  {h.description ? (
                    <p className="mt-3 max-h-12 overflow-hidden text-sm leading-6 text-stone-600">
                      {h.description}
                    </p>
                  ) : null}
                </div>
              </button>
              <div className="grid grid-cols-2 gap-2 p-4 pt-0">
                <button
                  onClick={() => onOpenHorse(h.id)}
                  className="h-10 rounded-full border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-900 hover:bg-stone-100"
                >
                  Ver ficha
                </button>
                <button
                  onClick={() => onContactHorse(h.id)}
                  className="h-10 rounded-full bg-stone-900 px-4 text-sm font-semibold text-amber-100 hover:bg-stone-800"
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
