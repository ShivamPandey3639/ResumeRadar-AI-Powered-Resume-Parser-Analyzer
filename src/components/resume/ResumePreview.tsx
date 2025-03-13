import { ResumeData } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, Mail, Phone, MapPin, Linkedin, Globe, 
  Briefcase, GraduationCap, FolderKanban, Award, Languages 
} from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {resumeData.contact_info.name || 'Your Name'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.contact_info.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{resumeData.contact_info.email}</span>
              </div>
            )}
            
            {resumeData.contact_info.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{resumeData.contact_info.phone}</span>
              </div>
            )}
            
            {resumeData.contact_info.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{resumeData.contact_info.location}</span>
              </div>
            )}
            
            {resumeData.contact_info.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={resumeData.contact_info.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>
            )}
            
            {resumeData.contact_info.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={resumeData.contact_info.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Personal Website
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resumeData.skills.technical.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.technical.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {resumeData.skills.soft.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.soft.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {resumeData.skills.domain.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Domain Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.domain.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Work Experience */}
      {resumeData.work_experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resumeData.work_experience.map((job, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{job.position}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {job.start_date} - {job.current ? 'Present' : job.end_date}
                    </div>
                  </div>
                  
                  {job.description && (
                    <p className="mb-2 text-sm">{job.description}</p>
                  )}
                  
                  {job.responsibilities.length > 0 && (
                    <div className="mb-2">
                      <h4 className="text-sm font-medium mb-1">Responsibilities:</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {job.responsibilities.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {job.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Achievements:</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {job.achievements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Education */}
      {resumeData.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{edu.degree} in {edu.field_of_study}</h3>
                      <p className="text-muted-foreground">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                    </div>
                  </div>
                  
                  {edu.gpa && (
                    <p className="mb-2 text-sm">GPA: {edu.gpa}</p>
                  )}
                  
                  {edu.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Achievements:</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {edu.achievements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5" />
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Project Link
                        </a>
                      )}
                    </div>
                    {(project.start_date || project.end_date) && (
                      <div className="text-sm text-muted-foreground">
                        {project.start_date && project.end_date ? 
                          `${project.start_date} - ${project.end_date}` : 
                          project.start_date || project.end_date}
                      </div>
                    )}
                  </div>
                  
                  {project.description && (
                    <p className="mb-2 text-sm">{project.description}</p>
                  )}
                  
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Languages */}
      {resumeData.languages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.languages.map((lang, index) => (
                <div key={index} className="flex justify-between">
                  <span>{lang.language}</span>
                  <span className="text-muted-foreground">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 