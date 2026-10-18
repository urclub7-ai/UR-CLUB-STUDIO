# Nazif Yosufi — Professional Graphic Designer Portfolio & Admin Management System

A production-ready, full-stack personal portfolio and content management system built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, PostgreSQL with Prisma ORM, and Supabase Storage.

---

## 🌟 Architectural Features

### 🎨 Public Portfolio Website
- **Home (`/`)**: Hero banner with live availability indicator, selected case studies, about summary, capabilities & proficiency sliders, verified credentials, experience timeline, service packages, client endorsements, and inquiry CTA.
- **About (`/about`)**: Editorial design philosophy, detailed biography, profile photography, downloadable CV, and categorized skills matrix.
- **Portfolio (`/portfolio`)**: Category filtering (Branding, Packaging, Poster, Typography, Editorial, UI/UX, Other) with fluid Framer Motion animations.
- **Project Case Studies (`/portfolio/[slug]`)**: Deep-dive project pages with metadata (client, year, tools, services provided), high-resolution multi-image gallery with full-screen lightbox, external links (Behance, live URL), and sequential case study navigation.
- **Certificates (`/certificates`)**: Verified credential badges, interactive certificate inspection modal, PDF download and third-party credential validation links.
- **Experience (`/experience`)**: Interactive career timeline featuring leadership roles, studio collaborations, key responsibilities, and toolsets.
- **Services (`/services`)**: Creative design packages with starting rates, turnaround times, and scope checklists.
- **Contact (`/contact`)**: Backend-connected contact form that saves inquiries directly into the PostgreSQL database.
- **SEO & Performance**: Dynamic metadata, OpenGraph cards, Twitter cards, automated `sitemap.xml`, and `robots.txt`.

### ⚡ Secure Admin Dashboard (`/admin`)
- **Dashboard (`/admin/dashboard`)**: Live analytics, metric counters, unread message notifications, and recent inquiries inbox.
- **Home Manager (`/admin/home`)**: Edit hero copy, availability status, CTA buttons, metrics, and showcase art.
- **About & Skills Manager (`/admin/about`)**: Full bio, profile portrait, and interactive skills CRUD with proficiency sliders.
- **Portfolio Manager (`/admin/projects`)**: Create, edit, delete, publish/unpublish, feature, and reorder case studies with multi-image gallery support.
- **Certificates Manager (`/admin/certificates`)**: Certificate CRUD with image/PDF uploads and credential validation URLs.
- **Experience Manager (`/admin/experience`)**: Timeline career milestone CRUD.
- **Services Manager (`/admin/services`)**: Manage service packages, pricing, and deliverables.
- **Messages Inbox (`/admin/messages`)**: Real-time incoming lead inspector with status tracking (`NEW`, `READ`, `REPLIED`, `ARCHIVED`), deletion, and one-click email composer.
- **Site Settings & Security (`/admin/settings`)**: Site metadata, SEO keywords, social links CRUD, and admin password management.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Editorial modern aesthetic, dark theme)
- **Animations**: Framer Motion
- **Database & ORM**: PostgreSQL / Supabase with Prisma ORM
- **Media & File Storage**: Supabase Storage (`portfolio`, `certificates`, `profile`, `experience`, `site` buckets)
- **Security & Validation**: Jose (JWT Sessions), Bcrypt.js, Zod
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your Supabase and PostgreSQL connection parameters:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

ADMIN_JWT_SECRET="your-secure-random-jwt-secret-key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> **Note**: For instant zero-setup local development, the default `.env` is configured to use a local SQLite database file `prisma/dev.db`.

### 3. Database Initialization & Seeding

Sync database schema:
```bash
npm run db:push
```

Seed realistic graphic design case studies, certificates, experiences, and default admin account:
```bash
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

The website will be available at [http://localhost:3000](http://localhost:3000).

---

## 🔐 Default Admin Credentials

- **Admin Login URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: `admin@portfolio.com`
- **Password**: `Admin@2026!`

*(You can update this password at any time in `/admin/settings`)*

---

## 🗄 Supabase Storage Buckets Setup

To enable cloud media uploads, create the following public buckets in your Supabase project under **Storage**:

1. `portfolio`
2. `certificates`
3. `profile`
4. `experience`
5. `site`

### Storage Bucket Policies (SQL):
In the Supabase SQL Editor:

```sql
-- Allow public read access on all storage buckets
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (true);

-- Allow authenticated uploads via service role or admin API
CREATE POLICY "Admin Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (true);
```

---

## 🐍 Python Maintenance Script

A companion Python CLI utility is available in `nazifyosufi.py`:

```bash
python nazifyosufi.py
```

It inspects database status, total project count, verified certificates, and incoming inquiry counts.

