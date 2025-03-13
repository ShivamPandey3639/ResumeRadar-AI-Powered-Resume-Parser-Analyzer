import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { JobPosting, MatchResult } from '@/lib/supabase/client';
import { Briefcase, MapPin, Building, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface MatchResultsProps {
  matches: {
    job: JobPosting;
    match: MatchResult;
  }[];
}

export function MatchResults({ matches }: MatchResultsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Job Matches ({matches.length})
        </h2>
        <Button variant="outline">Browse All Jobs</Button>
      </div>
      
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map(({ job, match }) => (
            <Card key={match.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2" style={{ width: `${match.match_score}%` }} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <Badge variant={match.match_score >= 80 ? 'default' : 'secondary'}>
                    {match.match_score}% Match
                  </Badge>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Building className="h-3.5 w-3.5" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm line-clamp-2 mb-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {job.requirements.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Skills Match</span>
                        <span>{Math.round((match.skill_match.matched.length / (match.skill_match.matched.length + match.skill_match.missing.length)) * 100)}%</span>
                      </div>
                      <Progress value={match.skill_match.matched.length / (match.skill_match.matched.length + match.skill_match.missing.length) * 100} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Experience Match</span>
                        <span>{match.experience_match}%</span>
                      </div>
                      <Progress value={match.experience_match} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Education Match</span>
                        <span>{match.education_match}%</span>
                      </div>
                      <Progress value={match.education_match} className="h-1.5" />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex gap-2 mb-2">
                      <h4 className="text-xs font-medium">Skills Analysis:</h4>
                      <div className="flex gap-1.5">
                        <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {match.skill_match.matched.length}
                        </Badge>
                        <Badge variant="outline" className="bg-red-50 text-red-700 text-xs">
                          <XCircle className="h-3 w-3 mr-1" />
                          {match.skill_match.missing.length}
                        </Badge>
                      </div>
                    </div>
                    
                    {match.improvement_suggestions.length > 0 && (
                      <div className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5" />
                        <span>{match.improvement_suggestions[0]}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full" size="sm">View Job Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">
              No job matches found. We'll notify you when new matches are available.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 