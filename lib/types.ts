// User types
export type Role = "admin" | "mentor" | "mentee" | "alumni";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export type MentorshipStatus = "active" | "completed" | "cancelled";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: ApplicationStatus;
  jobTitle?: string;
  company?: string;
  bio?: string;
  skills?: string[];
  resumeUrl?: string;
  createdAt: string;
}

export interface Admin extends User {
  role: "admin";
}

export interface Mentor extends User {
  role: "mentor";
  jobTitle: string;
  company: string;
  yearsOfExperience: number;
  specializations: string[];
  availability: string[];
  menteeCapacity: number;
  currentMentees: string[];
}

export interface Mentee extends User {
  role: "mentee";
  careerGoals: string[];
  currentPosition?: string;
  lookingFor: string[];
  mentorId?: string;
  cohort?: string;
  waitlisted?: boolean;
}

// Mentorship related types
export interface Mentorship {
  id: string;
  mentorId: string;
  menteeId: string;
  status: MentorshipStatus;
  startDate: string;
  endDate?: string;
  meetingFrequency: string;
  meetingsCompleted: number;
  feedbackSubmitted: number;
  createdAt: string;
}

export interface Feedback {
  id: string;
  mentorshipId: string;
  fromId: string;
  toId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Meeting {
  id: string;
  mentorshipId: string;
  scheduledDate: string;
  duration: number;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
}

export interface Cohort {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  capacity: number;
  activeMentees: number;
  status: "upcoming" | "active" | "completed";
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "pdf" | "video" | "article" | "webinar" | "other";
  tags: string[];
  createdAt: string;
}