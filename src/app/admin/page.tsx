import { horses } from "@/data/horses";

export default function AdminPage() {
  return (
    <div className="min-h-full bg-stone-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-950">Admin</h1>
          <p className="mt-2 text-sm text-stone-600">
            Vista privada para gestión. Por ahora el catálogo se alimenta desde un listado local.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="text-xs font-semibold text-stone-600">Caballos</div>
              <div className="mt-1 text-2xl font-semibold text-stone-950">{horses.length}</div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="text-xs font-semibold text-stone-600">Con fotos</div>
              <div className="mt-1 text-2xl font-semibold text-stone-950">
                {horses.filter((h) => (h.media?.images?.length ?? 0) > 0).length}
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="text-xs font-semibold text-stone-600">Con videos</div>
              <div className="mt-1 text-2xl font-semibold text-stone-950">
                {horses.filter((h) => (h.media?.videos?.length ?? 0) > 0).length}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-4">
            <div className="text-sm font-semibold text-stone-900">Datos actuales (ejemplo)</div>
            <pre className="mt-3 max-h-[50dvh] overflow-auto rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-800">
              {JSON.stringify(horses.slice(0, 2), null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
