# Melvin Gaal Ltd — Deployment Guide

## Project Location
`C:\Users\MARTINS JOHNSON\Downloads\melvin-gaal-app`

## Stack
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (production build, no CDN)
- **Database**: Supabase
- **Email**: Resend
- **Fonts**: Hanken Grotesk · Inter · JetBrains Mono (Google Fonts via next/font)
- **Dev Port**: 3400

---

## Pages
| Route | File | Status |
|-------|------|--------|
| `/` | `app/(site)/page.tsx` | ✅ Homepage |
| `/recruitment` | `app/(site)/recruitment/page.tsx` | ✅ Crew Portal |
| `/services` | `app/(site)/services/page.tsx` | ✅ Services |
| `/contact` | `app/(site)/contact/page.tsx` | ✅ Contact |
| `/api/register` | `app/api/register/route.ts` | ✅ POST |
| `/api/contact` | `app/api/contact/route.ts` | ✅ POST |

---

## Step 1 — Supabase Setup

1. Go to https://supabase.com/dashboard/org/btuobgepvrygkzgkyjmr
2. Create a new project: `melvin-gaal`
3. Open **SQL Editor** and run `supabase-schema.sql` (entire file)
4. Copy your keys from **Project Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2 — Resend Setup

1. Go to https://resend.com → API Keys → Create key
2. Verify your domain `melvingaal.com` under Domains
3. Copy key → `RESEND_API_KEY`

---

## Step 3 — Environment Variables

Update `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
RESEND_API_KEY=re_xxxx
NEXT_PUBLIC_SITE_URL=https://melvingaal.com
```

---

## Step 4 — GitHub

```bash
cd "C:\Users\MARTINS JOHNSON\Downloads\melvin-gaal-app"
git remote add origin https://github.com/1702london-maker/melvin-gaal
git push -u origin main
```

---

## Step 5 — Vercel Deployment

1. Go to https://vercel.com/budruum-s-projects
2. Click **Add New → Project**
3. Import from GitHub: `melvin-gaal`
4. Framework: **Next.js** (auto-detected)
5. Add all environment variables from Step 3
6. Click **Deploy**

---

## Next Phases (Ready to Build)

### Phase 3 — Full Crew Registration
- Add all 10 fields (DOB, Passport No, Seaman Book, etc.)
- Real file upload to Supabase Storage
- Supabase Auth signup flow

### Phase 4 — Employer Portal (`/employer`)
- Company registration
- Job posting form
- Candidate search
- Application management dashboard

### Phase 5 — Admin Dashboard (`/admin`)
- Crew management table
- Certificate expiry monitor
- Placement tracking
- Analytics

### Phase 7 — Auth
- Supabase Auth for all three roles
- Protected routes via middleware

---

## Environment Variables Reference

| Variable | Source | Required |
|----------|--------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | For DB features |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | For DB features |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | Server-side only |
| `RESEND_API_KEY` | resend.com → API Keys | For emails |
| `NEXT_PUBLIC_SITE_URL` | Your domain | For links in emails |
