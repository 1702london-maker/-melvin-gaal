-- ═══════════════════════════════════════════════════════════════
-- Melvin Gaal Ltd — Complete Supabase Schema
-- Run this in the Supabase SQL editor
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Users (auth.users extended profile) ─────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'crew' CHECK (role IN ('crew', 'employer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Crew Registrations (from public form) ───────────────────────
CREATE TABLE IF NOT EXISTS public.crew_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  nationality TEXT,
  rank TEXT,
  date_of_birth DATE,
  passport_number TEXT,
  seaman_book_number TEXT,
  coc_country TEXT,
  years_experience INTEGER,
  availability_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected', 'placed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Crew Members (full registered profiles) ─────────────────────
CREATE TABLE IF NOT EXISTS public.crew_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  registration_id UUID REFERENCES public.crew_registrations(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  nationality TEXT,
  rank TEXT NOT NULL,
  date_of_birth DATE,
  passport_number TEXT,
  seaman_book_number TEXT,
  coc_country TEXT,
  years_experience INTEGER DEFAULT 0,
  availability_date DATE,
  is_available BOOLEAN DEFAULT TRUE,
  profile_photo_url TEXT,
  cv_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'deployed', 'on_leave', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Employers ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.employers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  country TEXT,
  vessel_types TEXT[],
  fleet_size INTEGER,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Vacancies ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.vacancies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID REFERENCES public.employers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  rank TEXT NOT NULL,
  vessel_type TEXT,
  vessel_name TEXT,
  description TEXT,
  requirements TEXT[],
  rotation TEXT,
  salary_range TEXT,
  location TEXT,
  departure_port TEXT,
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('normal', 'priority', 'urgent')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'filled', 'closed', 'draft')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Applications ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crew_member_id UUID REFERENCES public.crew_members(id) ON DELETE CASCADE,
  vacancy_id UUID REFERENCES public.vacancies(id) ON DELETE CASCADE,
  cover_letter TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'shortlisted', 'interview', 'offered', 'accepted', 'rejected')),
  employer_notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(crew_member_id, vacancy_id)
);

-- ── Certificates ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crew_member_id UUID REFERENCES public.crew_members(id) ON DELETE CASCADE,
  certificate_type TEXT NOT NULL,
  certificate_number TEXT,
  issuing_authority TEXT,
  issue_date DATE,
  expiry_date DATE,
  document_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Documents ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crew_member_id UUID REFERENCES public.crew_members(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('cv', 'passport', 'seaman_book', 'stcw', 'medical', 'other')),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  verified BOOLEAN DEFAULT FALSE
);

-- ── Placements ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crew_member_id UUID REFERENCES public.crew_members(id) ON DELETE SET NULL,
  employer_id UUID REFERENCES public.employers(id) ON DELETE SET NULL,
  vacancy_id UUID REFERENCES public.vacancies(id) ON DELETE SET NULL,
  vessel_name TEXT,
  rank_placed TEXT,
  sign_on_date DATE,
  sign_off_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'terminated')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Contact Requests (from contact form) ────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vessel_name TEXT,
  imo_number TEXT,
  service_required TEXT,
  urgency TEXT DEFAULT 'routine',
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  assigned_to UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Notifications ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'application', 'certificate', 'vacancy')),
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_crew_members_rank ON public.crew_members(rank);
CREATE INDEX IF NOT EXISTS idx_crew_members_availability ON public.crew_members(is_available, availability_date);
CREATE INDEX IF NOT EXISTS idx_vacancies_status ON public.vacancies(status, urgency);
CREATE INDEX IF NOT EXISTS idx_applications_crew ON public.applications(crew_member_id);
CREATE INDEX IF NOT EXISTS idx_applications_vacancy ON public.applications(vacancy_id);
CREATE INDEX IF NOT EXISTS idx_certificates_expiry ON public.certificates(expiry_date, crew_member_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, read);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crew_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crew_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Public can insert registrations and contact requests
CREATE POLICY "Public can submit registrations" ON public.crew_registrations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public can submit contact requests" ON public.contact_requests FOR INSERT WITH CHECK (TRUE);

-- Authenticated users can read their own profile
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Crew members can read/update their own record
CREATE POLICY "Crew read own record" ON public.crew_members FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Crew update own record" ON public.crew_members FOR UPDATE USING (user_id = auth.uid());

-- Employers can manage their own data
CREATE POLICY "Employer read own" ON public.employers FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Employer update own" ON public.employers FOR UPDATE USING (user_id = auth.uid());

-- Anyone can view open vacancies
CREATE POLICY "Public view open vacancies" ON public.vacancies FOR SELECT USING (status = 'open');

-- Notifications — users see their own
CREATE POLICY "Users read own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- ═══════════════════════════════════════════════════════════════
-- UPDATED_AT TRIGGER
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.crew_members
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.vacancies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
