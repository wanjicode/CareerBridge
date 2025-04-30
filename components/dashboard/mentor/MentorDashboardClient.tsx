"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, MessageCircle, Calendar, BookOpen, 
  BarChart, Clock, History, Gauge, User
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { 
  getMentorById, 
  getMeetingsForMentorship,
  getFeedbackForMentorship
} from "@/lib/mock-data-utils";
import { 
  getMentorshipByUsers,
  getMenteeById
} from "@/lib/mock-data";
import { Mentor } from "@/lib/types";

// Mentor dashboard navigation items
const mentorNavItems = (mentorId: string) => [
  {
    href: `/dashboard/mentor/${mentorId}`,
    label: "Dashboard",
    icon: <Gauge className="h-4 w-4" />,
  },
  {
    href: `/dashboard/mentor/${mentorId}?tab=meetings`,
    label: "Meetings",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    href: `/dashboard/mentor/${mentorId}?tab=resources`,
    label: "Resources",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    href: `/dashboard/mentor/${mentorId}?tab=history`,
    label: "History",
    icon: <History className="h-4 w-4" />,
  },
];

interface MentorDashboardClientProps {
  mentorId: string;
  initialData: Mentor | undefined;
}

export default function MentorDashboardClient({ mentorId, initialData }: MentorDashboardClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // Check if mentor exists and redirect if not
  useEffect(() => {
    if (!["mentor1", "mentor2"].includes(mentorId)) {
      router.push("/login");
    }
  }, [mentorId, router]);

  // Get mentor data
  const mentor = initialData;
  
  // If mentor is not verified, show pending verification
  if (mentor && mentor.status === "pending") {
    return (
      <DashboardShell role="mentor" userId={mentorId} navItems={mentorNavItems(mentorId)}>
        <div className="flex items-center justify-center h-64">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Application Pending</CardTitle>
              <CardDescription>
                Your mentor application is currently under review.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                <AlertDescription>
                  Our admin team is reviewing your application. You'll receive an email 
                  once your status changes. This typically takes 1-3 business days.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Contact Support",
                    description: "If you have any questions, our support team is here to help.",
                  });
                }}
              >
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DashboardShell>
    );
  }
  
  // For mentor2 - verified and has mentee
  if (mentor && mentor.status === "approved") {
    // Get mentee if mentor has one assigned
    const menteeId = mentor.currentMentees[0] || null;
    const mentee = menteeId ? getMenteeById(menteeId) : null;
    
    // Get mentorship if it exists
    const mentorship = menteeId 
      ? getMentorshipByUsers(mentorId, menteeId) 
      : null;
    
    // Get meetings and feedback if mentorship exists
    const meetings = mentorship 
      ? getMeetingsForMentorship(mentorship.id) 
      : [];
      
    const feedbackItems = mentorship 
      ? getFeedbackForMentorship(mentorship.id) 
      : [];
    
    const upcomingMeetings = meetings.filter(m => m.status === "scheduled");
    
    return (
      <DashboardShell role="mentor" userId={mentorId} navItems={mentorNavItems(mentorId)}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Meetings</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>My Mentees</CardTitle>
                  <CardDescription>
                    {mentor.currentMentees.length 
                      ? `Managing ${mentor.currentMentees.length}/${mentor.menteeCapacity} mentees` 
                      : "You have no assigned mentees yet"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mentee ? (
                    <div className="border rounded-md p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-lg">{mentee.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{mentee.email}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {mentee.careerGoals.map((goal, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Schedule Meeting",
                                description: "This would open the meeting scheduler.",
                              });
                            }}
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Schedule Meeting
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Send Message",
                                description: "This would open the messaging interface.",
                              });
                            }}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                      
                      {mentorship && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Started</p>
                              <p className="font-medium">
                                {new Date(mentorship.startDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Meetings</p>
                              <p className="font-medium">{mentorship.meetingsCompleted} completed</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Frequency</p>
                              <p className="font-medium">{mentorship.meetingFrequency}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Feedback</p>
                              <p className="font-medium">{mentorship.feedbackSubmitted} submitted</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Users className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No mentees assigned yet</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        An admin will match you with mentees soon
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>My Availability</CardTitle>
                  <CardDescription>Current availability schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  {mentor.availability.length ? (
                    <div className="space-y-2">
                      {mentor.availability.map((slot, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span>{slot}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No availability set</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Update Availability",
                        description: "This would open the availability management interface.",
                      });
                    }}
                  >
                    Update Availability
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
                <CardDescription>
                  Your schedule for the coming days
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingMeetings.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Mentee</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingMeetings.map((meeting) => (
                          <TableRow key={meeting.id}>
                            <TableCell className="font-medium">
                              {new Date(meeting.scheduledDate).toLocaleString()}
                            </TableCell>
                            <TableCell>{mentee?.name || "Unknown"}</TableCell>
                            <TableCell>{meeting.duration} min</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button 
                                  size="sm" 
                                  className="h-8"
                                  onClick={() => {
                                    toast({
                                      title: "Join Meeting",
                                      description: "This would launch the meeting interface.",
                                    });
                                  }}
                                >
                                  Join
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8"
                                  onClick={() => {
                                    toast({
                                      title: "Reschedule",
                                      description: "This would open the rescheduling interface.",
                                    });
                                  }}
                                >
                                  Reschedule
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No upcoming meetings</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Schedule New Meeting",
                      description: "This would open the scheduling interface.",
                    });
                  }}
                >
                  Schedule New Meeting
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>
                  Latest feedback from your mentees
                </CardDescription>
              </CardHeader>
              <CardContent>
                {feedbackItems.length > 0 ? (
                  <div className="space-y-4">
                    {feedbackItems
                      .filter(f => f.toId === mentorId)
                      .map((feedback) => (
                        <div key={feedback.id} className="border rounded-md p-4">
                          <div className="flex justify-between">
                            <p className="font-medium">
                              From: {getMenteeById(feedback.fromId)?.name || "Unknown Mentee"}
                            </p>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className={`h-4 w-4 ${i < feedback.rating ? "text-amber-500" : "text-gray-300"}`}>
                                  ★
                                </div>
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm italic">{feedback.comment}</p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No feedback received yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="meetings">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Meetings</CardTitle>
                    <CardDescription>
                      Manage your mentorship meetings
                    </CardDescription>
                  </div>
                  <Button onClick={() => {
                    toast({
                      title: "Schedule New Meeting",
                      description: "This would open the scheduling interface.",
                    });
                  }}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming">
                    {upcomingMeetings.length > 0 ? (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date & Time</TableHead>
                              <TableHead>Mentee</TableHead>
                              <TableHead>Duration</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {upcomingMeetings.map((meeting) => (
                              <TableRow key={meeting.id}>
                                <TableCell className="font-medium">
                                  {new Date(meeting.scheduledDate).toLocaleString()}
                                </TableCell>
                                <TableCell>{mentee?.name || "Unknown"}</TableCell>
                                <TableCell>{meeting.duration} min</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button 
                                      size="sm" 
                                      className="h-8"
                                      onClick={() => {
                                        toast({
                                          title: "Join Meeting",
                                          description: "This would launch the meeting interface.",
                                        });
                                      }}
                                    >
                                      Join
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-8"
                                      onClick={() => {
                                        toast({
                                          title: "Reschedule",
                                          description: "This would open the rescheduling interface.",
                                        });
                                      }}
                                    >
                                      Reschedule
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No upcoming meetings</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Schedule a meeting with your mentees
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="past">
                    {meetings.filter(m => m.status === "completed").length > 0 ? (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date & Time</TableHead>
                              <TableHead>Mentee</TableHead>
                              <TableHead>Duration</TableHead>
                              <TableHead>Notes</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {meetings
                              .filter(m => m.status === "completed")
                              .map((meeting) => (
                                <TableRow key={meeting.id}>
                                  <TableCell className="font-medium">
                                    {new Date(meeting.scheduledDate).toLocaleString()}
                                  </TableCell>
                                  <TableCell>{mentee?.name || "Unknown"}</TableCell>
                                  <TableCell>{meeting.duration} min</TableCell>
                                  <TableCell className="max-w-xs truncate">
                                    {meeting.notes || "—"}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-8"
                                      onClick={() => {
                                        toast({
                                          title: "View Meeting",
                                          description: "This would open the meeting details.",
                                        });
                                      }}
                                    >
                                      View Details
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <History className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No past meetings</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Management</CardTitle>
                <CardDescription>
                  View received feedback and provide your own
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="received">
                  <TabsList className="mb-4">
                    <TabsTrigger value="received">Received</TabsTrigger>
                    <TabsTrigger value="given">Given</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="received">
                    {feedbackItems.filter(f => f.toId === mentorId).length > 0 ? (
                      <div className="space-y-4">
                        {feedbackItems
                          .filter(f => f.toId === mentorId)
                          .map((feedback) => (
                            <div key={feedback.id} className="border rounded-md p-4">
                              <div className="flex justify-between">
                                <p className="font-medium">
                                  From: {getMenteeById(feedback.fromId)?.name || "Unknown Mentee"}
                                </p>
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className={`h-4 w-4 ${i < feedback.rating ? "text-amber-500" : "text-gray-300"}`}>
                                      ★
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <p className="mt-2 text-sm italic">{feedback.comment}</p>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {new Date(feedback.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No feedback received yet</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="given">
                    {feedbackItems.filter(f => f.fromId === mentorId).length > 0 ? (
                      <div className="space-y-4">
                        {feedbackItems
                          .filter(f => f.fromId === mentorId)
                          .map((feedback) => (
                            <div key={feedback.id} className="border rounded-md p-4">
                              <div className="flex justify-between">
                                <p className="font-medium">
                                  To: {getMenteeById(feedback.toId)?.name || "Unknown Mentee"}
                                </p>
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className={`h-4 w-4 ${i < feedback.rating ? "text-amber-500" : "text-gray-300"}`}>
                                      ★
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <p className="mt-2 text-sm italic">{feedback.comment}</p>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {new Date(feedback.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No feedback given yet</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="pending">
                    <div className="space-y-4">
                      {mentee && (
                        <div className="border rounded-md p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              <p className="font-medium">
                                Provide feedback for {mentee.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Last meeting: {
                                  meetings.length > 0 
                                    ? new Date(meetings[meetings.length - 1].scheduledDate).toLocaleDateString() 
                                    : "No meetings yet"
                                }
                              </p>
                            </div>
                            <Button onClick={() => {
                              toast({
                                title: "Provide Feedback",
                                description: "This would open the feedback form.",
                              });
                            }}>
                              Provide Feedback
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resources & Materials</CardTitle>
                <CardDescription>
                  Share helpful resources with your mentees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md">
                    <h3 className="font-medium text-blue-800 dark:text-blue-100">
                      Mentor Resources
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                      Access guides and tools to enhance your mentoring effectiveness
                    </p>
                    <div className="mt-4 space-y-2">
                      <ResourceLink 
                        title="Effective Mentoring Guide" 
                        description="Best practices for impactful mentoring relationships"
                        link="#"
                      />
                      <ResourceLink 
                        title="Feedback Frameworks" 
                        description="Structured approaches to providing constructive feedback"
                        link="#"
                      />
                      <ResourceLink 
                        title="Career Development Templates" 
                        description="Templates to help mentees plan their career path"
                        link="#"
                      />
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium">Shared with Mentees</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Resources you've shared with your mentees
                    </p>
                    <div className="mt-4 space-y-2">
                      {mentee ? (
                        <>
                          <ResourceLink 
                            title="Product Management Roadmap" 
                            description="Shared with Emma Wilson"
                            link="#"
                            date="April 10, 2024"
                          />
                          <ResourceLink 
                            title="User Research Methods" 
                            description="Shared with Emma Wilson"
                            link="#"
                            date="March 25, 2024"
                          />
                        </>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 py-2">
                          No resources shared yet
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          toast({
                            title: "Share New Resource",
                            description: "This would open the resource sharing interface.",
                          });
                        }}
                      >
                        Share New Resource
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    );
  }
  
  return (
    <DashboardShell role="mentor" userId={mentorId} navItems={mentorNavItems(mentorId)}>
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">
          Mentor not found or not verified.
        </p>
      </div>
    </DashboardShell>
  );
}

function ResourceLink({ title, description, link, date = null }) {
  
  return (
    <div className="flex items-start border-b pb-2 last:border-0 last:pb-0">
      <BookOpen className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
      <div className="flex-grow">
        <a 
          href={link} 
          className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {title}
        </a>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        {date && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Shared on {date}
          </p>
        )}
      </div>
    </div>
  );
}