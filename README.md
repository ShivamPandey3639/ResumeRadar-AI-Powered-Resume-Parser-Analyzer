# Resume Parser & Analyzer

A modern web application that extracts structured data from resumes, provides insights, and helps users improve their job applications.



## Features

- **Resume Parsing**: Upload PDF resumes and extract structured data including contact information, skills, work experience, education, and more.
- **Data Visualization**: View your resume data in a structured, easy-to-understand format.
- **Job Matching**: Compare your resume against job descriptions to identify matches and gaps.
- **Improvement Suggestions**: Get AI-powered suggestions to improve your resume for specific job applications.
- **User Authentication**: Secure user accounts with email/password authentication.
- **Dashboard**: Track your uploaded resumes and job matches.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **AI/ML**: Hugging Face models for resume parsing and analysis

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works for development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/resume-parser.git
   cd resume-parser
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Hugging Face API Configuration (if using)
   NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_huggingface_api_key
   HUGGINGFACE_API_KEY=your_huggingface_api_key

   # Environment
   NODE_ENV=development
   ```

4. Set up the Supabase database:

   - Create a new project in Supabase
   - Run the schema.sql file in the Supabase SQL editor to create the necessary tables

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Setup

The application uses Supabase as its database. To set up the database:

1. Create a new project in Supabase
2. Go to the SQL Editor in your Supabase dashboard
3. Copy the contents of `schema.sql` from the project
4. Paste and run the SQL in the Supabase SQL Editor

## Authentication

The application uses Supabase Authentication for user management. By default, email confirmation is required for new signups. To change this behavior:

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers > Email
3. Uncheck "Enable email confirmations" if you don't want to require email verification

## Deployment

### Deploy to Vercel

The easiest way to deploy the application is using Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set the environment variables in the Vercel dashboard
4. Deploy

### Other Deployment Options

You can also deploy the application to any platform that supports Next.js applications, such as:

- Netlify
- AWS Amplify
- Self-hosted servers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Hugging Face](https://huggingface.co/)
