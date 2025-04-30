"use client";

import { useState } from "react";
import { 
  UserCheck, UserX, Link as LinkIcon, 
  ExternalLink, File 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/lib/types";

interface ApplicationsTableProps {
  applications: User[];
}

export default function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const [localApplications, setLocalApplications] = useState(applications);
  const { toast } = useToast();

  const handleApprove = (application: User) => {
    toast({
      title: "Application Approved",
      description: `${application.name}'s application has been approved.`,
    });
    
    // Update local state (in a real app, this would update the backend)
    setLocalApplications(prev => 
      prev.map(app => 
        app.id === application.id 
          ? { ...app, status: "approved" as const } 
          : app
      )
    );
  };

  const handleReject = (application: User) => {
    toast({
      title: "Application Rejected",
      description: `${application.name}'s application has been rejected.`,
      variant: "destructive",
    });
    
    // Update local state
    setLocalApplications(prev => 
      prev.map(app => 
        app.id === application.id 
          ? { ...app, status: "rejected" as const } 
          : app
      )
    );
  };

  return (
    <div className="rounded-md border">
      {localApplications.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Applied</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {application.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={application.status} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(application.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {application.role === "mentor" && application.resumeUrl && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            <File className="h-4 w-4" />
                            <span className="sr-only">View Resume</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Resume Preview</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 border p-4 rounded-md">
                            <p className="text-sm text-muted-foreground mb-2">
                              Resume URL:
                            </p>
                            <div className="flex items-center gap-2 break-all text-blue-600">
                              <LinkIcon className="h-4 w-4 flex-shrink-0" />
                              <a 
                                href={application.resumeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {application.resumeUrl}
                              </a>
                              <ExternalLink className="h-4 w-4 flex-shrink-0" />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    {application.status === "pending" && (
                      <>
                        <Button 
                          size="sm" 
                          className="h-8"
                          onClick={() => handleApprove(application)}
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Approve</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8"
                          onClick={() => handleReject(application)}
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Reject</span>
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex items-center justify-center h-24">
          <p className="text-muted-foreground">No applications to display</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100">
          Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-100">
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100">
          Pending
        </Badge>
      );
  }
}