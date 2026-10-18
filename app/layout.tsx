import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import prisma from "@/lib/prisma";
import PublicLayoutWrapper from "@/components/public/PublicLayoutWrapper";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

import { defaultSiteSettings, defaultHomeContent } from "@/lib/fallback-data";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  let settings = defaultSiteSettings;
  try {
    const fetched = await prisma.siteSettings.findUnique({
      where: { id: "default-settings" },
    });
    if (fetched) settings = fetched;
  } catch (e) {
    console.warn("Using default site settings metadata:", e);
  }

  const siteName = settings?.siteName || "UR CLUB";
  const title = settings?.title || "توسعه پلتفرم‌های دیجیتال با فناوری‌های آماده آینده";
  const description = settings?.metaDescription || "UR CLUB — استودیو تخصصی طراحی سایت، توسعه نرم‌افزار، کارت ویزیت آنلاین، طراحی لوگو و برندینگ در افغانستان و آلمان.";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://urclubstudio.com";
  const keywordList = settings?.keywords
    ? settings.keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
    : [];

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
      languages: {
        fa: baseUrl,
        en: `${baseUrl}?lang=en`,
        de: `${baseUrl}?lang=de`,
      },
    },
    title: {
      default: `${siteName} | ${title}`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: keywordList,
    authors: [{ name: settings?.fullName || "Mohammad Nazif Yosufi" }],
    creator: settings?.designerName || "Nazif Yosufi",
    openGraph: {
      title: `${siteName} | ${title}`,
      description,
      siteName,
      url: baseUrl,
      locale: "fa_AF",
      alternateLocale: ["en_US", "de_DE"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/images/favicon.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon.ico" },
      ],
      shortcut: "/favicon.ico",
      apple: "/images/favicon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings = defaultSiteSettings;
  let home = defaultHomeContent;

  try {
    const [fetchedSettings, fetchedHome] = await Promise.all([
      prisma.siteSettings.findUnique({
        where: { id: "default-settings" },
        include: {
          socialLinks: {
            where: { active: true },
            orderBy: { displayOrder: "asc" },
          },
        },
      }),
      prisma.homeContent.findUnique({
        where: { id: "default-home" },
      }),
    ]);
    if (fetchedSettings) settings = fetchedSettings;
    if (fetchedHome) home = fetchedHome;
  } catch (e) {
    console.warn("Using default layout content due to database offline:", e);
  }

  return (
    <html lang="fa" dir="rtl" className={`dark scroll-smooth bg-[#040B20] ${inter.variable} ${vazir.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/images/team_logo_transparent.png" as="image" />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#040B20] text-[#F8FAFC] antialiased selection:bg-[#00D2FF] selection:text-[#040B20]"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <PublicLayoutWrapper
            designerName={settings?.designerName || "Nazif Yosufi"}
            availabilityStatus={home?.availabilityStatus ?? true}
            tagline={settings?.tagline || home?.heroSubtitle}
            email={settings?.email || "contact@nazifyosufi.com"}
            location={settings?.location || "Germany"}
            copyrightText={settings?.copyrightText || "© 2026 Nazif Yosufi. All rights reserved."}
            socialLinks={settings?.socialLinks || []}
          >
            {children}
          </PublicLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
