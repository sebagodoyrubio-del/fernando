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

export function HorseNomina({ horses, onOpenHorse, onContactHorse }: Props) {
  const [query, setQuery] = useState("");
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
      const haystack = `${h.name} ${h.reg} ${h.workStatus}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [horses, query, status]);

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-stone-950">Nómina</h2>
          <p className="mt-1 text-sm text-stone-600">
            {filtered.length} de {horses.length} caballos
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-stone-700">Buscar</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre, reg, estado..."
              className="h-11 rounded-2xl border border-stone-300 bg-white px-4 text-sm text-stone-900 outline-none ring-0 placeholder:text-stone-400 focus:border-stone-400"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-stone-700">Estado</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-2xl border border-stone-300 bg-white px-4 text-sm text-stone-900 outline-none ring-0 focus:border-stone-400"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-stone-200 md:block">
        <table className="w-full table-auto text-left text-sm">
          <thead className="bg-stone-50 text-xs font-semibold uppercase tracking-wide text-stone-700">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Nombre</th>
              <th className="px-4 py-3 whitespace-nowrap">Reg</th>
              <th className="px-4 py-3 whitespace-nowrap">F. nac</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 whitespace-nowrap">Alzada</th>
              <th className="px-4 py-3 text-right whitespace-nowrap w-[220px]">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filtered.map((h) => (
              <tr key={h.id} className="bg-white">
                <td className="px-4 py-4 font-semibold text-stone-950">
                  <button
                    onClick={() => onOpenHorse(h.id)}
                    className="text-left hover:underline whitespace-nowrap"
                  >
                    {h.name}
                  </button>
                </td>
                <td className="px-4 py-4 text-stone-700">{h.reg}</td>
                <td className="px-4 py-4 text-stone-700 whitespace-nowrap">
                  {formatDate(h.birthDate)}
                </td>
                <td className="px-4 py-4 text-stone-700">{h.workStatus}</td>
                <td className="px-4 py-4 text-stone-700 whitespace-nowrap">{h.height}</td>
                <td className="px-4 py-4 text-right whitespace-nowrap">
                  <div className="inline-flex gap-2 whitespace-nowrap">
                    <button
                      onClick={() => onOpenHorse(h.id)}
                      className="h-10 rounded-full border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-900 hover:bg-stone-50 whitespace-nowrap"
                    >
                      Ver ficha
                    </button>
                    <button
                      onClick={() => onContactHorse(h.id)}
                      className="h-10 rounded-full bg-stone-900 px-4 text-sm font-semibold text-amber-100 hover:bg-stone-800 whitespace-nowrap"
                    >
                      Contactar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-sm text-stone-600" colSpan={6}>
                  No hay resultados para tu búsqueda.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-3 md:hidden">
        {filtered.map((h) => (
          <div
            key={h.id}
            className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <button
                  onClick={() => onOpenHorse(h.id)}
                  className="text-left text-base font-semibold text-stone-950"
                >
                  {h.name}
                </button>
                <div className="mt-1 text-xs text-stone-600">
                  Reg {h.reg} · {formatDate(h.birthDate)}
                </div>
              </div>
              <div className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-700">
                {h.height}
              </div>
            </div>
            <div className="mt-3 text-sm text-stone-700">{h.workStatus}</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
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
        ))}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-600">
            No hay resultados para tu búsqueda.
          </div>
        ) : null}
      </div>
    </section>
  );
}
