import { 
  User, Admin, Mentor, Mentee, Mentorship, 
  Feedback, Meeting, Cohort, Resource 
} from './types';

// Admins
export const admins: Admin[] = [
  {
    id: "admin1",
    name: "Alex Johnson",
    email: "alex.johnson@careerbridge.com",
    role: "admin",
    status: "approved",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "admin2",
    name: "Sarah Williams",
    email: "sarah.williams@careerbridge.com",
    role: "admin",
    status: "approved",
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "admin3",
    name: "Michael Chen",
    email: "michael.chen@careerbridge.com",
    role: "admin",
    status: "approved",
    createdAt: "2024-01-03T00:00:00Z",
  },
];

// Mentors
export const mentors: Mentor[] = [
  {
    id: "mentor1",
    name: "Jessica Lee",
    email: "jessica.lee@company.com",
    role: "mentor",
    status: "pending", // Not verified
    jobTitle: "Senior Software Engineer",
    company: "TechCorp",
    yearsOfExperience: 8,
    specializations: ["Frontend Development", "React", "UI/UX"],
    availability: ["Mon: 5-7pm", "Thu: 6-8pm"],
    menteeCapacity: 3,
    currentMentees: [],
    resumeUrl: "https://example.com/resume/jessica-lee.pdf",
    bio: "Passionate about helping junior developers grow and navigate the tech industry.",
    skills: ["JavaScript", "React", "Node.js", "mentoring"],
    createdAt: "2024-03-15T00:00:00Z",
  },
  {
    id: "mentor2",
    name: "David Rodriguez",
    email: "david.rodriguez@company.com",
    role: "mentor",
    status: "approved", // Verified
    jobTitle: "Product Manager",
    company: "InnovateTech",
    yearsOfExperience: 6,
    specializations: ["Product Strategy", "User Research", "Agile"],
    availability: ["Tue: 7-9pm", "Sat: 10am-12pm"],
    menteeCapacity: 2,
    currentMentees: ["mentee2"],
    resumeUrl: "https://example.com/resume/david-rodriguez.pdf",
    bio: "Helping aspiring product managers understand the field and excel in their careers.",
    skills: ["Product Management", "Agile", "User Research", "Roadmapping"],
    createdAt: "2024-02-20T00:00:00Z",
  },
];

// Mentees
export const mentees: Mentee[] = [
  {
    id: "mentee1",
    name: "Ryan Taylor",
    email: "ryan.taylor@gmail.com",
    role: "mentee",
    status: "pending", // Application pending
    careerGoals: ["Become a Full Stack Developer", "Work at a startup"],
    currentPosition: "Computer Science Student",
    lookingFor: ["Technical guidance", "Industry insights", "Resume review"],
    bio: "Graduating this year and eager to break into the tech industry.",
    skills: ["JavaScript", "Python", "SQL"],
    createdAt: "2024-04-01T00:00:00Z",
  },
  {
    id: "mentee2",
    name: "Emma Wilson",
    email: "emma.wilson@gmail.com",
    role: "mentee",
    status: "approved", // Verified
    careerGoals: ["Transition to Product Management", "Learn Agile methodologies"],
    currentPosition: "Marketing Specialist",
    lookingFor: ["Career transition advice", "Product skills development"],
    mentorId: "mentor2", // Matched with mentor2
    cohort: "Spring2024",
    bio: "Marketing professional looking to pivot into product management.",
    skills: ["Marketing", "Communication", "Basic HTML/CSS"],
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "mentee3",
    name: "Omar Patel",
    email: "omar.patel@gmail.com",
    role: "mentee",
    status: "approved", // Verified but waitlisted
    careerGoals: ["Data Science career", "Machine Learning specialization"],
    currentPosition: "Data Analyst",
    lookingFor: ["Technical mentorship", "Advanced analytics guidance"],
    cohort: "Summer2024",
    waitlisted: true, // Added to waitlist (cohort full)
    bio: "Data analyst looking to advance into data science and machine learning.",
    skills: ["SQL", "Python", "Data Visualization", "Statistics"],
    createdAt: "2024-04-05T00:00:00Z",
  },
];

// Active mentorships
export const mentorships: Mentorship[] = [
  {
    id: "mentorship1",
    mentorId: "mentor2",
    menteeId: "mentee2",
    status: "active",
    startDate: "2024-03-20T00:00:00Z",
    meetingFrequency: "Biweekly",
    meetingsCompleted: 3,
    feedbackSubmitted: 2,
    createdAt: "2024-03-20T00:00:00Z",
  },
];

// Feedback examples
export const feedbacks: Feedback[] = [
  {
    id: "feedback1",
    mentorshipId: "mentorship1",
    fromId: "mentee2",
    toId: "mentor2",
    rating: 5,
    comment: "David has been incredibly helpful in explaining product management concepts. His advice on transitioning from marketing to product was spot on!",
    createdAt: "2024-03-27T00:00:00Z",
  },
  {
    id: "feedback2",
    mentorshipId: "mentorship1",
    fromId: "mentor2",
    toId: "mentee2",
    rating: 4,
    comment: "Emma is making great progress. She's diligent in completing the recommended readings and asks insightful questions.",
    createdAt: "2024-04-10T00:00:00Z",
  },
];

