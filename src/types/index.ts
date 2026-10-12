export * from './auth';

export interface StudentProfile {
  id?: string;
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationYear: number;
    cgpa: number;
  };
  skills: Array<{
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    score?: number;
  }>;
  experience?: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  projects?: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  documents?: DocumentMetadata[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DocumentMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  url?: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time' | 'Contract';
  description: string;
  requiredSkills: string[];
  salaryRange?: string;
  deadline: string;
  recruiterId: string;
  createdAt: string;
  status: 'open' | 'closed' | 'filled';
  matchScore?: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'opportunity' | 'status';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}
