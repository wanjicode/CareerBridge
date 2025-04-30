"use client";

import { useState } from "react";
import { UserPlus, Users, Calendar, MailPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Cohort, Mentee } from "@/lib/types";
import { getApprovedMentees } from "@/lib/mock-data";

interface CohortManagementProps {
  activeCohort: Cohort | undefined;
  availableSlots: number;
  cohortFillPercentage: number;
}

export default function CohortManagement({ 
  activeCohort, 
  availableSlots,
  cohortFillPercentage 
}: CohortManagementProps) {
  const { toast } = useToast();
  const [waitlistedMentees, setWaitlistedMentees] = useState<Mentee[]>(
    getApprovedMentees().filter(mentee => mentee.waitlisted)
  );
  
  const emailWaitlist = () => {
    toast({
      title: "Waitlist Emailed",
      description: `Email sent to ${waitlistedMentees.length} mentees about the next cohort.`,
    });
  };
  
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Active Cohort</CardTitle>
          <CardDescription>
            {activeCohort?.name || "Spring 2024"} - Manage current cohort
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Capacity: {activeCohort?.activeMentees || 15}/{activeCohort?.capacity || 15}
              </span>
              <span className="text-sm font-medium">
                {availableSlots} Available
              </span>
            </div>
            <Progress value={cohortFillPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard 
              icon={<Calendar className="h-5 w-5 text-blue-500" />}
              title="Start Date"
              value={new Date(activeCohort?.startDate || "2024-03-01").toLocaleDateString()}
            />
            <InfoCard 
              icon={<Calendar className="h-5 w-5 text-blue-500" />}
              title="End Date"
              value={new Date(activeCohort?.endDate || "2024-06-30").toLocaleDateString()}
            />
            <InfoCard 
              icon={<Users className="h-5 w-5 text-blue-500" />}
              title="Status"
              value={
                <Badge className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100">
                  Active
                </Badge>
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button className="sm:w-auto w-full" disabled={availableSlots === 0}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Mentee
          </Button>
          <Button variant="outline" className="sm:w-auto w-full">
            <Users className="h-4 w-4 mr-2" />
            View Members
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Management</CardTitle>
          <CardDescription>
            {waitlistedMentees.length} mentees waiting for next cohort
          </CardDescription>
        </CardHeader>
        <CardContent>
          {waitlistedMentees.length > 0 ? (
            <div className="space-y-4">
              {waitlistedMentees.map((mentee) => (
                <div 
                  key={mentee.id} 
                  className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4"
                >
                  <div>
                    <p className="font-medium">{mentee.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {mentee.email}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {mentee.careerGoals.slice(0, 1).map((goal, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    disabled={availableSlots === 0}
                    onClick={() => {
                      if (availableSlots > 0) {
                        toast({
                          title: "Mentee Added",
                          description: `${mentee.name} has been added to the current cohort.`,
                        });
                        setWaitlistedMentees(prev => 
                          prev.filter(m => m.id !== mentee.id)
                        );
                      } else {
                        toast({
                          title: "Cohort Full",
                          description: "Cannot add mentee to current cohort as it's full.",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    {availableSlots > 0 ? "Add to Cohort" : "Cohort Full"}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No mentees on the waitlist</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            variant="outline"
            disabled={waitlistedMentees.length === 0}
            onClick={emailWaitlist}
          >
            <MailPlus className="h-4 w-4 mr-2" />
            Email Waitlist About Next Cohort
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Cohorts</CardTitle>
          <CardDescription>
            Plan and prepare for future cohorts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Summer 2024</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Starting: July 1, 2024
                  </p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                  Upcoming
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                  <p className="font-medium">15 mentees</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-medium">4 months</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Fall 2024</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Starting: November 1, 2024
                  </p>
                </div>
                <Badge variant="outline">
                  Planning
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                  <p className="font-medium">20 mentees (planned)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-medium">4 months</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            Manage Upcoming Cohorts
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
      </div>
      <div className="font-medium">{value}</div>
    </div>
  );
}