// Meeting examples
export const meetings: Meeting[] = [
  {
    id: "meeting1",
    mentorshipId: "mentorship1",
    scheduledDate: "2024-03-21T19:00:00Z",
    duration: 60, // minutes
    status: "completed",
    notes: "Discussed career transition strategy and recommended resources",
    createdAt: "2024-03-15T00:00:00Z",
  },
  {
    id: "meeting2",
    mentorshipId: "mentorship1",
    scheduledDate: "2024-04-04T19:00:00Z",
    duration: 60,
    status: "completed",
    notes: "Reviewed product case study and provided feedback",
    createdAt: "2024-03-28T00:00:00Z",
  },
  {
    id: "meeting3",
    mentorshipId: "mentorship1",
    scheduledDate: "2024-04-18T19:00:00Z",
    duration: 60,
    status: "completed",
    notes: "Mock interview for product role",
    createdAt: "2024-04-11T00:00:00Z",
  },
  {
    id: "meeting4",
    mentorshipId: "mentorship1",
    scheduledDate: "2024-05-02T19:00:00Z",
    duration: 60,
    status: "scheduled",
    createdAt: "2024-04-19T00:00:00Z",
  },
];

// Cohort information
export const cohorts: Cohort[] = [
  {
    id: "cohort1",
    name: "Spring 2024",
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-06-30T00:00:00Z",
    capacity: 15,
    activeMentees: 15, // Full capacity
    status: "active",
  },
  {
    id: "cohort2",
    name: "Summer 2024",
    startDate: "2024-07-01T00:00:00Z",
    endDate: "2024-10-31T00:00:00Z",
    capacity: 15,
    activeMentees: 0, // Not started yet
    status: "upcoming",
  },
];

// Resources for mentees
export const resources: Resource[] = [
  {
    id: "resource1",
    title: "Resume Building Guide",
    description: "Comprehensive guide to crafting a standout tech resume",
    url: "https://example.com/resources/resume-guide.pdf",
    type: "pdf",
    tags: ["career", "resume", "job-hunting"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "resource2",
    title: "Technical Interview Preparation",
    description: "Video series on acing coding interviews",
    url: "https://example.com/resources/tech-interviews",
    type: "video",
    tags: ["interviews", "coding", "algorithms"],
    createdAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "resource3",
    title: "Product Management Fundamentals",
    description: "Introduction to key product management concepts and methodologies",
    url: "https://example.com/resources/pm-basics.pdf",
    type: "pdf",
    tags: ["product-management", "career-transition"],
    createdAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "resource4",
    title: "Networking Strategies for Tech Professionals",
    description: "Webinar on building your professional network in the tech industry",
    url: "https://example.com/resources/networking-webinar",
    type: "webinar",
    tags: ["networking", "career-growth"],
    createdAt: "2024-03-05T00:00:00Z",
  },
  {
    id: "resource5",
    title: "Data Science Learning Path",
    description: "Curated list of resources for aspiring data scientists",
    url: "https://example.com/resources/data-science-path",
    type: "article",
    tags: ["data-science", "machine-learning", "learning-path"],
    createdAt: "2024-03-15T00:00:00Z",
  },
];

// Helper functions
export function getAdminById(id: string): Admin | undefined {
  return admins.find(admin => admin.id === id);
}

export function getMentorById(id: string): Mentor | undefined {
  return mentors.find(mentor => mentor.id === id);
}

export function getMenteeById(id: string): Mentee | undefined {
  return mentees.find(mentee => mentee.id === id);
}

export function getAllUsers(): User[] {
  return [...admins, ...mentors, ...mentees];
}

export function getUserById(id: string): User | undefined {
  return getAllUsers().find(user => user.id === id);
}

export function getPendingApplications(): User[] {
  return getAllUsers().filter(user => user.status === "pending");
}

export function getApprovedMentors(): Mentor[] {
  return mentors.filter(mentor => mentor.status === "approved");
}

export function getApprovedMentees(): Mentee[] {
  return mentees.filter(mentee => mentee.status === "approved");
}

export function getUnmatchedMentees(): Mentee[] {
  return getApprovedMentees().filter(mentee => !mentee.mentorId && !mentee.waitlisted);
}

export function getActiveMentorships(): Mentorship[] {
  return mentorships.filter(mentorship => mentorship.status === "active");
}

export function getMentorshipById(id: string): Mentorship | undefined {
  return mentorships.find(mentorship => mentorship.id === id);
}

export function getMentorshipByUsers(mentorId: string, menteeId: string): Mentorship | undefined {
  return mentorships.find(
    mentorship => mentorship.mentorId === mentorId && mentorship.menteeId === menteeId
  );
}

export function getActiveCohort(): Cohort | undefined {
  return cohorts.find(cohort => cohort.status === "active");
}

export function getResources(): Resource[] {
  return resources;
}