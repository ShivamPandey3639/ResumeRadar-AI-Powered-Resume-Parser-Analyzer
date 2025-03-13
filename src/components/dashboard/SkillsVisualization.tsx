import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Lightbulb, Briefcase } from 'lucide-react';

interface SkillsVisualizationProps {
  skills: {
    technical: string[];
    soft: string[];
    domain: string[];
  };
}

export function SkillsVisualization({ skills }: SkillsVisualizationProps) {
  // Calculate skill distribution
  const totalSkills = skills.technical.length + skills.soft.length + skills.domain.length;
  const technicalPercentage = totalSkills ? Math.round((skills.technical.length / totalSkills) * 100) : 0;
  const softPercentage = totalSkills ? Math.round((skills.soft.length / totalSkills) * 100) : 0;
  const domainPercentage = totalSkills ? Math.round((skills.domain.length / totalSkills) * 100) : 0;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skills Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Technical Skills</span>
                </div>
                <span className="text-sm text-muted-foreground">{technicalPercentage}%</span>
              </div>
              <Progress value={technicalPercentage} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Soft Skills</span>
                </div>
                <span className="text-sm text-muted-foreground">{softPercentage}%</span>
              </div>
              <Progress value={softPercentage} className="h-2 bg-green-100" indicatorClassName="bg-green-500" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Domain Expertise</span>
                </div>
                <span className="text-sm text-muted-foreground">{domainPercentage}%</span>
              </div>
              <Progress value={domainPercentage} className="h-2 bg-purple-100" indicatorClassName="bg-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Technical Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-5 w-5 text-blue-500" />
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.technical.length > 0 ? (
                skills.technical.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No technical skills found</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Soft Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-5 w-5 text-green-500" />
              Soft Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.soft.length > 0 ? (
                skills.soft.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No soft skills found</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Domain Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="h-5 w-5 text-purple-500" />
              Domain Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.domain.length > 0 ? (
                skills.domain.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No domain expertise found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Skills Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Strengths</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Strong technical foundation with {skills.technical.length} technical skills</li>
                <li>Good balance between technical and soft skills</li>
                {skills.domain.length > 0 && (
                  <li>Domain expertise in specific areas enhances your profile</li>
                )}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Improvement Suggestions</h3>
              <ul className="list-disc pl-5 space-y-1">
                {skills.soft.length < 3 && (
                  <li>Consider adding more soft skills to your resume</li>
                )}
                {skills.domain.length < 3 && (
                  <li>Highlight more domain-specific expertise to stand out</li>
                )}
                <li>Ensure your skills align with your target job positions</li>
                <li>Consider adding skill levels or years of experience for key skills</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 