"use client";

import { useState } from "react";
import { Check, X, BarChart, Award } from "lucide-react";
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
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Mentorship } from "@/lib/types";
import { 
  getMentorById, getMenteeById, 
  getFeedbackForMentorship,
  getMeetingsForMentorship
} from "@/lib/mock-data-utils";

interface MentorshipsTableProps {
  mentorships: Mentorship[];
}

export default function MentorshipsTable({ mentorships }: MentorshipsTableProps) {
  const { toast } = useToast();
  const [selectedMentorship, setSelectedMentorship] = useState<Mentorship | null>(null);

  const handlePromoteToAlumni = (menteeId: string) => {
    toast({
      title: "Mentee Promoted",
      description: "Mentee has been promoted to Alumni status",
    });
  };

  return (
    <div className="rounded-md border">
      {mentorships.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor</TableHead>
              <TableHead>Mentee</TableHead>
              <TableHead className="hidden md:table-cell">Started</TableHead>
              <TableHead className="hidden md:table-cell">Meetings</TableHead>
              <TableHead className="hidden md:table-cell">Feedback</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mentorships.map((mentorship) => {
              const mentor = getMentorById(mentorship.mentorId);
              const mentee = getMenteeById(mentorship.menteeId);
              
              return (
                <TableRow key={mentorship.id}>
                  <TableCell className="font-medium">
                    {mentor?.name || "Unknown"}
                  </TableCell>
                  <TableCell>{mentee?.name || "Unknown"}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(mentorship.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                      {mentorship.meetingsCompleted} completed
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className={
                      mentorship.feedbackSubmitted > 0
                        ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100"
                        : "bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    }>
                      {mentorship.feedbackSubmitted} submitted
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8"
                            onClick={() => setSelectedMentorship(mentorship)}
                          >
                            <BarChart className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Details</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Mentorship Details</DialogTitle>
                          </DialogHeader>
                          <MentorshipDetails mentorship={selectedMentorship} />
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        size="sm" 
                        className="h-8"
                        onClick={() => handlePromoteToAlumni(mentorship.menteeId)}
                      >
                        <Award className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Promote</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div className="flex items-center justify-center h-24">
          <p className="text-muted-foreground">No mentorships to display</p>
        </div>
      )}
    </div>
  );
}

function MentorshipDetails({ mentorship }: { mentorship: Mentorship | null }) {
  if (!mentorship) return null;
  
  const mentor = getMentorById(mentorship.mentorId);
  const mentee = getMenteeById(mentorship.menteeId);
  const feedbackList = getFeedbackForMentorship(mentorship.id);
  const meetings = getMeetingsForMentorship(mentorship.id);
  
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium">Mentor</h3>
          <p>{mentor?.name}</p>
          <p className="text-sm text-muted-foreground">{mentor?.jobTitle}</p>
          <p className="text-sm text-muted-foreground">{mentor?.company}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Mentee</h3>
          <p>{mentee?.name}</p>
          <p className="text-sm text-muted-foreground">{mentee?.currentPosition}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {mentee?.careerGoals.map((goal, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {goal}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mt-2">
        <h3 className="font-medium">Meetings</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>
                    {new Date(meeting.scheduledDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{meeting.duration} min</TableCell>
                  <TableCell>
                    <Badge variant={
                      meeting.status === "completed" 
                        ? "outline" 
                        : meeting.status === "scheduled" 
                          ? "secondary" 
                          : "destructive"
                    } className="capitalize">
                      {meeting.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {meeting.notes || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="space-y-2 mt-2">
        <h3 className="font-medium">Feedback</h3>
        {feedbackList.length > 0 ? (
          <div className="space-y-3">
            {feedbackList.map((feedback) => (
              <div key={feedback.id} className="border rounded-md p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      From: {feedback.fromId === mentorship.mentorId ? mentor?.name : mentee?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      To: {feedback.toId === mentorship.mentorId ? mentor?.name : mentee?.name}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`h-4 w-4 ${i < feedback.rating ? "text-amber-500" : "text-gray-300"}`}>
                          ★
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm italic">{feedback.comment}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No feedback submitted yet</p>
        )}
      </div>
      
      <div className="space-y-2 mt-2">
        <h3 className="font-medium">Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-md p-3">
            <p className="text-sm text-muted-foreground">Meeting Frequency</p>
            <p className="font-medium">{mentorship.meetingFrequency}</p>
          </div>
          <div className="border rounded-md p-3">
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="font-medium">{new Date(mentorship.startDate).toLocaleDateString()}</p>
          </div>
          <div className="border rounded-md p-3">
            <p className="text-sm text-muted-foreground">Meetings Completed</p>
            <p className="font-medium">{mentorship.meetingsCompleted}</p>
          </div>
          <div className="border rounded-md p-3">
            <p className="text-sm text-muted-foreground">Feedback Submitted</p>
            <p className="font-medium">{mentorship.feedbackSubmitted}</p>
          </div>
        </div>
      </div>
    </div>
  );
}