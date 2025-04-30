"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import * as RechartsPrimitive from "recharts";
import { 
  Users, UserCheck, UserX, UserPlus, 
  Link as LinkIcon, ArrowUpRight, 
  FileText, UserCheck2, Gauge 
} from "lucide-react";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { 
  adminNavItems,
  getMentorshipChartData,
  getCohortChartData
} from "@/components/dashboard/admin/AdminUtils";
import ApplicationsTable from "@/components/dashboard/admin/ApplicationsTable";
import MentorshipsTable from "@/components/dashboard/admin/MentorshipsTable";
import CohortManagement from "@/components/dashboard/admin/CohortManagement";
import AnalyticsCards from "@/components/dashboard/admin/AnalyticsCards";
import { ChartContainer } from "@/components/ui/chart";
import { 
  getActiveCohort,
  getPendingApplications, 
  getActiveMentorships,
  getApprovedMentees,
  getApprovedMentors
} from "@/lib/mock-data-utils";
import { Admin } from "@/lib/types";

interface AdminDashboardClientProps {
  adminId: string;
  initialData: Admin | undefined;
}

export default function AdminDashboardClient({ adminId, initialData }: AdminDashboardClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // Check if admin exists and redirect if not
  useEffect(() => {
    if (!["admin1", "admin2", "admin3"].includes(adminId)) {
      router.push("/login");
    }
  }, [adminId, router]);

  // Get data
  const pendingApplications = getPendingApplications();
  const activeMentorships = getActiveMentorships();
  const approvedMentees = getApprovedMentees();
  const approvedMentors = getApprovedMentors();
  const activeCohort = getActiveCohort();
  
  // Dashboard metrics
  const totalMentorships = activeMentorships.length;
  const totalMentors = approvedMentors.length;
  const totalMentees = approvedMentees.length;
  
  // Cohort metrics
  const cohortCapacity = activeCohort?.capacity || 15;
  const activeMenteesCount = activeCohort?.activeMentees || 0;
  const availableSlots = cohortCapacity - activeMenteesCount;
  const cohortFillPercentage = (activeMenteesCount / cohortCapacity) * 100;

  // Chart data
  const mentorshipData = getMentorshipChartData();
  const cohortData = getCohortChartData();

  return (
    <DashboardShell role="admin" userId={adminId} navItems={adminNavItems(adminId)}>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Applications</span>
          </TabsTrigger>
          <TabsTrigger value="mentorships" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Mentorships</span>
          </TabsTrigger>
          <TabsTrigger value="cohorts" className="flex items-center gap-2">
            <UserCheck2 className="h-4 w-4" />
            <span className="hidden sm:inline">Cohort Management</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <AnalyticsCards 
            totalMentorships={totalMentorships}
            totalMentors={totalMentors} 
            totalMentees={totalMentees}
            pendingApplications={pendingApplications.length}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cohort Status</CardTitle>
                <CardDescription>Current cohort capacity and enrollment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {activeMenteesCount} / {cohortCapacity} Spots Filled
                    </span>
                    <span className="text-sm font-medium">
                      {availableSlots} Available
                    </span>
                  </div>
                  <Progress value={cohortFillPercentage} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Cohort Name:</span>
                    <span className="font-medium">{activeCohort?.name || "Spring 2024"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100">
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">End Date:</span>
                    <span className="font-medium">
                      {new Date(activeCohort?.endDate || "2024-06-30").toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => {
                  toast({
                    title: "Cohort Status",
                    description: `Spring 2024 cohort is currently active with ${activeMenteesCount} mentees.`,
                  });
                }}>
                  View Cohort Details
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mentorship Distribution</CardTitle>
                <CardDescription>Active mentorships by specialty</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ChartContainer config={{}}>
                    <RechartsPrimitive.PieChart>
                      <RechartsPrimitive.Pie
                        data={mentorshipData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="var(--chart-1)"
                        label
                      >
                        {mentorshipData.map((entry, index) => (
                          <RechartsPrimitive.Cell 
                            key={`cell-${index}`} 
                            fill={`var(--chart-${index + 1})`}
                          />
                        ))}
                      </RechartsPrimitive.Pie>
                      <RechartsPrimitive.Tooltip />
                      <RechartsPrimitive.Legend />
                    </RechartsPrimitive.PieChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Cohort Analytics</CardTitle>
                <CardDescription>Mentee progress through program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer config={{}}>
                    <RechartsPrimitive.BarChart data={cohortData}>
                      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                      <RechartsPrimitive.XAxis dataKey="month" />
                      <RechartsPrimitive.YAxis />
                      <RechartsPrimitive.Tooltip />
                      <RechartsPrimitive.Legend />
                      <RechartsPrimitive.Bar 
                        dataKey="meetings" 
                        fill="var(--chart-1)" 
                        name="Meetings"
                      />
                      <RechartsPrimitive.Bar 
                        dataKey="feedback" 
                        fill="var(--chart-2)" 
                        name="Feedback"
                      />
                    </RechartsPrimitive.BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Applications</CardTitle>
                  <CardDescription>Recent applications awaiting review</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="#applications">View All <ArrowUpRight className="h-4 w-4 ml-1" /></a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {pendingApplications.length > 0 ? (
                <div className="space-y-4">
                  {pendingApplications.slice(0, 3).map((application) => (
                    <div key={application.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                      <div>
                        <p className="font-medium">{application.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {application.role.charAt(0).toUpperCase() + application.role.slice(1)} • {application.email}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="h-8"
                          onClick={() => {
                            toast({
                              title: "Application Approved",
                              description: `${application.name}'s application has been approved.`,
                            });
                          }}
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8"
                          onClick={() => {
                            toast({
                              title: "Application Rejected",
                              description: `${application.name}'s application has been rejected.`,
                              variant: "destructive",
                            });
                          }}
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400">No pending applications</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications" id="applications">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>Manage pending and approved applications</CardDescription>
                </div>
                <Button 
                  className="sm:w-auto w-full"
                  onClick={() => {
                    toast({
                      title: "Add Mentor",
                      description: "This would open a form to add a mentor manually.",
                    });
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Mentor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ApplicationsTable applications={pendingApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mentorships">
          <Card>
            <CardHeader>
              <CardTitle>Active Mentorships</CardTitle>
              <CardDescription>
                View and manage current mentor-mentee relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MentorshipsTable mentorships={activeMentorships} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cohorts">
          <CohortManagement 
            activeCohort={activeCohort}
            availableSlots={availableSlots}
            cohortFillPercentage={cohortFillPercentage}
          />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}