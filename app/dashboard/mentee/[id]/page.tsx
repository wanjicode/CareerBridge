import MenteeDashboardClient from "@/components/dashboard/mentee/MenteeDashboardClient";
import { getMenteeById } from "@/lib/mock-data";

export function generateStaticParams() {
  return [
    { id: "mentee1" },
    { id: "mentee2" },
    { id: "mentee3" }
  ];
}

export default function MenteeDashboardPage({ params }: { params: { id: string } }) {
  const mentee = getMenteeById(params.id);
  
  return <MenteeDashboardClient menteeId={params.id} initialData={mentee} />;
}