import { ResumeData } from '../supabase/client';

/**
 * Mock resume data to use when API calls fail
 */
export const mockResumeData: ResumeData = {
  contact_info: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.com"
  },
  skills: {
    technical: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "SQL", "Git"],
    soft: ["Communication", "Leadership", "Problem Solving", "Teamwork", "Time Management"],
    domain: ["Web Development", "UI/UX Design", "Data Analysis", "Project Management"]
  },
  work_experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Frontend Developer",
      start_date: "2020-01",
      end_date: undefined,
      current: true,
      description: "Leading frontend development for enterprise applications",
      responsibilities: [
        "Develop and maintain frontend applications using React and TypeScript",
        "Collaborate with UX designers to implement responsive designs",
        "Mentor junior developers and conduct code reviews"
      ],
      achievements: [
        "Reduced page load time by 40% through code optimization",
        "Implemented CI/CD pipeline that reduced deployment time by 60%",
        "Led the migration from Angular to React, improving developer productivity"
      ]
    },
    {
      company: "Digital Innovations LLC",
      position: "Frontend Developer",
      start_date: "2017-03",
      end_date: "2019-12",
      current: false,
      description: "Worked on various web applications for clients",
      responsibilities: [
        "Developed responsive web applications using React",
        "Implemented RESTful API integrations",
        "Participated in agile development processes"
      ],
      achievements: [
        "Delivered 15+ projects on time and within budget",
        "Received client satisfaction rating of 4.8/5",
        "Implemented automated testing that caught 95% of bugs before production"
      ]
    }
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field_of_study: "Computer Science",
      start_date: "2013-09",
      end_date: "2017-05",
      current: false,
      gpa: "3.8",
      achievements: [
        "Dean's List: 2014-2017",
        "Senior Thesis: 'Optimizing React Performance in Large Applications'",
        "Teaching Assistant for Introduction to Programming"
      ]
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "A full-stack e-commerce platform with payment processing and inventory management",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      url: "https://github.com/johndoe/ecommerce-platform",
      start_date: "2019-06",
      end_date: "2019-12"
    },
    {
      name: "Task Management App",
      description: "A productivity app for managing tasks and projects with team collaboration features",
      technologies: ["React Native", "Firebase", "Redux"],
      url: "https://github.com/johndoe/task-manager",
      start_date: "2018-03",
      end_date: "2018-08"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2021-05",
      expires: "2024-05",
      url: "https://www.youracclaim.com/badges/aws-certified-developer"
    },
    {
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2020-02",
      expires: undefined,
      url: "https://www.scrum.org/certificates/psm-i"
    }
  ],
  languages: [
    {
      language: "English",
      proficiency: "Native"
    },
    {
      language: "Spanish",
      proficiency: "Intermediate"
    },
    {
      language: "French",
      proficiency: "Basic"
    }
  ]
}; 