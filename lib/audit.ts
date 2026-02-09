import crypto from "crypto";
import { sql } from "@/lib/db";

export async function auditLog(
  action: string,
  actor: "public" | "admin",
  details: Record<string, any>
) {
  const id = crypto.randomUUID();
  const detailsJson = JSON.stringify(details ?? {});
  await sql`
    INSERT INTO audit_log (id, action, actor, details)
    VALUES (${id}, ${action}, ${actor}, ${detailsJson}::jsonb)
  `;
}
