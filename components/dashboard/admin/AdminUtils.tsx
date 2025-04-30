import { 
  Users, Gauge, FileText, UserCheck2, 
  UserPlus, BarChart3
} from "lucide-react";

// Navigation items for admin dashboard
export const adminNavItems = (adminId: string) => [
  {
    href: `/dashboard/admin/${adminId}`,
    label: "Dashboard",
    icon: <Gauge className="h-4 w-4" />,
  },
  {
    href: `/dashboard/admin/${adminId}?tab=applications`,
    label: "Applications",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    href: `/dashboard/admin/${adminId}?tab=mentorships`,
    label: "Mentorships",
    icon: <Users className="h-4 w-4" />,
  },
  {
    href: `/dashboard/admin/${adminId}?tab=cohorts`,
    label: "Cohorts",
    icon: <UserCheck2 className="h-4 w-4" />,
  },
  {
    href: `/dashboard/admin/${adminId}?tab=analytics`,
    label: "Analytics",
    icon: <BarChart3 className="h-4 w-4" />,
  },
];

// Helper function to generate mentorship chart data
export function getMentorshipChartData() {
  return [
    { name: "Software Dev", value: 5 },
    { name: "Product Management", value: 3 },
    { name: "Data Science", value: 2 },
    { name: "UX Design", value: 3 },
    { name: "Marketing", value: 2 }
  ];
}

// Helper function to generate cohort chart data 
export function getCohortChartData() {
  return [
    {
      month: "March",
      meetings: 12,
      feedback: 10
    },
    {
      month: "April",
      meetings: 18,
      feedback: 15
    },
    {
      month: "May",
      meetings: 24,
      feedback: 20
    },
    {
      month: "June",
      meetings: 0,
      feedback: 0
    }
  ];
}