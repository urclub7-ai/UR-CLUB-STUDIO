import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Initializing clean database state for Mohammad Nazif Yosufi...");

  // 1. Admin Account (Essential for logging in)
  const adminPasswordHash = await bcrypt.hash("Admin@2026!", 12);
  await prisma.admin.upsert({
    where: { email: "admin@portfolio.com" },
    update: {
      passwordHash: adminPasswordHash,
      name: "Mohammad Nazif Yosufi",
    },
    create: {
      email: "admin@portfolio.com",
      passwordHash: adminPasswordHash,
      name: "Mohammad Nazif Yosufi",
      role: "SUPER_ADMIN",
    },
  });
  console.log("✓ Admin user ready: admin@portfolio.com");

  // 2. Clear all dynamic content tables
  await prisma.projectImage.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.certificate.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.socialLink.deleteMany({});
  console.log("✓ Cleared all projects, certificates, experiences, services, skills, and messages.");

  // 3. Clean Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default-settings" },
    update: {
      siteName: "Nazif Yosufi — Graphic Designer & Web Designer",
      designerName: "Nazif Yosufi",
      fullName: "Mohammad Nazif Yosufi",
      title: "Graphic Designer • Web Designer • Creative Technologist",
      tagline: "Designing ideas into digital experiences with passion for modern technologies.",
      metaDescription: "Personal portfolio of Nazif Yosufi, showcasing graphic design, web design, digital projects, certificates and professional experience.",
      keywords: "graphic design, web design, creative technologist, visual design, UI design, Mohammad Nazif Yosufi, Germany",
      email: "contact@nazifyosufi.com",
      phone: null,
      location: "Germany",
      copyrightText: "© 2026 Nazif Yosufi. All rights reserved.",
      resumeUrl: null,
      logoUrl: null,
      faviconUrl: null,
    },
    create: {
      id: "default-settings",
      siteName: "Nazif Yosufi — Graphic Designer & Web Designer",
      designerName: "Nazif Yosufi",
      fullName: "Mohammad Nazif Yosufi",
      title: "Graphic Designer • Web Designer • Creative Technologist",
      tagline: "Designing ideas into digital experiences with passion for modern technologies.",
      metaDescription: "Personal portfolio of Nazif Yosufi, showcasing graphic design, web design, digital projects, certificates and professional experience.",
      keywords: "graphic design, web design, creative technologist, visual design, UI design, Mohammad Nazif Yosufi, Germany",
      email: "contact@nazifyosufi.com",
      phone: null,
      location: "Germany",
      copyrightText: "© 2026 Nazif Yosufi. All rights reserved.",
      resumeUrl: null,
      logoUrl: null,
      faviconUrl: null,
    },
  });
  console.log("✓ Site settings initialized.");

  // 4. Clean Home Content
  await prisma.homeContent.upsert({
    where: { id: "default-home" },
    update: {
      heroGreeting: "Nazif Yosufi",
      heroTitle: "Designing ideas into digital experiences.",
      heroSubtitle: "Graphic Designer • Web Designer • Creative Technologist",
      heroDescription: "I create visual designs and digital experiences with a strong interest in technology, web development and artificial intelligence.",
      availabilityStatus: true,
      availabilityText: "Available for new projects & collaborations",
      heroImageUrl: null,
      profileImageUrl: null,
      resumeUrl: null,
      primaryCtaText: "View My Work",
      primaryCtaUrl: "/portfolio",
      secondaryCtaText: "Let's Work Together",
      secondaryCtaUrl: "/contact",
      tertiaryCtaText: "View Certificates",
      tertiaryCtaUrl: "/certificates",
    },
    create: {
      id: "default-home",
      heroGreeting: "Nazif Yosufi",
      heroTitle: "Designing ideas into digital experiences.",
      heroSubtitle: "Graphic Designer • Web Designer • Creative Technologist",
      heroDescription: "I create visual designs and digital experiences with a strong interest in technology, web development and artificial intelligence.",
      availabilityStatus: true,
      availabilityText: "Available for new projects & collaborations",
      heroImageUrl: null,
      profileImageUrl: null,
      resumeUrl: null,
      primaryCtaText: "View My Work",
      primaryCtaUrl: "/portfolio",
      secondaryCtaText: "Let's Work Together",
      secondaryCtaUrl: "/contact",
      tertiaryCtaText: "View Certificates",
      tertiaryCtaUrl: "/certificates",
    },
  });
  console.log("✓ Home content initialized.");

  // 5. Clean About Content
  await prisma.aboutContent.upsert({
    where: { id: "default-about" },
    update: {
      heading: "About Me",
      subheading: "Graphic Designer, Web Designer & Creative Technologist based in Germany.",
      bioSummary: "I’m Mohammad Nazif Yosufi, a graphic and web designer based in Germany. My interests combine visual design, web development, computer systems, AI and modern technologies.",
      fullBio: "I’m Mohammad Nazif Yosufi, a graphic and web designer based in Germany. My interests combine visual design, web development, computer systems, AI and modern technologies.\n\nI enjoy turning ideas into practical digital experiences and continuously learning new tools and technologies.\n\nAlongside design, I have developed practical knowledge in website creation, frontend and backend development, computer systems, Windows and AI-assisted development.",
      profilePhotoUrl: null,
      resumeUrl: null,
      location: "Germany",
      languages: "Persian / Dari — Native\nGerman — B1\nEnglish — Technical / Basic knowledge",
      strengths: "Technically interested, Motivated to learn, Reliable, Independent, Responsible, Fast learner, Enjoys working with computers",
    },
    create: {
      id: "default-about",
      heading: "About Me",
      subheading: "Graphic Designer, Web Designer & Creative Technologist based in Germany.",
      bioSummary: "I’m Mohammad Nazif Yosufi, a graphic and web designer based in Germany. My interests combine visual design, web development, computer systems, AI and modern technologies.",
      fullBio: "I’m Mohammad Nazif Yosufi, a graphic and web designer based in Germany. My interests combine visual design, web development, computer systems, AI and modern technologies.\n\nI enjoy turning ideas into practical digital experiences and continuously learning new tools and technologies.\n\nAlongside design, I have developed practical knowledge in website creation, frontend and backend development, computer systems, Windows and AI-assisted development.",
      profilePhotoUrl: null,
      resumeUrl: null,
      location: "Germany",
      languages: "Persian / Dari — Native\nGerman — B1\nEnglish — Technical / Basic knowledge",
      strengths: "Technically interested, Motivated to learn, Reliable, Independent, Responsible, Fast learner, Enjoys working with computers",
    },
  });
  console.log("✓ About content initialized.");

  console.log("✨ Clean database initialization complete! Database is now empty and ready for admin uploads.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
