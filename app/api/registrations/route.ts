import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { auditLog } from "@/lib/audit";
import { maskEmail } from "@/lib/mask";

export const runtime = "nodejs";

type RegistrationRow = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

function validate(name: string, email: string): string | null {
  if (name.trim().length < 2) return "Skriv inn navn (minst 2 tegn).";
  const e = email.trim().toLowerCase();
  if (!e.includes("@") || e.length < 5) return "Skriv inn en gyldig e-post.";
  return null;
}

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = (await sql`
    SELECT id, name, email, created_at
    FROM registrations
    ORDER BY created_at DESC
  `) as RegistrationRow[];

  return NextResponse.json({ items: rows });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const name = String((body as any)?.name ?? "");
  const email = String((body as any)?.email ?? "").toLowerCase();

  const err = validate(name, email);
  if (err) return NextResponse.json({ error: err }, { status: 400 });

  const id = crypto.randomUUID();

  try {
    const inserted = (await sql`
      INSERT INTO registrations (id, name, email)
      VALUES (${id}, ${name.trim()}, ${email.trim()})
      RETURNING id, name, email, created_at
    `) as RegistrationRow[];

    await auditLog("CREATE_REGISTRATION", "public", {
      id,
      email_masked: maskEmail(email.trim()),
    });

    return NextResponse.json({ item: inserted[0] }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Denne e-posten er allerede registrert." },
      { status: 409 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Mangler id" }, { status: 400 });
  }

  const deleted = (await sql`
    DELETE FROM registrations
    WHERE id = ${id}
    RETURNING id
  `) as { id: string }[];

  if (deleted.length === 0) {
    return NextResponse.json({ error: "Fant ikke registrering" }, { status: 404 });
  }

  await auditLog("DELETE_REGISTRATION", "admin", { id });

  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  const id = String((body as any)?.id ?? "");
  const name = String((body as any)?.name ?? "");
  const email = String((body as any)?.email ?? "").toLowerCase();

  if (!id) return NextResponse.json({ error: "Mangler id" }, { status: 400 });

  const err = validate(name, email);
  if (err) return NextResponse.json({ error: err }, { status: 400 });

  try {
    const updated = (await sql`
      UPDATE registrations
      SET name = ${name.trim()}, email = ${email.trim()}
      WHERE id = ${id}
      RETURNING id, name, email, created_at
    `) as RegistrationRow[];

    if (updated.length === 0) {
      return NextResponse.json({ error: "Fant ikke registrering" }, { status: 404 });
    }

    await auditLog("UPDATE_REGISTRATION", "admin", {
      id,
      email_masked: maskEmail(email.trim()),
    });

    return NextResponse.json({ item: updated[0] });
  } catch {
    return NextResponse.json(
      { error: "E-post er allerede i bruk av en annen registrering." },
      { status: 409 }
    );
  }
}
