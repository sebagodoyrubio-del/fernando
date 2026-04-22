import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { ContactPayload } from "@/lib/horses";

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Falta configurar ${name}.`);
  return v;
}

export async function POST(req: Request) {
  const configured = Boolean(
    process.env.GMAIL_USER &&
      process.env.GMAIL_APP_PASSWORD &&
      process.env.CONTACT_EMAIL_TO &&
      process.env.CONTACT_EMAIL_FROM,
  );

  if (!configured) {
    return NextResponse.json(
      {
        message:
          "Envío por correo no configurado. Usa “Abrir correo” o configura variables de entorno.",
      },
      { status: 501 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "JSON inválido." }, { status: 400 });
  }

  const fullName = (payload.fullName ?? "").trim();
  const email = (payload.email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const message = (payload.message ?? "").trim();
  const horseName = (payload.horseName ?? "").trim();

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { message: "Nombre, email y mensaje son obligatorios." },
      { status: 400 },
    );
  }

  const gmailUser = requiredEnv("GMAIL_USER");
  const gmailPass = requiredEnv("GMAIL_APP_PASSWORD");
  const to = requiredEnv("CONTACT_EMAIL_TO");
  const from = requiredEnv("CONTACT_EMAIL_FROM");

  const subject = horseName ? `Consulta por ${horseName}` : "Consulta desde el sitio";
  const text = [
    `Nombre: ${fullName}`,
    `Email: ${email}`,
    phone ? `Teléfono: ${phone}` : null,
    horseName ? `Caballo: ${horseName}` : null,
    payload.horseId ? `HorseId: ${payload.horseId}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ message: "Mensaje enviado. Te contactaremos pronto." });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error al enviar correo.";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
