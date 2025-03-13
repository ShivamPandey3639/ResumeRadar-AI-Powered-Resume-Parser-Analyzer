import { createClient } from "@supabase/supabase-js";

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Check if we're using example/placeholder credentials
const isUsingExampleCredentials =
  supabaseUrl.includes("example.supabase.co") ||
  supabaseAnonKey.includes("mock-key-for-development");

// Force use of real Supabase client unless we're using example credentials
const useMockClient = isUsingExampleCredentials;

console.log("Supabase URL:", supabaseUrl);
console.log("Using mock client:", useMockClient);

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Store mock data in memory for development
const mockStorage = {
  resumes: [] as Resume[],
};

// Mock functions for development when Supabase is not available
export const mockSupabase = {
  auth: {
    getSession: async () => ({
      data: { session: null },
      error: null,
    }),
    getUser: async () => ({
      data: {
        user: {
          id: "mock-user-id",
          email: "user@example.com",
        },
      },
      error: null,
    }),
    signInWithPassword: async ({
      email,
    }: {
      email: string;
      password: string;
    }) => ({
      data: {
        user: {
          id: "mock-user-id",
          email: email,
        },
        session: {
          user: {
            id: "mock-user-id",
            email: email,
          },
        },
      },
      error: null,
    }),
    signUp: async ({ email }: { email: string; password: string }) => ({
      data: {
        user: {
          id: "mock-user-id",
          email: email,
        },
        session: null,
      },
      error: null,
    }),
    signOut: async () => ({
      error: null,
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onAuthStateChange: (
      callback: (event: string, session: Record<string, unknown>) => void
    ) => {
      // Return a mock subscription
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      };
    },
  },
  storage: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    from: (bucket: string) => ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      upload: async (path: string, file: File) => ({
        data: { path },
        error: null,
      }),
      // Add other storage methods as needed
      download: async () => ({
        data: new Blob(),
        error: null,
      }),
      getPublicUrl: (path: string) => ({
        data: { publicUrl: `https://example.com/${path}` },
        error: null,
      }),
    }),
  },
  from: (table: string) => {
    if (table === "resumes") {
      return {
        insert: (data: Record<string, unknown>) => ({
          select: () => ({
            single: async () => {
              const newResume: Resume = {
                id: `mock-resume-${Date.now()}`,
                user_id: "mock-user-id",
                filename: data.filename as string,
                file_path: data.file_path as string,
                file_type: data.file_type as string,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                parsed_data: data.parsed_data as ResumeData | null,
                status: ((data.status as string) || "completed") as
                  | "pending"
                  | "processing"
                  | "completed"
                  | "failed",
              };

              // Add to mock storage
              mockStorage.resumes.push(newResume);

              return {
                data: newResume,
                error: null,
              };
            },
          }),
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        select: (columns: string = "*") => ({
          eq: (column: string, value: unknown) => ({
            order: (
              orderColumn: string,
              { ascending }: { ascending: boolean }
            ) => {
              // Filter resumes by user_id
              const filteredResumes = mockStorage.resumes.filter(
                (r) => r.user_id === value
              );

              // Sort by created_at
              const sortedResumes = [...filteredResumes].sort((a, b) => {
                const dateA = new Date(a.created_at).getTime();
                const dateB = new Date(b.created_at).getTime();
                return ascending ? dateA - dateB : dateB - dateA;
              });

              return {
                data: sortedResumes,
                error: null,
              };
            },
          }),
        }),
      };
    }

    if (table === "match_results") {
      return {
        select: () => ({
          eq: () => ({
            order: () => ({
              data: [],
              error: null,
            }),
          }),
        }),
      };
    }

    return {
      insert: (data: any) => ({
        select: () => ({
          single: async () => ({
            data: { id: `mock-id-${Date.now()}`, ...data },
            error: null,
          }),
        }),
      }),
      select: () => ({
        eq: () => ({
          order: () => ({
            data: [],
            error: null,
          }),
        }),
      }),
    };
  },
};

// Use mock or real Supabase based on environment and credentials
export const supabaseClient = useMockClient ? mockSupabase : supabase;

// Database types
export type Resume = {
  id: string;
  user_id: string;
  filename: string;
  file_path: string;
  file_type: string;
  created_at: string;
  updated_at: string;
  parsed_data: ResumeData | null;
  status: "pending" | "processing" | "completed" | "failed";
  error_message?: string;
};

export type ResumeData = {
  contact_info: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
  };
  skills: {
    technical: string[];
    soft: string[];
    domain: string[];
  };
  work_experience: {
    company: string;
    position: string;
    start_date: string;
    end_date?: string;
    current?: boolean;
    description: string;
    responsibilities: string[];
    achievements: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date?: string;
    current?: boolean;
    gpa?: string;
    achievements: string[];
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    start_date?: string;
    end_date?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    expires?: string;
    url?: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
};

export type JobPosting = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  preferred_qualifications: string[];
  experience_level: string;
  industry: string;
  role_category: string;
  salary_range?: string;
  created_at: string;
  updated_at: string;
  parsed_data: JobPostingData | null;
};

export type JobPostingData = {
  required_skills: string[];
  preferred_skills: string[];
  experience_years: number;
  education_requirements: string[];
  domain_expertise: string[];
};

export type MatchResult = {
  id: string;
  resume_id: string;
  job_posting_id: string;
  match_score: number;
  skill_match: {
    matched: string[];
    missing: string[];
  };
  experience_match: number;
  domain_match: number;
  education_match: number;
  created_at: string;
  improvement_suggestions: string[];
};

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  target_positions?: string[];
  target_industries?: string[];
  preferences?: {
    email_notifications: boolean;
    job_alerts: boolean;
  };
};
