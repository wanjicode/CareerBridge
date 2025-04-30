import AdminDashboardClient from "@/components/dashboard/admin/AdminDashboardClient";
import { getAdminById } from "@/lib/mock-data";

export function generateStaticParams() {
  return [
    { id: "admin1" },
    { id: "admin2" },
    { id: "admin3" }
  ];
}

export default function AdminDashboardPage({ params }: { params: { id: string } }) {
  const admin = getAdminById(params.id);
  
  return <AdminDashboardClient adminId={params.id} initialData={admin} />;
}