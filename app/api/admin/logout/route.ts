import { NextResponse } from "next/server";
import { auditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  await auditLog("LOGOUT", "admin", { ok: true });

  return res;
}
