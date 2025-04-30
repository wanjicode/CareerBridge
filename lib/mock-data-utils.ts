import { 
  mentors, mentees, mentorships,
  feedbacks, meetings 
} from './mock-data';

export function getMentorById(mentorId: string) {
  return mentors.find(mentor => mentor.id === mentorId);
}

export function getMenteeById(menteeId: string) {
  return mentees.find(mentee => mentee.id === menteeId);
}

export function getFeedbackForMentorship(mentorshipId: string) {
  return feedbacks.filter(feedback => feedback.mentorshipId === mentorshipId);
}

export function getMeetingsForMentorship(mentorshipId: string) {
  return meetings.filter(meeting => meeting.mentorshipId === mentorshipId);
}

export function getMentorshipById(mentorshipId: string) {
  return mentorships.find(mentorship => mentorship.id === mentorshipId);
}

export function getMentorshipByUsers(mentorId: string, menteeId: string) {
  return mentorships.find(
    mentorship => mentorship.mentorId === mentorId && mentorship.menteeId === menteeId
  );
}

export function getActiveMentorships() {
  return mentorships.filter(mentorship => mentorship.status === "active");
}

export function getApprovedMentors() {
  return mentors.filter(mentor => mentor.status === "approved");
}

export function getApprovedMentees() {
  return mentees.filter(mentee => mentee.status === "approved");
}

export function getPendingApplications() {
  return [...mentors, ...mentees].filter(user => user.status === "pending");
}

export function getActiveCohort() {
  return {
    id: "cohort1",
    name: "Spring 2024",
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-06-30T00:00:00Z",
    capacity: 15,
    activeMentees: 12,
    status: "active" as const
  };
}

export function getMentorshipChartData() {
  return [
    { name: "Software Dev", value: 5 },
    { name: "Product Management", value: 3 },
    { name: "Data Science", value: 2 },
    { name: "UX Design", value: 3 },
    { name: "Marketing", value: 2 }
  ];
}

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