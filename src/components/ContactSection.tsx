"use client";

import { useMemo, useState } from "react";
import type { ContactPayload, Horse } from "@/lib/horses";

type Props = {
  horse: Horse | null;
};

type SendState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent";  message: string }
  | { status: "error"; message: string };

const S = {
  tierra:    "var(--color-tierra)",
  vino:      "var(--color-vino)",
  caoba:     "var(--color-caoba)",
  campo:     "var(--color-campo)",
  paja:      "var(--color-paja)",
  pajaMid:   "var(--color-paja-mid)",
  arena:     "var(--color-arena)",
  arenaDark: "var(--color-arena-dark)",
  crema:     "var(--color-crema)",
  humo:      "var(--color-humo, #F0E8D8)",
} as const;

const inputBase: React.CSSProperties = {
  height: "2.75rem",
  borderRadius: "4px",
  border: `1px solid var(--color-paja-mid)`,
  background: "#fff",
  padding: "0 1rem",
  fontSize: "0.875rem",
  color: S.caoba,
  outline: "none",
  width: "100%",
  fontFamily: "'Lato', sans-serif",
  fontWeight: 300,
  transition: "border-color 0.2s",
};

export function ContactSection({ horse }: Props) {
  const [fullName, setFullName] = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [message,  setMessage]  = useState("");
  const [sendState, setSendState] = useState<SendState>({ status: "idle" });

  const subject = useMemo(
    () => horse ? `Consulta por ${horse.name} (Reg ${horse.reg})` : "Consulta por caballos",
    [horse],
  );

  const mailtoHref = useMemo(() => {
    const to   = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
    const body = [
      `Nombre: ${fullName}`,
      `Email: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      horse ? `Caballo: ${horse.name} (Reg ${horse.reg})` : null,
      "",
      message,
    ].filter(Boolean).join("\n");
    return `mailto:${to}?${new URLSearchParams({ subject, body }).toString()}`;
  }, [email, fullName, horse, message, phone, subject]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSendState({ status: "sending" });

    const payload: ContactPayload = {
      horseId:   horse?.id,
      horseName: horse?.name,
      fullName:  fullName.trim(),
      email:     email.trim(),
      phone:     phone.trim() || undefined,
      message:   message.trim(),
    };

    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as { message?: string } | null;
      if (!res.ok) throw new Error(json?.message || "No se pudo enviar el mensaje.");

      setSendState({ status: "sent", message: json?.message || "Mensaje enviado." });
      setFullName(""); setEmail(""); setPhone(""); setMessage("");
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
          gap: "0.75rem",
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
            Contacto
          </h2>
          <p style={{ color: S.pajaMid, fontSize: "0.8rem", marginTop: "2px", fontWeight: 300 }}>
            {hint}
          </p>
        </div>

        {/* Botón abrir correo */}
        <a
          href={mailtoHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: "2.25rem",
            padding: "0 1rem",
            borderRadius: "3px",
            border: `1.5px solid ${S.pajaMid}`,
            background: "transparent",
            color: S.paja,
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "'Lato', sans-serif",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = S.paja;
            (e.currentTarget as HTMLElement).style.color = S.caoba;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = S.paja;
          }}
        >
          Abrir correo
        </a>
      </div>

      {/* ── Formulario ── */}
      <form onSubmit={onSubmit} style={{ padding: "1.5rem", display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>

        <Label text="Nombre y apellido">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Tu nombre"
            style={inputBase}
            onFocus={(e)  => ((e.target as HTMLElement).style.borderColor = S.arena)}
            onBlur={(e)   => ((e.target as HTMLElement).style.borderColor = S.pajaMid)}
          />
        </Label>

        <Label text="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tucorreo@email.com"
            style={inputBase}
            onFocus={(e)  => ((e.target as HTMLElement).style.borderColor = S.arena)}
            onBlur={(e)   => ((e.target as HTMLElement).style.borderColor = S.pajaMid)}
          />
        </Label>

        <Label text="Teléfono (opcional)">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+56 ..."
            style={inputBase}
            onFocus={(e)  => ((e.target as HTMLElement).style.borderColor = S.arena)}
            onBlur={(e)   => ((e.target as HTMLElement).style.borderColor = S.pajaMid)}
          />
        </Label>

        <Label text="Caballo">
          <input
            value={horse ? `${horse.name} (Reg ${horse.reg})` : ""}
            readOnly
            placeholder="Selecciona un caballo desde la nómina"
            style={{
              ...inputBase,
              background: S.humo,
              borderColor: S.pajaMid,
              color: S.arenaDark,
              cursor: "default",
            }}
          />
        </Label>

        <Label text="Mensaje" fullWidth>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            placeholder="Cuéntanos qué buscas, ciudad/comuna, presupuesto, etc."
            style={{
              ...inputBase,
              height: "auto",
              padding: "0.75rem 1rem",
              resize: "vertical",
              lineHeight: 1.7,
            }}
            onFocus={(e)  => ((e.target as HTMLElement).style.borderColor = S.arena)}
            onBlur={(e)   => ((e.target as HTMLElement).style.borderColor = S.pajaMid)}
          />
        </Label>

        {/* Footer del form */}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <div style={{ fontSize: "0.875rem" }}>
            {sendState.status === "sent" && (
              <div
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "3px",
                  background: "#eef4e8",
                  border: `1px solid ${S.campo}`,
                  color: S.campo,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                ✓ {sendState.message}
              </div>
            )}
            {sendState.status === "error" && (
              <div
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "3px",
                  background: "#f5e8e8",
                  border: `1px solid ${S.vino}`,
                  color: S.vino,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                ✕ {sendState.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={sendState.status === "sending"}
            style={{
              height: "2.75rem",
              padding: "0 1.75rem",
              borderRadius: "3px",
              background: sendState.status === "sending" ? S.arenaDark : S.tierra,
              color: S.paja,
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "none",
              cursor: sendState.status === "sending" ? "not-allowed" : "pointer",
              fontFamily: "'Lato', sans-serif",
              opacity: sendState.status === "sending" ? 0.7 : 1,
              transition: "opacity 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              if (sendState.status !== "sending")
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            {sendState.status === "sending" ? "Enviando…" : "Enviar mensaje"}
          </button>
        </div>

        <p style={{ gridColumn: "1 / -1", fontSize: "0.7rem", color: S.arenaDark, fontWeight: 300 }}>
          Si el envío automático no está configurado, usa "Abrir correo" como alternativa.
        </p>
      </form>
    </section>
  );
}

/* ── Label helper ── */
function Label({
  text,
  fullWidth,
  children,
}: {
  text: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        gridColumn: fullWidth ? "1 / -1" : undefined,
      }}
    >
      <span
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          color: "var(--color-arena-dark)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: "'Lato', sans-serif",
        }}
      >
        {text}
      </span>
      {children}
    </label>
  );
}
