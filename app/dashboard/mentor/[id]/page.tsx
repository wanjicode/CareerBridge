import MentorDashboardClient from "@/components/dashboard/mentor/MentorDashboardClient";
import { getMentorById } from "@/lib/mock-data";

export function generateStaticParams() {
  return [
    { id: "mentor1" },
    { id: "mentor2" }
  ];
}

export default function MentorDashboardPage({ params }: { params: { id: string } }) {
  const mentor = getMentorById(params.id);
  
  return <MentorDashboardClient mentorId={params.id} initialData={mentor} />;
}