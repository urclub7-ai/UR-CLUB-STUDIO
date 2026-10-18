-- ============================================================================
-- UR CLUB — Supabase PostgreSQL Schema & Storage Setup
-- Project URL: https://rjksedhtyhcwlomwqhis.supabase.co
-- Domain: https://urclubstudio.com
-- Notification Email: urclub7@gmail.com
-- ============================================================================

-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Admin Table
CREATE TABLE IF NOT EXISTS "Admin" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "email" TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. SiteSettings Table
CREATE TABLE IF NOT EXISTS "SiteSettings" (
    "id" TEXT PRIMARY KEY DEFAULT 'default-settings',
    "siteName" TEXT NOT NULL DEFAULT 'UR CLUB — Digital Engineering & Brand Architecture',
    "designerName" TEXT NOT NULL DEFAULT 'UR CLUB',
    "fullName" TEXT NOT NULL DEFAULT 'UR CLUB Collective',
    "title" TEXT NOT NULL DEFAULT 'Digital Engineering Collective • High-Trust Platforms',
    "tagline" TEXT NOT NULL DEFAULT 'Scale digital products with technical excellence, modern speed, and European standards.',
    "logoUrl" TEXT DEFAULT '/images/team_logo_transparent.png',
    "faviconUrl" TEXT DEFAULT '/favicon.ico',
    "metaDescription" TEXT NOT NULL DEFAULT 'Official platform of UR CLUB, engineering high-performance web platforms, mobile applications, and visual identity.',
    "keywords" TEXT NOT NULL DEFAULT 'UR CLUB, digital engineering, web development, mobile apps, graphic design, nextjs, supabase',
    "email" TEXT NOT NULL DEFAULT 'urclub7@gmail.com',
    "phone" TEXT DEFAULT '+49 162 4212685',
    "location" TEXT NOT NULL DEFAULT 'Germany / Global',
    "copyrightText" TEXT NOT NULL DEFAULT '© 2026 UR CLUB. All rights reserved.',
    "googleAnalyticsId" TEXT,
    "resumeUrl" TEXT DEFAULT '/cv-urclub.pdf',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. SocialLink Table
CREATE TABLE IF NOT EXISTS "SocialLink" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'Globe',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "siteSettingsId" TEXT,
    CONSTRAINT "SocialLink_siteSettingsId_fkey" FOREIGN KEY ("siteSettingsId") REFERENCES "SiteSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. HomeContent Table
CREATE TABLE IF NOT EXISTS "HomeContent" (
    "id" TEXT PRIMARY KEY DEFAULT 'default-home',
    "heroGreeting" TEXT NOT NULL DEFAULT 'UR CLUB',
    "heroTitle" TEXT NOT NULL DEFAULT 'مهندسی پلتفرم‌های دیجیتال با استانداردهای مدرن اروپا',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Digital Engineering & Brand Collective',
    "heroDescription" TEXT NOT NULL DEFAULT 'تیم متخصص در توسعه وبسایت، اپلیکیشن‌های مقیاس‌پذیر و هویت بصری یکپارچه.',
    "availabilityStatus" BOOLEAN NOT NULL DEFAULT true,
    "availabilityText" TEXT NOT NULL DEFAULT 'آماده پذیرش و اجرای پروژه‌های جدید',
    "heroImageUrl" TEXT,
    "profileImageUrl" TEXT,
    "resumeUrl" TEXT,
    "primaryCtaText" TEXT NOT NULL DEFAULT 'سفارش پروژه',
    "primaryCtaUrl" TEXT NOT NULL DEFAULT '/order',
    "secondaryCtaText" TEXT NOT NULL DEFAULT 'درخواست جلسه',
    "secondaryCtaUrl" TEXT NOT NULL DEFAULT '/#contact-section',
    "tertiaryCtaText" TEXT NOT NULL DEFAULT 'پروژه‌های قبلی',
    "tertiaryCtaUrl" TEXT NOT NULL DEFAULT '/#projects-section',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. AboutContent Table
CREATE TABLE IF NOT EXISTS "AboutContent" (
    "id" TEXT PRIMARY KEY DEFAULT 'default-about',
    "heading" TEXT NOT NULL DEFAULT 'درباره UR CLUB',
    "subheading" TEXT NOT NULL DEFAULT 'تیم مهندسی نرم‌افزار، هویت برند و نوآوری دیجیتال',
    "bioSummary" TEXT NOT NULL DEFAULT 'مجموعه‌ای متعهد به استانداردهای بین‌المللی، کدهای بهینه و تحویل سریع پلتفرم‌های مدرن.',
    "fullBio" TEXT NOT NULL DEFAULT 'تیم UR CLUB ترکیبی از مهندسان نرم‌افزار، طراحان رابط کاربری و متخصصان هوش مصنوعی است که بر ارائه بالاترین سطح کیفیت تمرکز دارند.',
    "profilePhotoUrl" TEXT,
    "resumeUrl" TEXT,
    "location" TEXT NOT NULL DEFAULT 'Germany / Global',
    "languages" TEXT NOT NULL DEFAULT 'Persian / Dari — Native\nGerman — Professional\nEnglish — Fluent',
    "strengths" TEXT NOT NULL DEFAULT 'Enterprise Architecture, Edge Performance, European Security Standards, Clean Vector Branding',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Skill Table
CREATE TABLE IF NOT EXISTS "Skill" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "name_fa" TEXT,
    "category" TEXT NOT NULL DEFAULT 'DESIGN',
    "category_fa" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'Palette',
    "proficiency" INTEGER NOT NULL DEFAULT 85,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "Skill_category_idx" ON "Skill"("category");
CREATE INDEX IF NOT EXISTS "Skill_displayOrder_idx" ON "Skill"("displayOrder");

-- 7. Project Table
CREATE TABLE IF NOT EXISTS "Project" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "title_fa" TEXT,
    "slug" TEXT UNIQUE NOT NULL,
    "category" TEXT NOT NULL,
    "category_fa" TEXT,
    "shortDescription" TEXT NOT NULL,
    "shortDescription_fa" TEXT,
    "fullDescription" TEXT NOT NULL,
    "fullDescription_fa" TEXT,
    "client" TEXT DEFAULT 'Independent Project',
    "client_fa" TEXT,
    "projectYear" TEXT NOT NULL DEFAULT '2026',
    "toolsUsed" TEXT NOT NULL DEFAULT 'Next.js, Tailwind CSS, Supabase, TypeScript',
    "servicesProvided" TEXT NOT NULL DEFAULT 'Web Platform, UI/UX Engineering',
    "servicesProvided_fa" TEXT,
    "thumbnail" TEXT NOT NULL,
    "projectUrl" TEXT,
    "behanceUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "Project_slug_idx" ON "Project"("slug");
CREATE INDEX IF NOT EXISTS "Project_category_idx" ON "Project"("category");
CREATE INDEX IF NOT EXISTS "Project_featured_idx" ON "Project"("featured");
CREATE INDEX IF NOT EXISTS "Project_published_idx" ON "Project"("published");
CREATE INDEX IF NOT EXISTS "Project_displayOrder_idx" ON "Project"("displayOrder");

-- 8. ProjectImage Table
CREATE TABLE IF NOT EXISTS "ProjectImage" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "projectId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "altText_fa" TEXT,
    "caption" TEXT,
    "caption_fa" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "ProjectImage_projectId_idx" ON "ProjectImage"("projectId");
CREATE INDEX IF NOT EXISTS "ProjectImage_displayOrder_idx" ON "ProjectImage"("displayOrder");

-- 9. Certificate Table
CREATE TABLE IF NOT EXISTS "Certificate" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "title_fa" TEXT,
    "issuer" TEXT NOT NULL,
    "issuer_fa" TEXT,
    "issueDate" TEXT NOT NULL,
    "expirationDate" TEXT,
    "expirationDate_fa" TEXT,
    "credentialId" TEXT,
    "score" TEXT,
    "verificationUrl" TEXT,
    "description" TEXT,
    "description_fa" TEXT,
    "certificateImage" TEXT,
    "pdfFile" TEXT,
    "skillsCovered" TEXT,
    "skillsCovered_fa" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "Certificate_featured_idx" ON "Certificate"("featured");
CREATE INDEX IF NOT EXISTS "Certificate_published_idx" ON "Certificate"("published");
CREATE INDEX IF NOT EXISTS "Certificate_displayOrder_idx" ON "Certificate"("displayOrder");

-- 10. Experience Table
CREATE TABLE IF NOT EXISTS "Experience" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "jobTitle" TEXT NOT NULL,
    "jobTitle_fa" TEXT,
    "company" TEXT NOT NULL,
    "company_fa" TEXT,
    "employmentType" TEXT NOT NULL DEFAULT 'Independent / Collective',
    "employmentType_fa" TEXT,
    "location" TEXT NOT NULL DEFAULT 'Germany / Remote',
    "location_fa" TEXT,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "currentlyWorkingHere" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "description_fa" TEXT,
    "responsibilities" TEXT NOT NULL DEFAULT 'Architecting high-speed web apps, backend APIs, and visual identities',
    "responsibilities_fa" TEXT,
    "toolsUsed" TEXT NOT NULL DEFAULT 'Next.js, TypeScript, PostgreSQL, Supabase, Tailwind CSS',
    "companyLogo" TEXT,
    "websiteUrl" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "Experience_published_idx" ON "Experience"("published");
CREATE INDEX IF NOT EXISTS "Experience_displayOrder_idx" ON "Experience"("displayOrder");

-- 11. Service Table
CREATE TABLE IF NOT EXISTS "Service" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "title_fa" TEXT,
    "slug" TEXT UNIQUE NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "shortDescription_fa" TEXT,
    "detailedDescription" TEXT NOT NULL,
    "detailedDescription_fa" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'Sparkles',
    "startingPrice" TEXT,
    "deliveryTime" TEXT,
    "features" TEXT NOT NULL DEFAULT 'Custom visual concept, High-resolution exports, Responsive design, Direct consultation',
    "features_fa" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "Service_slug_idx" ON "Service"("slug");
CREATE INDEX IF NOT EXISTS "Service_active_idx" ON "Service"("active");
CREATE INDEX IF NOT EXISTS "Service_displayOrder_idx" ON "Service"("displayOrder");

-- 12. ContactMessage Table (Inquiries & Orders with 6-character Code)
CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "service" TEXT,
    "budget" TEXT,
    "projectUrl" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "ContactMessage_status_idx" ON "ContactMessage"("status");
CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");

-- ============================================================================
-- 13. Supabase Storage Buckets Setup
-- ============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('portfolio', 'portfolio', true),
  ('certificates', 'certificates', true),
  ('profile', 'profile', true),
  ('experience', 'experience', true),
  ('site', 'site', true),
  ('uploads', 'uploads', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for Public Reading
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Read All Assets'
  ) THEN
    CREATE POLICY "Public Read All Assets" 
    ON storage.objects FOR SELECT 
    TO public 
    USING (bucket_id IN ('portfolio', 'certificates', 'profile', 'experience', 'site', 'uploads'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Uploads'
  ) THEN
    CREATE POLICY "Allow Uploads" 
    ON storage.objects FOR INSERT 
    TO public 
    WITH CHECK (bucket_id IN ('portfolio', 'certificates', 'profile', 'experience', 'site', 'uploads'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Updates'
  ) THEN
    CREATE POLICY "Allow Updates" 
    ON storage.objects FOR UPDATE 
    TO public 
    USING (bucket_id IN ('portfolio', 'certificates', 'profile', 'experience', 'site', 'uploads'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Deletes'
  ) THEN
    CREATE POLICY "Allow Deletes" 
    ON storage.objects FOR DELETE 
    TO public 
    USING (bucket_id IN ('portfolio', 'certificates', 'profile', 'experience', 'site', 'uploads'));
  END IF;
END $$;

-- ============================================================================
-- 14. Initial Seed Data (UR CLUB & urclub7@gmail.com)
-- ============================================================================

INSERT INTO "SiteSettings" (
    "id", "siteName", "designerName", "fullName", "title", "tagline",
    "logoUrl", "metaDescription", "email", "phone", "location", "copyrightText"
)
VALUES (
    'default-settings',
    'UR CLUB — Digital Engineering & Brand Architecture',
    'UR CLUB',
    'UR CLUB Collective',
    'Digital Engineering Collective • High-Trust Platforms',
    'Scale digital products with technical excellence, modern speed, and European standards.',
    '/images/team_logo_transparent.png',
    'Official platform of UR CLUB, engineering high-performance web platforms, mobile applications, and visual identity.',
    'urclub7@gmail.com',
    '+49 162 4212685',
    'Germany / Global',
    '© 2026 UR CLUB. All rights reserved.'
)
ON CONFLICT ("id") DO UPDATE SET
    "siteName" = EXCLUDED."siteName",
    "email" = 'urclub7@gmail.com',
    "updatedAt" = CURRENT_TIMESTAMP;

INSERT INTO "HomeContent" (
    "id", "heroGreeting", "heroTitle", "heroSubtitle", "heroDescription"
)
VALUES (
    'default-home',
    'UR CLUB',
    'مهندسی پلتفرم‌های دیجیتال با استانداردهای مدرن اروپا',
    'Digital Engineering & Brand Collective',
    'تیم متخصص در توسعه وبسایت، اپلیکیشن‌های مقیاس‌پذیر و هویت بصری یکپارچه.'
)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AboutContent" (
    "id", "heading", "subheading", "bioSummary"
)
VALUES (
    'default-about',
    'درباره UR CLUB',
    'تیم مهندسی نرم‌افزار، هویت برند و نوآوری دیجیتال',
    'مجموعه‌ای متعهد به استانداردهای بین‌المللی، کدهای بهینه و تحویل سریع پلتفرم‌های مدرن.'
)
ON CONFLICT ("id") DO NOTHING;
