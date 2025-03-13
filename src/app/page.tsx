import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, BarChart3, Briefcase, CheckCircle, Upload, Zap, Brain, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20 rounded-full">
            AI-Powered Resume Analysis
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Optimize Your Resume with <span className="text-primary">AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Upload your resume and let our AI analyze it, match it with job postings, and provide personalized improvement suggestions to boost your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/upload">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform offers a comprehensive set of tools to help you land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Resume Parsing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our AI extracts and organizes key information from your resume including skills, experience, education, and projects.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Skills Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Automatically categorize your skills into technical, soft, and domain-specific groups with proficiency assessment.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Job Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Match your resume against job postings to find the best opportunities based on your qualifications and experience.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personalized Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive tailored recommendations to improve your resume and increase your chances of landing interviews.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to optimize your resume and find the perfect job match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your Resume</h3>
              <p className="text-muted-foreground">
                Simply upload your resume in PDF, DOCX, or TXT format. Our system supports multiple file types.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your resume, extracts key information, and matches it with job requirements.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Insights</h3>
              <p className="text-muted-foreground">
                View your match scores, skill analysis, and personalized suggestions to improve your resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique advantages to help you stand out in the job market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Benefit 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Advanced AI Technology</h3>
                <p className="text-muted-foreground">
                  Powered by state-of-the-art natural language processing models from Hugging Face to provide accurate analysis.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
                <p className="text-muted-foreground">
                  Get tailored suggestions specific to your skills, experience, and target jobs.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data Security</h3>
                <p className="text-muted-foreground">
                  Your data is encrypted and securely stored. We prioritize your privacy and security.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Dashboard</h3>
                <p className="text-muted-foreground">
                  Visualize your skills, track your progress, and manage your job applications in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Resume?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of job seekers who have improved their resumes and found better job matches with our AI-powered platform.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/upload">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
