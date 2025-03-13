-- Create storage buckets for resume files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resume-files', 'resume-files', false);

-- Enable RLS (Row Level Security) on the bucket
UPDATE storage.buckets SET public = false WHERE id = 'resume-files';

-- Create storage policy to allow authenticated users to upload their own files
CREATE POLICY "Allow users to upload their own resumes" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'resume-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Create storage policy to allow users to read their own files
CREATE POLICY "Allow users to read their own resumes" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'resume-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Create storage policy to allow users to update their own files
CREATE POLICY "Allow users to update their own resumes" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'resume-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Create storage policy to allow users to delete their own files
CREATE POLICY "Allow users to delete their own resumes" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'resume-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Create user profiles table
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  target_positions TEXT[],
  target_industries TEXT[],
  preferences JSONB DEFAULT '{"email_notifications": true, "job_alerts": true}'::JSONB
);

-- Enable RLS on user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Allow users to read their own profile" ON public.user_profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Create policy to allow users to update their own profile
CREATE POLICY "Allow users to update their own profile" ON public.user_profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- Create resumes table
CREATE TABLE public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  parsed_data JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT
);

-- Enable RLS on resumes
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own resumes
CREATE POLICY "Allow users to read their own resumes" ON public.resumes
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Create policy to allow users to insert their own resumes
CREATE POLICY "Allow users to insert their own resumes" ON public.resumes
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create policy to allow users to update their own resumes
CREATE POLICY "Allow users to update their own resumes" ON public.resumes
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Create policy to allow users to delete their own resumes
CREATE POLICY "Allow users to delete their own resumes" ON public.resumes
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Create job_postings table
CREATE TABLE public.job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  preferred_qualifications TEXT[],
  experience_level TEXT NOT NULL,
  industry TEXT NOT NULL,
  role_category TEXT NOT NULL,
  salary_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  parsed_data JSONB
);

-- Enable RLS on job_postings
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read job postings
CREATE POLICY "Allow authenticated users to read job postings" ON public.job_postings
  FOR SELECT TO authenticated
  USING (true);

-- Create match_results table
CREATE TABLE public.match_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES public.resumes(id) ON DELETE CASCADE,
  job_posting_id UUID NOT NULL REFERENCES public.job_postings(id) ON DELETE CASCADE,
  match_score INTEGER NOT NULL,
  skill_match JSONB NOT NULL,
  experience_match INTEGER NOT NULL,
  domain_match INTEGER NOT NULL,
  education_match INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  improvement_suggestions TEXT[]
);

-- Enable RLS on match_results
ALTER TABLE public.match_results ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own match results
CREATE POLICY "Allow users to read their own match results" ON public.match_results
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.resumes
    WHERE resumes.id = match_results.resume_id
    AND resumes.user_id = auth.uid()
  ));

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update the updated_at timestamp
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column(); 