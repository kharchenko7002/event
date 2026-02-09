import { cookies } from "next/headers";

export async function isAdmin(): Promise<boolean> {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  return token === adminToken;
}