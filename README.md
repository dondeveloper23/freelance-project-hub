Freelance Project Hub A full-stack SaaS application for freelancers to manage projects, clients, and notes — all in one place.

🚀 Live Demo: https://freelance-project-hub-rms3.vercel.app/login

Features

Authentication — Secure sign up / login with Supabase Auth, protected routes via Next.js middleware Client Management — Add, view, and delete clients Project Management — Create projects linked to clients, with an auto-generated task pipeline (15 tasks across Figma, Webflow, and SEO phases) Task Progress Tracking — Step-by-step task completion with a visual progress bar per project Notes — Create notes linked to clients or projects Responsive UI — Mobile-friendly layout with hamburger navigation

Tech Stack LayerTechnologyFrameworkNext.js 14 (App Router)LanguageTypeScriptStylingTailwind CSSBackend & DatabaseSupabase (PostgreSQL)AuthenticationSupabase AuthState ManagementZustandSecurityRow Level Security (RLS) on all tables

Architecture src/ ├── app/ # Next.js App Router pages │ ├── login/ │ ├── register/ │ ├── projects/[id]/ │ ├── clients/ │ └── notes/ ├── components/ # Reusable UI components ├── hooks/ # Custom hooks (useClients, useProjects, useTasks, useNotes) ├── store/ # Zustand stores (ui, clients, projects, notes, tasks) └── lib/ └── supabase/ # Supabase client, server, and middleware config

Database Schema

profiles — Linked to Supabase auth users, stores username clients — Belongs to a user, stores client name projects — Belongs to a user and a client tasks — Belongs to a project, auto-generated on project creation (15 tasks) notes — Belongs to a user, optionally linked to a client or project

All tables have Row Level Security (RLS) enabled — users can only access their own data.

Getting Started Prerequisites

Node.js 18+ A Supabase project

Installation bashgit clone https://github.com/dondeveloper23/freelance-project-hub.git cd freelance-project-hub npm install Environment Variables Create a .env.local file in the root: envNEXT_PUBLIC_SUPABASE_URL=your_supabase_url NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key Run Locally bashnpm run dev Open http://localhost:3000

Roadmap

TanStack Query integration Project image upload (Supabase Storage) Deploy on Vercel

Author Built by Don — open to frontend / fullstack roles.
