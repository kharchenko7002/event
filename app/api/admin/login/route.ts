import { NextResponse } from "next/server";
import { auditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = String((body as any)?.password ?? "");

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminPassword || !adminToken) {
    return NextResponse.json(
      { error: "Server is missing ADMIN_PASSWORD/ADMIN_TOKEN" },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    await auditLog("LOGIN_FAIL", "admin", { reason: "wrong_password" });
    return NextResponse.json({ error: "Feil passord" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_token", adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });

  await auditLog("LOGIN_OK", "admin", { ok: true });

  return res;
}
