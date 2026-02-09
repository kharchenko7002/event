import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminPage } from "@/components/admin";

export default function Page() {
  const token = cookies().get("admin_token")?.value;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken || token !== adminToken) {
    redirect("/admin/login");
  }

  return <AdminPage />;
}
