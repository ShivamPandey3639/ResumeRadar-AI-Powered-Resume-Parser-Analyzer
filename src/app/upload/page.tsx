'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ResumeUploader } from '@/components/upload/ResumeUploader';
import { extractTextFromDocument } from '@/lib/parsers/document-parser';
import { parseResumeWithAI } from '@/lib/ai/resume-parser';
import { mockResumeData } from '@/lib/ai/mock-data';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function UploadPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [processingInfo, setProcessingInfo] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);
      setSuccess(false);
      setProcessingInfo(null);
      setUploadProgress(10);

      // Step 1: Extract text from document
      setProcessingInfo("Extracting text from document...");
      const resumeText = await extractTextFromDocument(file);
      setUploadProgress(30);

      // Step 2: Parse resume with AI
      setProcessingInfo("Analyzing resume with AI (this may take a minute)...");
      const resumeData = await parseResumeWithAI(resumeText);
      setUploadProgress(70);
      
      // Check if we got mock data due to API failure
      if (resumeData === mockResumeData) {
        setProcessingInfo("Using sample data due to API limitations. Your actual resume data will be displayed as a preview.");
      } else {
        setProcessingInfo("Resume successfully analyzed!");
      }

      // For development, we'll just simulate a successful upload
      setUploadProgress(100);
      setSuccess(true);
      setResumeId('mock-resume-id');
      toast.success('Resume uploaded and processed successfully!');
      
      // Store the resume data in localStorage for the dashboard to use
      localStorage.setItem('mockResumeData', JSON.stringify(resumeData));
      
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload');
      toast.error('Upload failed', {
        description: err.message || 'An error occurred during upload'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Upload Your Resume</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        Upload your resume to get started. Our AI will analyze your resume and extract key information
        to help you find the best job matches and provide personalized improvement suggestions.
      </p>
      
      <Alert className="max-w-2xl mx-auto mb-6 bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-700">Using Hugging Face API</AlertTitle>
        <AlertDescription className="text-blue-600">
          This application uses the Hugging Face API to analyze your resume. The API has rate limits and may occasionally fail.
          If that happens, we'll use sample data to demonstrate the functionality.
        </AlertDescription>
      </Alert>
      
      {success && resumeId ? (
        <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Resume Processed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your resume has been analyzed and is ready to view. Check out your dashboard to see the results.
          </p>
          {processingInfo && (
            <Alert className="mb-4 bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-600">{processingInfo}</AlertDescription>
            </Alert>
          )}
          <Link href="/dashboard" passHref>
            <Button className="gap-2">
              View Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <ResumeUploader
          onUpload={handleUpload}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          error={error}
          success={success}
        />
      )}
      
      {!success && (
        <div className="mt-10 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">What happens after upload?</h2>
          <ol className="space-y-3 list-decimal pl-5">
            <li>
              <strong>AI Analysis:</strong> Our system extracts key information from your resume including skills, 
              experience, education, and projects.
            </li>
            <li>
              <strong>Skills Classification:</strong> We categorize your skills into technical, soft, and domain-specific 
              categories to better match you with relevant positions.
            </li>
            <li>
              <strong>Job Matching:</strong> Your profile is compared against job postings to find the best matches 
              based on your qualifications.
            </li>
            <li>
              <strong>Personalized Suggestions:</strong> Receive tailored recommendations to improve your resume 
              and increase your chances of landing your dream job.
            </li>
          </ol>
        </div>
      )}
      
      <Toaster />
    </main>
  );
} 