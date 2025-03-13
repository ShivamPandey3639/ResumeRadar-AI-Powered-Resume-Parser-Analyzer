'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { MatchResults } from '@/components/dashboard/MatchResults';
import { SkillsVisualization } from '@/components/dashboard/SkillsVisualization';
import { Resume, JobPosting, MatchResult, ResumeData } from '@/lib/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Upload, FileText, BarChart3, Briefcase, PlusCircle } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { mockResumeData } from '@/lib/ai/mock-data';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  
  useEffect(() => {
    // Load mock resume data from localStorage or use the default mock data
    const fetchResumeData = () => {
      try {
        setLoading(true);
        
        // Try to get resume data from localStorage
        const storedData = localStorage.getItem('mockResumeData');
        if (storedData) {
          setResumeData(JSON.parse(storedData));
        } else {
          // Use default mock data if nothing in localStorage
          setResumeData(mockResumeData);
        }
      } catch (error: any) {
        toast.error('Error loading resume data', {
          description: error.message
        });
        // Fall back to mock data
        setResumeData(mockResumeData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResumeData();
  }, []);
  
  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto py-10 space-y-8">
        <Skeleton className="h-12 w-64 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Skeleton className="h-[500px] w-full" />
          </div>
          <div className="md:col-span-3">
            <Skeleton className="h-[500px] w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  // Render empty state if no resume data
  if (!resumeData) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Your Dashboard</CardTitle>
            <CardDescription>
              You haven't uploaded any resumes yet. Get started by uploading your first resume.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-6">
            <FileText size={64} className="text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Upload your resume to get personalized job matches and improvement suggestions.
            </p>
            <Button onClick={() => router.push('/upload')} size="lg">
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Mock job matches data
  const mockJobMatches = [
    {
      job: {
        id: 'job-1',
        title: 'Senior Frontend Developer',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA (Remote)',
        description: 'We are looking for a skilled frontend developer with React experience...',
        requirements: ['5+ years of experience with React', 'TypeScript proficiency', 'Experience with state management'],
        preferred_qualifications: ['Next.js experience', 'GraphQL knowledge'],
        experience_level: 'Senior',
        industry: 'Technology',
        role_category: 'Engineering',
        salary_range: '$120,000 - $150,000',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        parsed_data: null
      },
      match: {
        id: 'match-1',
        resume_id: 'mock-resume-id',
        job_posting_id: 'job-1',
        match_score: 85,
        skill_match: {
          matched: ['React', 'TypeScript', 'JavaScript', 'CSS'],
          missing: ['GraphQL']
        },
        experience_match: 90,
        domain_match: 95,
        education_match: 80,
        created_at: new Date().toISOString(),
        improvement_suggestions: [
          'Add GraphQL to your skill set',
          'Highlight more Next.js projects'
        ]
      }
    },
    {
      job: {
        id: 'job-2',
        title: 'Full Stack Developer',
        company: 'Digital Solutions LLC',
        location: 'New York, NY',
        description: 'Looking for a full stack developer with experience in React and Node.js...',
        requirements: ['3+ years of experience with React', 'Node.js experience', 'Database knowledge'],
        preferred_qualifications: ['AWS experience', 'Docker knowledge'],
        experience_level: 'Mid-level',
        industry: 'Technology',
        role_category: 'Engineering',
        salary_range: '$90,000 - $120,000',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        parsed_data: null
      },
      match: {
        id: 'match-2',
        resume_id: 'mock-resume-id',
        job_posting_id: 'job-2',
        match_score: 75,
        skill_match: {
          matched: ['React', 'JavaScript', 'Node.js'],
          missing: ['AWS', 'Docker']
        },
        experience_match: 80,
        domain_match: 70,
        education_match: 85,
        created_at: new Date().toISOString(),
        improvement_suggestions: [
          'Add cloud experience to your resume',
          'Highlight database projects'
        ]
      }
    }
  ];
  
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar with resume info */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Resume</span>
                <Button variant="ghost" size="icon" onClick={() => router.push('/upload')}>
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">
                      {resumeData.contact_info.name || 'Your Resume'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-3">
          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="resume" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resume
              </TabsTrigger>
              <TabsTrigger value="matches" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job Matches
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Skills Analysis
              </TabsTrigger>
            </TabsList>
            
            {/* Resume Preview Tab */}
            <TabsContent value="resume">
              <ResumePreview resumeData={resumeData} />
            </TabsContent>
            
            {/* Job Matches Tab */}
            <TabsContent value="matches">
              <MatchResults matches={mockJobMatches} />
            </TabsContent>
            
            {/* Skills Analysis Tab */}
            <TabsContent value="analysis">
              <SkillsVisualization skills={resumeData.skills} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Toaster />
    </main>
  );
} 