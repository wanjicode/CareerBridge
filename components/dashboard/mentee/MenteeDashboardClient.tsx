"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, Calendar, FileText, BookOpen, 
  MessageCircle, Clock, Shield, Gauge,
  FileCheck, BarChart, History, CheckCircle
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { 
  getMenteeById,
  getMentorById,
  getMentorshipByUsers,
  getResources
} from "@/lib/mock-data";
import { getMeetingsForMentorship } from "@/lib/mock-data-utils";
import { Mentee } from "@/lib/types";

// Mentee dashboard navigation items
const menteeNavItems = (menteeId: string) => [
  {
    href: `/dashboard/mentee/${menteeId}`,
    label: "Dashboard",
    icon: <Gauge className="h-4 w-4" />,
  },
  {
    href: `/dashboard/mentee/${menteeId}?tab=resources`,
    label: "Resources",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    href: `/dashboard/mentee/${menteeId}?tab=meetings`,
    label: "Meetings",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    href: `/dashboard/mentee/${menteeId}?tab=progress`,
    label: "Progress",
    icon: <BarChart className="h-4 w-4" />,
  },
];

interface MenteeDashboardClientProps {
  menteeId: string;
  initialData: Mentee | undefined;
}

export default function MenteeDashboardClient({ menteeId, initialData }: MenteeDashboardClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // Check if mentee exists and redirect if not
  useEffect(() => {
    if (!["mentee1", "mentee2", "mentee3"].includes(menteeId)) {
      router.push("/login");
    }
  }, [menteeId, router]);

  // Get mentee data
  const mentee = initialData;
  
  // Show appropriate content based on mentee status
  if (mentee) {
    if (mentee.status === "pending") {
      // For mentee1 - application pending
      return (
        <DashboardShell role="mentee" userId={menteeId} navItems={menteeNavItems(menteeId)}>
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Application Pending</CardTitle>
                <CardDescription>
                  Your application is currently under review.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Shield className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    Our admin team is reviewing your application. You'll receive an email 
                    once your status changes. This typically takes 1-3 business days.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Application Details</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Name:</span>
                          <span className="text-sm font-medium">{mentee?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Email:</span>
                          <span className="text-sm font-medium">{mentee?.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Current Position:</span>
                          <span className="text-sm font-medium">{mentee?.currentPosition}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Submitted On:</span>
                          <span className="text-sm font-medium">
                            {new Date(mentee?.createdAt || "").toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Career Goals</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentee?.careerGoals.map((goal, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    toast({
                      title: "Edit Application",
                      description: "You can edit your application while it's still pending.",
                    });
                  }}
                >
                  Edit Application
                </Button>
                <Button 
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
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>While You Wait</CardTitle>
                  <CardDescription>
                    Explore these free resources to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getResources().slice(0, 3).map((resource) => (
                      <a 
                        key={resource.id} 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-start p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="mr-3 mt-0.5">
                          {resource.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                          {resource.type === "video" && <BookOpen className="h-5 w-5 text-blue-500" />}
                          {resource.type === "article" && <FileCheck className="h-5 w-5 text-green-500" />}
                          {resource.type === "webinar" && <User className="h-5 w-5 text-purple-500" />}
                        </div>
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {resource.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {resource.tags.slice(0, 2).map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "View All Resources",
                        description: "Explore our full collection of learning resources.",
                      });
                    }}
                  >
                    View All Resources
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </DashboardShell>
      );
    } else if (mentee.waitlisted) {
      // For mentee3 - waitlisted
      return (
        <DashboardShell role="mentee" userId={menteeId} navItems={menteeNavItems(menteeId)}>
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Cohort Full</CardTitle>
                <CardDescription>
                  You've been added to the waitlist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <Clock className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    The current mentorship cohort is at capacity. We've added you to the waitlist
                    for the next cohort, which begins on May 12, 2024.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Waitlist Position</h3>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 font-medium rounded-full w-8 h-8 flex items-center justify-center">
                        3
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        You're 3rd in line for the next cohort
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Next Cohort Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Cohort Name:</span>
                        <span className="text-sm font-medium">Summer 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Start Date:</span>
                        <span className="text-sm font-medium">May 12, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Duration:</span>
                        <span className="text-sm font-medium">4 months</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Your Application</h3>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                      <Badge className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100">
                        Approved
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    toast({
                      title: "Edit Application",
                      description: "You can update your preferences while on the waitlist.",
                    });
                  }}
                >
                  Edit Application
                </Button>
                <Button 
                  className="w-full sm:w-auto"
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
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>While You Wait</CardTitle>
                  <CardDescription>
                    Explore these free resources to get a head start
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getResources().slice(0, 3).map((resource) => (
                      <a 
                        key={resource.id} 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-start p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="mr-3 mt-0.5">
                          {resource.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                          {resource.type === "video" && <BookOpen className="h-5 w-5 text-blue-500" />}
                          {resource.type === "article" && <FileCheck className="h-5 w-5 text-green-500" />}
                          {resource.type === "webinar" && <User className="h-5 w-5 text-purple-500" />}
                        </div>
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {resource.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {resource.tags.slice(0, 2).map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "View All Resources",
                        description: "Explore our full collection of learning resources.",
                      });
                    }}
                  >
                    View All Resources
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </DashboardShell>
      );
    } else if (mentee.status === "approved" && mentee.mentorId) {
      // For mentee2 - verified and matched
      return (
        <DashboardShell role="mentee" userId={menteeId} navItems={menteeNavItems(menteeId)}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="mentor" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">My Mentor</span>
              </TabsTrigger>
              <TabsTrigger value="meetings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Meetings</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Resources</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Progress</CardTitle>
                    <CardDescription>Track your mentorship journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</span>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">Introduction Meeting</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">Goal Setting</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">Skill Development</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Meeting</CardTitle>
                    <CardDescription>Your next mentorship session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                        <div>
                          <p className="font-medium">Technical Discussion</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Thursday, May 2, 2024 • 7:00 PM
                          </p>
                        </div>
                        <Button>Join Meeting</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Resources</CardTitle>
                    <CardDescription>Curated for your learning journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getResources().slice(0, 3).map((resource) => (
                        <a 
                          key={resource.id} 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-start p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="mr-3 mt-0.5">
                            {resource.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                            {resource.type === "video" && <BookOpen className="h-5 w-5 text-blue-500" />}
                            {resource.type === "article" && <FileCheck className="h-5 w-5 text-green-500" />}
                            {resource.type === "webinar" && <User className="h-5 w-5 text-purple-500" />}
                          </div>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {resource.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {resource.tags.slice(0, 2).map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Resources</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="mentor">
              <Card>
                <CardHeader>
                  <CardTitle>My Mentor</CardTitle>
                  <CardDescription>Your matched mentor details</CardDescription>
                </CardHeader>
                <CardContent>
                  {mentee.mentorId ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full h-20 w-20 text-xl font-bold mb-2">
                          {getMentorById(mentee.mentorId)?.name.split(' ').map(part => part[0]).join('')}
                        </div>
                        <h3 className="text-lg font-medium">{getMentorById(mentee.mentorId)?.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {getMentorById(mentee.mentorId)?.jobTitle} at {getMentorById(mentee.mentorId)?.company}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {getMentorById(mentee.mentorId)?.specializations.map((spec, i) => (
                              <Badge key={i} variant="secondary">{spec}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Bio</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {getMentorById(mentee.mentorId)?.bio}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Availability</h4>
                          <div className="space-y-2">
                            {getMentorById(mentee.mentorId)?.availability.map((slot, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 border rounded-md">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">{slot}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <User className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No mentor assigned yet</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="meetings">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Meetings</CardTitle>
                      <CardDescription>Your mentorship sessions</CardDescription>
                    </div>
                    <Button>
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
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date & Time</TableHead>
                              <TableHead>Duration</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>May 2, 2024 • 7:00 PM</TableCell>
                              <TableCell>60 min</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button size="sm">Join</Button>
                                  <Button size="sm" variant="outline">Reschedule</Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="past">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date & Time</TableHead>
                              <TableHead>Duration</TableHead>
                              <TableHead>Notes</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>April 18, 2024 • 7:00 PM</TableCell>
                              <TableCell>60 min</TableCell>
                              <TableCell className="max-w-xs truncate">
                                Discussed career goals and created action plan
                              </TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" variant="outline">View Details</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                  <CardDescription>Resources to support your growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="recommended">
                    <TabsList className="mb-4">
                      <TabsTrigger value="recommended">Recommended</TabsTrigger>
                      <TabsTrigger value="all">All Resources</TabsTrigger>
                      <TabsTrigger value="saved">Saved</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="recommended">
                      <div className="space-y-4">
                        {getResources().slice(0, 4).map((resource) => (
                          <a 
                            key={resource.id} 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-start p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="mr-3 mt-0.5">
                              {resource.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                              {resource.type === "video" && <BookOpen className="h-5 w-5 text-blue-500" />}
                              {resource.type === "article" && <FileCheck className="h-5 w-5 text-green-500" />}
                              {resource.type === "webinar" && <User className="h-5 w-5 text-purple-500" />}
                            </div>
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {resource.description}
                              </p>
                              <div className="flex flex-wrap gap-1  mt-2">
                                {resource.tags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="all">
                      <div className="space-y-4">
                        {getResources().map((resource) => (
                          <a 
                            key={resource.id} 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-start p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="mr-3 mt-0.5">
                              {resource.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                              {resource.type === "video" && <BookOpen className="h-5 w-5 text-blue-500" />}
                              {resource.type === "article" && <FileCheck className="h-5 w-5 text-green-500" />}
                              {resource.type === "webinar" && <User className="h-5 w-5 text-purple-500" />}
                            </div>
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {resource.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {resource.tags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="saved">
                      <div className="text-center py-10">
                        <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No saved resources yet</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Save resources for easy access later
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DashboardShell>
      );
    }
  }
  
  return (
    <DashboardShell role="mentee" userId={menteeId} navItems={menteeNavItems(menteeId)}>
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">
          Mentee not found or status unknown.
        </p>
      </div>
    </DashboardShell>
  );
}