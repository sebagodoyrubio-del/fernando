"use client";

import { useMemo, useState } from "react";
import type { ContactPayload, Horse } from "@/lib/horses";

type Props = {
  horse: Horse | null;
};

type SendState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; message: string }
  | { status: "error"; message: string };

export function ContactSection({ horse }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sendState, setSendState] = useState<SendState>({ status: "idle" });

  const subject = useMemo(() => {
    return horse ? `Consulta por ${horse.name} (Reg ${horse.reg})` : "Consulta por caballos";
  }, [horse]);

  const mailtoHref = useMemo(() => {
    const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
    const body = [
      `Nombre: ${fullName}`,
      `Email: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      horse ? `Caballo: ${horse.name} (Reg ${horse.reg})` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const params = new URLSearchParams({
      subject,
      body,
    });
    return `mailto:${to}?${params.toString()}`;
  }, [email, fullName, horse, message, phone, subject]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSendState({ status: "sending" });

    const payload: ContactPayload = {
      horseId: horse?.id,
      horseName: horse?.name,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      message: message.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json().catch(() => null)) as { message?: string } | null;
      if (!res.ok) {
        throw new Error(json?.message || "No se pudo enviar el mensaje.");
      }

      setSendState({ status: "sent", message: json?.message || "Mensaje enviado." });
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setSendState({
        status: "error",
        message: err instanceof Error ? err.message : "Error inesperado.",
      });
    }
  }

  const hint = horse
    ? `Te interesa: ${horse.name} · Reg ${horse.reg}`
    : "Escríbenos y te ayudamos a elegir.";

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-stone-950">Contacto</h2>
          <p className="mt-1 text-sm text-stone-600">{hint}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={mailtoHref}
            className="inline-flex h-10 items-center justify-center rounded-full border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-900 hover:bg-stone-50"
          >
            Abrir correo
          </a>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-stone-700">Nombre y apellido</span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="h-11 rounded-2xl border border-stone-300 bg-white px-4 text-sm text-stone-900 outline-none focus:border-stone-400"
            placeholder="Tu nombre"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-stone-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 rounded-2xl border border-stone-300 bg-white px-4 text-sm text-stone-900 outline-none focus:border-stone-400"
            placeholder="tucorreo@email.com"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-stone-700">Teléfono (opcional)</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 rounded-2xl border border-stone-300 bg-white px-4 text-sm text-stone-900 outline-none focus:border-stone-400"
            placeholder="+56 ..."
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-stone-700">Caballo (opcional)</span>
          <input
            value={horse ? `${horse.name} (Reg ${horse.reg})` : ""}
            readOnly
            className="h-11 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-700"
            placeholder="Selecciona un caballo"
          />
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-xs font-semibold text-stone-700">Mensaje</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-400"
            placeholder="Cuéntanos qué buscas, ciudad/comuna, presupuesto, etc."
          />
        </label>

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            {sendState.status === "sent" ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-800">
                {sendState.message}
              </div>
            ) : null}
            {sendState.status === "error" ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-rose-800">
                {sendState.message}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={sendState.status === "sending"}
            className="h-11 rounded-full bg-stone-900 px-6 text-sm font-semibold text-amber-100 hover:bg-stone-800 disabled:opacity-60"
          >
            {sendState.status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-xs leading-5 text-stone-500">
        Si el envío automático no está configurado, usa “Abrir correo” como alternativa.
      </div>
    </section>
  );
}
