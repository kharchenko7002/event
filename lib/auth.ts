import { cookies } from "next/headers";

export function isAdmin(): boolean {
  const token = cookies().get("admin_token")?.value;
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) return false;
  return token === adminToken;
}
