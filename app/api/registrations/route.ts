import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql } from "@/lib/db";

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

    return NextResponse.json({ item: inserted[0] }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Denne e-posten er allerede registrert." },
      { status: 409 }
    );
  }
}
