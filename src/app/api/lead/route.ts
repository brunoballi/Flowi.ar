import { NextResponse } from "next/server";

const PHONE = /^\+?[\d\s()-]{8,20}$/;

type Lead = { name?: unknown; whatsapp?: unknown; business?: unknown; process?: unknown; privacy?: unknown };

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const lead = {
    name: String(body.name ?? "").trim().slice(0, 120),
    whatsapp: String(body.whatsapp ?? "").trim(),
    business: String(body.business ?? "").trim().slice(0, 80),
    process: String(body.process ?? "").trim().slice(0, 2000),
    privacy: body.privacy === true,
    source: "autoflowi.com",
    createdAt: new Date().toISOString(),
  };
  if (!lead.name || !PHONE.test(lead.whatsapp) || !lead.business || !lead.process || !lead.privacy) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    // Sin webhook configurado no hay ningún lugar real donde el lead llegue:
    // devolver "ok" acá lo perdería en el log del servidor sin que el
    // formulario ofrezca el fallback a WhatsApp. Mientras no se cargue
    // LEAD_WEBHOOK_URL, el envío por WhatsApp de toda la vida es el destino
    // real, no un fallback de emergencia.
    console.log("[lead] sin LEAD_WEBHOOK_URL configurada, no se pudo reenviar:", lead);
    return NextResponse.json({ ok: false, error: "no_webhook_configured" }, { status: 501 });
  }
  try {
    const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
    if (!r.ok) return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "webhook_unreachable" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
