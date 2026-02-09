import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminPage } from "@/components/admin";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken || token !== adminToken) {
    redirect("/admin/login");
  }

  return <AdminPage />;
}