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

    if (horse) {
      if (!dialog.open) dialog.showModal();
      return;
    }

    if (dialog.open) dialog.close();
  }, [horse]);

  const media = useMemo(() => {
    return {
      images: horse?.media?.images ?? [],
      videos: horse?.media?.videos ?? [],
    };
  }, [horse]);

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-[min(1040px,calc(100%-24px))] rounded-3xl border border-stone-200 bg-white p-0 text-stone-950 shadow-2xl backdrop:bg-black/50 focus:outline-none"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialogRef.current?.close();
      }}
    >
      {horse ? (
        <div className="flex max-h-[calc(100dvh-24px)] flex-col overflow-hidden">
          <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{horse.name}</h3>
                {horse.lot ? (
                  <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-amber-100">
                    Lote {horse.lot}
                  </span>
                ) : null}
              </div>
              <div className="mt-1 text-sm text-stone-600">
                Reg {horse.reg} · {formatDate(horse.birthDate)} · {horse.workStatus} · Alzada{" "}
                {horse.height}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => dialogRef.current?.close()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-900 hover:bg-stone-50"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            <div className="grid gap-5">
              <div className="grid items-stretch gap-5 lg:grid-cols-2">
                <div className="min-h-[320px] overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 lg:min-h-[420px]">
                  {media.images.length > 0 ? (
                    <div className="relative h-full min-h-[320px] lg:min-h-[420px]">
                      <Image
                        src={media.images[0] ?? ""}
                        alt={`Foto de ${horse.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 520px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[320px] items-center justify-center bg-gradient-to-br from-amber-100 via-stone-100 to-emerald-50 lg:min-h-[420px]">
                      <div className="rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-800 backdrop-blur">
                        Foto disponible pronto
                      </div>
                    </div>
                  )}
                </div>

                <div className="min-h-[320px] rounded-3xl border border-stone-200 bg-white p-4 lg:min-h-[420px] lg:p-6">
                  <div className="text-sm font-semibold text-stone-900">Ficha</div>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                      <dt className="text-xs font-semibold text-stone-600">Nombre</dt>
                      <dd className="mt-1 font-semibold text-stone-950">{horse.name}</dd>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                      <dt className="text-xs font-semibold text-stone-600">Reg</dt>
                      <dd className="mt-1 font-semibold text-stone-950">{horse.reg}</dd>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                      <dt className="text-xs font-semibold text-stone-600">F. nac</dt>
                      <dd className="mt-1 font-semibold text-stone-950">
                        {formatDate(horse.birthDate)}
                      </dd>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                      <dt className="text-xs font-semibold text-stone-600">Alzada</dt>
                      <dd className="mt-1 font-semibold text-stone-950">{horse.height}</dd>
                    </div>
                    <div className="col-span-2 rounded-2xl border border-stone-200 bg-stone-50 p-3">
                      <dt className="text-xs font-semibold text-stone-600">Estado de trabajo</dt>
                      <dd className="mt-1 font-semibold text-stone-950">{horse.workStatus}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {horse.description || media.images.length > 1 || media.videos.length > 0 ? (
                <div className="rounded-3xl border border-stone-200 bg-white p-4 lg:p-6">
                  {horse.description ? (
                    <div>
                      <div className="text-sm font-semibold text-stone-900">Descripción</div>
                      <p className="mt-2 text-sm leading-6 text-stone-700">{horse.description}</p>
                    </div>
                  ) : null}

                  {media.images.length > 1 || media.videos.length > 0 ? (
                    <div className={horse.description ? "mt-5" : ""}>
                      <div className="text-sm font-semibold text-stone-900">Galería</div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {media.images.slice(1).map((src) => (
                          <div
                            key={src}
                            className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stone-200 bg-stone-50"
                          >
                            <Image
                              src={src}
                              alt={`Foto de ${horse.name}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 520px"
                            />
                          </div>
                        ))}
                        {media.videos.map((src) => (
                          <video
                            key={src}
                            src={src}
                            controls
                            className="w-full overflow-hidden rounded-2xl border border-stone-200 bg-black"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="rounded-3xl border border-stone-200 bg-white p-4 lg:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-stone-900">Árbol genealógico</div>
                  <div className="text-xs font-semibold text-stone-600">3 generaciones</div>
                </div>
                <div className="mt-3">
                  <PedigreeDiagram
                    sire={horse.pedigree?.sire}
                    dam={horse.pedigree?.dam}
                    generations={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200 bg-white px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                onClick={() => dialogRef.current?.close()}
                className="h-11 rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-900 hover:bg-stone-50 sm:h-10"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  onContact(horse.id);
                  dialogRef.current?.close();
                }}
                className="h-11 rounded-full bg-stone-900 px-5 text-sm font-semibold text-amber-100 hover:bg-stone-800 sm:h-10"
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
