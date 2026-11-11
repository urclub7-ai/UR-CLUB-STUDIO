"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "fa";

export interface Translations {
  nav: {
    home: string;
    about: string;
    work: string;
    experience: string;
    services: string;
    contact: string;
    certificates: string;
    available: string;
    letsTalk: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    viewWork: string;
    letsTalk: string;
    projectTag: string;
    projectType: string;
    location: string;
    languages: string;
    role: string;
  };
  work: {
    eyebrow: string;
    title: string;
    allProjects: string;
  };
  about: {
    eyebrow: string;
    statement: string;
    bio: string;
    basedInLabel: string;
    basedInValue: string;
    statusLabel: string;
    statusValue: string;
    focusLabel: string;
    focusValue: string;
    readFull: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    fullTimeline: string;
    present: string;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  services: {
    eyebrow: string;
    title: string;
    allServices: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
  footer: {
    role: string;
    copyright: string;
    imprint: string;
    privacy: string;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    fullNameLabel: string;
    locationLabel: string;
    locationValue: string;
    languagesLabel: string;
    persianLevel: string;
    germanLevel: string;
    englishLevel: string;
    interestsLabel: string;
    interestsValue: string;
    downloadCV: string;
    introEyebrow: string;
    introHeadline: string;
    defaultBio: string;
    strengthsEyebrow: string;
    strengthsList: string[];
    capabilitiesEyebrow: string;
    capabilitiesTitle: string;
  };
  portfolioPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    allCategory: string;
    emptyNotice: string;
  };
  projectDetailPage: {
    backToPortfolio: string;
    clientLabel: string;
    disciplineLabel: string;
    yearLabel: string;
    liveSite: string;
    overviewEyebrow: string;
    overviewTitle: string;
    servicesProvided: string;
    toolsUsed: string;
    visualArchiveEyebrow: string;
    visualArchiveTitle: string;
    prevProject: string;
    nextProject: string;
  };
  experiencePage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    present: string;
    scopeLabel: string;
    toolkitLabel: string;
    growingTitle: string;
    growingDesc: string;
  };
  servicesPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    investmentLabel: string;
    bookService: string;
    customQuote: string;
    inclusionsLabel: string;
    processEyebrow: string;
    processTitle: string;
    phases: {
      tag: string;
      title: string;
      desc: string;
    }[];
  };
  contactPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    directEmail: string;
    studioPhone: string;
    location: string;
    responseTitle: string;
    responseDesc: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      serviceLabel: string;
      budgetLabel: string;
      projectUrlLabel: string;
      projectUrlPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      sendButton: string;
      sendingButton: string;
      successTitle: string;
      sendAnother: string;
      serviceOptions: string[];
      budgetOptions: string[];
    };
  };
  certificatesPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emptyNotice: string;
    viewCert: string;
    issuedBy: string;
    issueDate: string;
    credentialId: string;
    verifyOnline: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      work: "Projects",
      experience: "Experience",
      services: "Services",
      contact: "Contact",
      certificates: "Certificates",
      available: "Open for Projects",
      letsTalk: "Let's Talk",
    },
    hero: {
      eyebrow: "Digital Engineering & Design Studio",
      title: "Digital Platform Development with Future-Ready Technologies",
      description: "Design, software engineering, and high-performance web platform development.",
      viewWork: "View Projects",
      letsTalk: "Contact Us",
      projectTag: "Project",
      projectType: "Web Engineering",
      location: "Germany",
      languages: "Dari · German · English",
      role: "Software Engineers & Designers",
    },
    work: {
      eyebrow: "Portfolio",
      title: "Projects & Platforms",
      allProjects: "All Projects",
    },
    about: {
      eyebrow: "About UR CLUB",
      statement: "High-performance web architecture and digital product design.",
      bio: "We are UR CLUB, a specialized software engineering and design studio based in Germany. We build scalable platforms, commerce systems, and resilient infrastructure for founders and partners.",
      basedInLabel: "Location",
      basedInValue: "Germany",
      statusLabel: "Status",
      statusValue: "Open for Projects & Ventures",
      focusLabel: "Focus",
      focusValue: "Web Systems & Co-Ventures",
      readFull: "View Team",
    },
    experience: {
      eyebrow: "Background",
      title: "Skills & Milestones",
      fullTimeline: "Full Timeline",
      present: "Present",
    },
    process: {
      eyebrow: "Methodology",
      title: "Our Execution Steps",
      steps: [
        {
          number: "01",
          title: "Discovery & Scope",
          description: "Understanding requirements, objectives, and technical roadmaps.",
        },
        {
          number: "02",
          title: "Design & Architecture",
          description: "Crafting UI/UX layouts, data flow, and modern tech stacks.",
        },
        {
          number: "03",
          title: "Engineering",
          description: "Full-stack development with clean, modular, and typed code.",
        },
        {
          number: "04",
          title: "Testing & Polish",
          description: "Performance benchmarking, security audits, and multi-device QA.",
        },
        {
          number: "05",
          title: "Launch & Handover",
          description: "Zero-downtime deployment with 100% source code handover.",
        },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Core Capabilities",
      allServices: "All Services",
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Build Your Next Project\nWith UR CLUB.",
      description: "Have a project or venture idea? Contact us for technical advisory.",
      cta: "Start Conversation",
    },
    footer: {
      role: "Digital Engineering & Web Architecture Studio",
      copyright: "© 2026 UR CLUB. All rights reserved.",
      imprint: "Legal Notice",
      privacy: "Privacy Policy",
    },
    aboutPage: {
      eyebrow: "Profile",
      title: "About Us",
      subtitle: "Web engineering and creative design studio based in Germany.",
      fullNameLabel: "Studio Name",
      locationLabel: "Location",
      locationValue: "Germany",
      languagesLabel: "Languages",
      persianLevel: "Dari — Native",
      germanLevel: "German — Professional",
      englishLevel: "English — Technical / Fluent",
      interestsLabel: "Focus Areas",
      interestsValue: "Web Platforms • AI Integration • Cloud Systems",
      downloadCV: "View Studio Profile",
      introEyebrow: "Introduction",
      introHeadline: "Engineering digital platforms with modern standards.",
      defaultBio: "UR CLUB brings hands-on engineering across Next.js, cloud systems, and AI workflows to deliver fast, secure, and production-grade products.",
      strengthsEyebrow: "Core Values",
      strengthsList: [
        "Clean, Maintainable Code",
        "High Execution Speed",
        "Reliability & Transparency",
        "Dedicated Technical Support",
        "International Engineering Standards",
      ],
      capabilitiesEyebrow: "Capabilities",
      capabilitiesTitle: "Tools & Technologies",
    },
    portfolioPage: {
      eyebrow: "Showcase",
      title: "Projects",
      subtitle: "Curated collection of live web applications, visual identities, and online systems.",
      allCategory: "All",
      emptyNotice: "No projects found in this category.",
    },
    projectDetailPage: {
      backToPortfolio: "Back to Projects",
      clientLabel: "Client",
      disciplineLabel: "Discipline",
      yearLabel: "Year",
      liveSite: "Live Website",
      overviewEyebrow: "Overview",
      overviewTitle: "Project Architecture & Execution",
      servicesProvided: "Delivered Services",
      toolsUsed: "Technologies Used",
      visualArchiveEyebrow: "Gallery",
      visualArchiveTitle: "Project Visuals",
      prevProject: "Previous Project",
      nextProject: "Next Project",
    },
    experiencePage: {
      eyebrow: "Track Record",
      title: "Experience",
      subtitle: "Production projects, systems engineering, and continuous innovation.",
      present: "Present",
      scopeLabel: "Scope",
      toolkitLabel: "Tools:",
      growingTitle: "Continuous Evolution",
      growingDesc: "We continuously build real-world products using the latest cloud and AI tooling.",
    },
    servicesPage: {
      eyebrow: "Offerings",
      title: "Specialized Services",
      subtitle: "Software engineering, web design, and scalable enterprise solutions.",
      investmentLabel: "Investment",
      bookService: "Select Service",
      customQuote: "Custom Quote",
      inclusionsLabel: "Scope",
      processEyebrow: "Process",
      processTitle: "From Planning to Deployment",
      phases: [
        {
          tag: "Phase 01",
          title: "Planning & Scope",
          desc: "Defining objectives and technical architecture.",
        },
        {
          tag: "Phase 02",
          title: "System Design",
          desc: "UI/UX wireframes, user flows, and typography.",
        },
        {
          tag: "Phase 03",
          title: "Development",
          desc: "Building frontend, backend, and API integrations.",
        },
        {
          tag: "Phase 04",
          title: "Launch & Delivery",
          desc: "Speed optimization, live deployment, and code delivery.",
        },
      ],
    },
    contactPage: {
      eyebrow: "Collaboration",
      title: "Contact Us",
      subtitle: "Share your project goals and requirements to begin discussions.",
      directEmail: "Direct Email",
      studioPhone: "Phone / WhatsApp",
      location: "Studio Location",
      responseTitle: "Response Time",
      responseDesc: "Inquiries are reviewed and answered within business hours.",
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "Full Name",
        emailLabel: "Email or WhatsApp",
        emailPlaceholder: "name@company.com",
        companyLabel: "Company / Organization",
        companyPlaceholder: "Optional",
        serviceLabel: "Service Needed",
        budgetLabel: "Estimated Budget",
        projectUrlLabel: "Current Website / Link (Optional)",
        projectUrlPlaceholder: "https://...",
        messageLabel: "Project Brief",
        messagePlaceholder: "Briefly describe what you want to build...",
        sendButton: "Send Message",
        sendingButton: "Sending...",
        successTitle: "Message Received",
        sendAnother: "Send Another Message",
        serviceOptions: [
          "Web & Platform Development",
          "UI/UX Design",
          "Brand & Logo Identity",
          "AI & Technical Advisory",
          "Other / General Inquiry",
        ],
        budgetOptions: [
          "Flexible",
          "Under €1,000",
          "€1,000 – €3,000",
          "€3,000+",
        ],
      },
    },
    certificatesPage: {
      eyebrow: "Credentials",
      title: "Certificates",
      subtitle: "Verified professional certifications and technical architecture credentials.",
      emptyNotice: "No certificates published at this time.",
      viewCert: "View",
      issuedBy: "Issued By:",
      issueDate: "Date:",
      credentialId: "Credential ID:",
      verifyOnline: "Verify",
      close: "Close",
    },
  },
  fa: {
    nav: {
      home: "صفحه اصلی",
      about: "درباره ما",
      work: "پروژه‌ها",
      experience: "تجربه‌ها",
      services: "خدمات",
      contact: "تماس",
      certificates: "سرتیفیکت‌ها",
      available: "آماده قبول پروژه",
      letsTalk: "گفتگو با ما",
    },
    hero: {
      eyebrow: "استودیو مهندسی دیجیتال و دیزاین",
      title: "توسعه پلتفرم‌های دیجیتال با فناوری‌های عصری",
      description: "طراحی، مهندسی نرم‌افزار و توسعه پلتفرم‌های عصری وب با کارایی بالا.",
      viewWork: "دیدن پروژه‌ها",
      letsTalk: "تماس با ما",
      projectTag: "پروژه",
      projectType: "توسعه وب",
      location: "آلمان",
      languages: "دری · آلمانی · انگلیسی",
      role: "توسعه‌دهنده و مهندس نرم‌افزار",
    },
    work: {
      eyebrow: "نمونه‌کارها",
      title: "پروژه‌ها و پلتفرم‌ها",
      allProjects: "تمام پروژه‌ها",
    },
    about: {
      eyebrow: "درباره UR CLUB",
      statement: "مهندسی نرم‌افزار و طراحی رابط‌های دیجیتال با معیارهای بین‌المللی.",
      bio: "ما تیم UR CLUB استیم؛ متخصص در مهندسی نرم‌افزار، معماری وب و دیزاین هویت بصری مقیم آلمان. تمرکز ما اجرای پروژه‌های باکیفیت تجاری و ایجاد بستر مطمئن برای همکاران و سرمایه‌گذاران است.",
      basedInLabel: "موقعیت",
      basedInValue: "آلمان",
      statusLabel: "وضعیت",
      statusValue: "آماده قبول پروژه‌های نو",
      focusLabel: "تمرکز",
      focusValue: "توسعه وب و مشارکت تجاری",
      readFull: "مشاهده تیم",
    },
    experience: {
      eyebrow: "پیشینه",
      title: "مهارت‌ها و سابقه",
      fullTimeline: "تایم‌لاین مکمل",
      present: "فعلاً",
    },
    process: {
      eyebrow: "روش کار",
      title: "مراحل اجرای پروژه",
      steps: [
        {
          number: "۰۱",
          title: "شناخت و اهداف",
          description: "بررسی نیازمندی‌ها، اهداف و پلان تخنیکی پروژه.",
        },
        {
          number: "۰۲",
          title: "طراحی و معماری",
          description: "تعیین ساختار صفحات، رابط کاربری و انتخاب تکنالوژی.",
        },
        {
          number: "۰۳",
          title: "کدنویسی",
          description: "توسعه دقیق فرانت‌اند و بک‌اند با کدهای پاک و بهینه.",
        },
        {
          number: "۰۴",
          title: "تست و بهینه‌سازی",
          description: "بررسی کیفیت، امنیت و لودینگ سریع در تمام دستگاه‌ها.",
        },
        {
          number: "۰۵",
          title: "تحویل و لانچ",
          description: "استقرار زنده پروژه همراه با تحویل مکمل سورس‌کد.",
        },
      ],
    },
    services: {
      eyebrow: "خدمات",
      title: "حوزه‌های فعالیت",
      allServices: "تمام خدمات",
    },
    contact: {
      eyebrow: "ارتباط با ما",
      title: "پروژه بعدی خود را\nبا ما بسازید.",
      description: "ایده یا پروژه‌ای در ذهن دارید؟ برای مشوره تخنیکی پیام بگذارید.",
      cta: "شروع گفتگو",
    },
    footer: {
      role: "استودیو مهندسی دیجیتال و معماری وب",
      copyright: "© ۲۰۲۶ UR CLUB. تمام حقوق محفوظ است.",
      imprint: "معلومات حقوقی",
      privacy: "حفظ حریم خصوصی",
    },
    aboutPage: {
      eyebrow: "مشخصات",
      title: "درباره ما",
      subtitle: "استودیو مهندسی وب و طراحی دیجیتال مقیم آلمان.",
      fullNameLabel: "نام استودیو",
      locationLabel: "موقعیت",
      locationValue: "آلمان",
      languagesLabel: "زبان‌ها",
      persianLevel: "دری — زبان مادری",
      germanLevel: "آلمانی — مسلکی / کاری",
      englishLevel: "انگلیسی — تخنیکی / مسلکی",
      interestsLabel: "حوزه‌ها",
      interestsValue: "توسعه وب • هوش مصنوعی • کلاود",
      downloadCV: "مشاهده پروفایل کاری",
      introEyebrow: "معرفی",
      introHeadline: "توسعه نرم‌افزار با معیارهای عصری.",
      defaultBio: "تیم UR CLUB با تجربه عملی در مهندسی وب، فرانت‌اند، بک‌اند و ابزارهای هوش مصنوعی، پلتفرم‌های سریع و مطمئن خلق می‌کند.",
      strengthsEyebrow: "مزیت‌های کاری",
      strengthsList: [
        "کدنویسی پاک و منظم",
        "سرعت بالای اجرا",
        "تعهد و وقت‌شناسی",
        "پشتیبانی تخنیکی مداوم",
        "رعایت استانداردهای بین‌المللی",
      ],
      capabilitiesEyebrow: "مهارت‌ها",
      capabilitiesTitle: "ابزارها و تکنالوژی‌ها",
    },
    portfolioPage: {
      eyebrow: "آرشیف کارها",
      title: "پروژه‌ها",
      subtitle: "مجموعه‌ای از وبسایت‌ها، هویت‌های بصری و سیستم‌های آنلاین.",
      allCategory: "همه",
      emptyNotice: "پروژه‌ای در این بخش یافت نشد.",
    },
    projectDetailPage: {
      backToPortfolio: "برگشت به پروژه‌ها",
      clientLabel: "مشتری",
      disciplineLabel: "حوزه",
      yearLabel: "سال",
      liveSite: "سایت زنده",
      overviewEyebrow: "خلاصه",
      overviewTitle: "مشخصات و معماری پروژه",
      servicesProvided: "خدمات ارائه‌شده",
      toolsUsed: "تکنالوژی‌ها",
      visualArchiveEyebrow: "تصاویر",
      visualArchiveTitle: "نمای پروژه",
      prevProject: "پروژه قبلی",
      nextProject: "پروژه بعدی",
    },
    experiencePage: {
      eyebrow: "سابقه",
      title: "تجربه کاری",
      subtitle: "پروژه‌های عملی و توسعه سیستم‌های نرم‌افزاری.",
      present: "فعلاً",
      scopeLabel: "حوزه کار",
      toolkitLabel: "ابزارها:",
      growingTitle: "رشد و توسعه دوامدار",
      growingDesc: "ما پروژه‌های واقعی و کاربردی می‌سازیم و همواره از ابزارهای عصری استفاده می‌کنیم.",
    },
    servicesPage: {
      eyebrow: "پیشنهادات",
      title: "خدمات تخصصی",
      subtitle: "توسعه نرم‌افزار، طراحی وب و راه‌حل‌های تجاری مقیاس‌پذیر.",
      investmentLabel: "سرمایه‌گذاری",
      bookService: "انتخاب خدمت",
      customQuote: "استعلام قیمت",
      inclusionsLabel: "شمولیت‌ها",
      processEyebrow: "پروسه کار",
      processTitle: "از پلان‌گذاری تا راه‌اندازی",
      phases: [
        {
          tag: "مرحله ۰۱",
          title: "بررسی و پلان",
          desc: "شناخت اهداف و تنظیم معماری تخنیکی.",
        },
        {
          tag: "مرحله ۰۲",
          title: "طراحی ساختار",
          desc: "دیزاین رابط کاربری و سلسله‌مراتب بصری.",
        },
        {
          tag: "مرحله ۰۳",
          title: "کدنویسی و توسعه",
          desc: "ساخت فرانت‌اند، بک‌اند و اتصال دیتابیس.",
        },
        {
          tag: "مرحله ۰۴",
          title: "راه‌اندازی و تحویل",
          desc: "تست سرعت، استقرار زنده و تسلیم سورس‌کد.",
        },
      ],
    },
    contactPage: {
      eyebrow: "شروع کار",
      title: "تماس با ما",
      subtitle: "مشخصات پروژه یا اهداف کاری‌تان را بنویسید تا گفتگو کنیم.",
      directEmail: "ایمیل مستقیم",
      studioPhone: "شماره تماس",
      location: "موقعیت دفتر",
      responseTitle: "زمان پاسخگویی",
      responseDesc: "پیام‌ها ظرف چند ساعت کاری بررسی و پاسخ داده می‌شوند.",
      form: {
        nameLabel: "نام شما",
        namePlaceholder: "نام و تخلص",
        emailLabel: "ایمیل یا واتساپ",
        emailPlaceholder: "example@domain.com",
        companyLabel: "شرکت / نهاد",
        companyPlaceholder: "اختیاری",
        serviceLabel: "نوع خدمت",
        budgetLabel: "بودجه تخمینی",
        projectUrlLabel: "لینک پروژه فعلی (اختیاری)",
        projectUrlPlaceholder: "https://...",
        messageLabel: "توضیح مختصر پروژه",
        messagePlaceholder: "درباره پروژه یا هدفتان بنویسید...",
        sendButton: "ارسال پیام",
        sendingButton: "در حال ارسال...",
        successTitle: "پیام ارسال شد",
        sendAnother: "ارسال پیام جدید",
        serviceOptions: [
          "توسعه وبسایت و پلتفرم",
          "طراحی رابط کاربری (UI/UX)",
          "لوگو و هویت بصری",
          "مشاوره تخنیکی و هوش مصنوعی",
          "سایر موارد",
        ],
        budgetOptions: [
          "قابل انعطاف",
          "کمتر از ۱,۰۰۰ یورو",
          "۱,۰۰۰ – ۳,۰۰۰ یورو",
          "۳,۰۰۰+ یورو",
        ],
      },
    },
    certificatesPage: {
      eyebrow: "اعتبارنامه‌ها",
      title: "سرتیفیکت‌ها",
      subtitle: "مدارک مسلکی و سرتیفیکت‌های تخنیکی.",
      emptyNotice: "سرتیفیکتی برای نمایش موجود نیست.",
      viewCert: "مشاهده",
      issuedBy: "مرجع صدور:",
      issueDate: "تاریخ:",
      credentialId: "شناسه مدرک:",
      verifyOnline: "بررسی آنلاین",
      close: "بستن",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dir: "ltr" | "rtl";
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "fa",
  setLanguage: () => {},
  toggleLanguage: () => {},
  dir: "rtl",
  t: translations.fa,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fa");

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("site_language");
      }

      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang") as Language | null;
      const sessionLang = typeof window !== "undefined"
        ? (sessionStorage.getItem("site_language") as Language | null)
        : null;

      const targetLang: Language = (urlLang === "en" || urlLang === "fa")
        ? urlLang
        : (sessionLang === "en" || sessionLang === "fa")
          ? sessionLang
          : "fa"; // Persian by default!

      setLanguageState(targetLang);
      document.documentElement.setAttribute("lang", targetLang);
      document.documentElement.setAttribute("dir", targetLang === "fa" ? "rtl" : "ltr");
    } catch {
      // fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      sessionStorage.setItem("site_language", lang);
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    } catch {}
  };

  const toggleLanguage = () => {
    const next = language === "en" ? "fa" : "en";
    setLanguage(next);
  };

  const dir = language === "fa" ? "rtl" : "ltr";
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        dir,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
