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
      work: "Work",
      experience: "Experience",
      services: "Services",
      contact: "Contact",
      certificates: "Certificates",
      available: "Available for projects",
      letsTalk: "Let's talk",
    },
    hero: {
      eyebrow: "DESIGNER / DEVELOPER",
      title: "Designing ideas into digital experiences.",
      description:
        "I design and build modern digital experiences, websites and interactive interfaces with a focus on clean aesthetics and thoughtful engineering.",
      viewWork: "View selected work",
      letsTalk: "Let's talk",
      projectTag: "Project 01",
      projectType: "Web Design / Development",
      location: "Germany",
      languages: "Persian, German, English",
      role: "Independent Creative Developer",
    },
    work: {
      eyebrow: "Selected Work",
      title: "Projects & experiments",
      allProjects: "All projects",
    },
    about: {
      eyebrow: "About UrClub",
      statement:
        "We design and build high-performance digital platforms where technology meets iconic design.",
      bio: "We are UrClub, a specialized engineering and visual innovation collective based in Germany. Our work combines full-stack web architectures, brand identity systems, and interactive digital products — engineered for high trust, reliability, and growth.",
      basedInLabel: "Based in",
      basedInValue: "Germany",
      statusLabel: "Status",
      statusValue: "Available for Ventures & Projects",
      focusLabel: "Focus",
      focusValue: "Web Systems & Co-Venture",
      readFull: "Read team profile",
    },
    experience: {
      eyebrow: "Experience",
      title: "Background & skills",
      fullTimeline: "Full timeline",
      present: "Present",
    },
    process: {
      eyebrow: "Process",
      title: "How I Work",
      steps: [
        {
          number: "01",
          title: "Discover",
          description:
            "Understand the idea, goals, audience, and essential requirements through research and conversation.",
        },
        {
          number: "02",
          title: "Plan",
          description:
            "Define the visual direction, layout structure, and technical architecture.",
        },
        {
          number: "03",
          title: "Create",
          description:
            "Design and develop the solution with attention to every detail.",
        },
        {
          number: "04",
          title: "Refine",
          description:
            "Review, iterate, and polish until the result meets the highest standard.",
        },
        {
          number: "05",
          title: "Deliver",
          description:
            "Ship the final project with all source files and production-ready assets.",
        },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "What I do",
      allServices: "All services",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Let's build something\ntimeless together.",
      description:
        "Have an idea, project or experiment in mind? I'd love to hear about it.",
      cta: "Start a conversation",
    },
    footer: {
      role: "Digital Engineering Collective",
      copyright: "© 2026 UrClub. All rights reserved.",
      imprint: "Imprint",
      privacy: "Privacy",
    },
    aboutPage: {
      eyebrow: "Personal Profile",
      title: "About Me",
      subtitle: "Web Designer, Creative Developer & Digital Craftsman based in Germany.",
      fullNameLabel: "Full Name",
      locationLabel: "Location",
      locationValue: "Germany",
      languagesLabel: "Languages",
      persianLevel: "Persian / Dari — Native",
      germanLevel: "German — B1",
      englishLevel: "English — Technical / Working",
      interestsLabel: "Interests",
      interestsValue: "Design • Web • IT • AI",
      downloadCV: "Download CV / Resume (PDF)",
      introEyebrow: "Introduction",
      introHeadline: "Combining creativity with modern technology.",
      defaultBio:
        "I’m Mohammad Nazif Yosufi, a graphic and web designer based in Germany. My interests bring together visual design, web development, computer systems, AI, and modern technologies.\n\nI enjoy turning ideas into practical digital experiences and continuously learning new tools and technologies.\n\nAlongside design, I have hands-on experience creating websites, working with frontend and backend development, Windows systems, and AI-assisted development.",
      strengthsEyebrow: "Personal Strengths",
      strengthsList: [
        "Technically interested",
        "Motivated to learn",
        "Reliable & punctual",
        "Independent problem solver",
        "Responsible",
        "Fast learner",
        "Passion for clean code & UI",
      ],
      capabilitiesEyebrow: "Capabilities",
      capabilitiesTitle: "Knowledge & Toolsets",
    },
    portfolioPage: {
      eyebrow: "Archive & Case Studies",
      title: "Portfolio",
      subtitle: "A curated collection of web designs, visual identities, custom interfaces, and experimental projects.",
      allCategory: "All",
      emptyNotice: "No projects found in this category.",
    },
    projectDetailPage: {
      backToPortfolio: "Back to Portfolio",
      clientLabel: "Client",
      disciplineLabel: "Discipline",
      yearLabel: "Year",
      liveSite: "Live Site",
      overviewEyebrow: "Case Study Synopsis",
      overviewTitle: "Project Architecture & Creative Execution",
      servicesProvided: "Services Provided",
      toolsUsed: "Tools & Technologies",
      visualArchiveEyebrow: "Visual Archive",
      visualArchiveTitle: "Project Imagery & Collateral",
      prevProject: "Previous Project",
      nextProject: "Next Project",
    },
    experiencePage: {
      eyebrow: "Practice & Milestones",
      title: "Experience & Projects",
      subtitle: "Independent design work, practical web development projects, and ongoing technological learning.",
      present: "Present",
      scopeLabel: "Key Scope & Learning",
      toolkitLabel: "Toolkit:",
      growingTitle: "Experience is continuously growing.",
      growingDesc: "I am actively building real-world practical projects, expanding my knowledge in modern web architectures and visual design, and open to professional opportunities.",
    },
    servicesPage: {
      eyebrow: "Commissions & Capabilities",
      title: "Services",
      subtitle: "Comprehensive creative direction tailored for ambitious brands requiring modern web architecture and visual clarity.",
      investmentLabel: "Investment",
      bookService: "Book Service",
      customQuote: "Custom Quote",
      inclusionsLabel: "Scope & Inclusions",
      processEyebrow: "Design Process",
      processTitle: "How we collaborate from discovery to launch",
      phases: [
        {
          tag: "Phase 01",
          title: "Discovery & Strategy",
          desc: "Auditing competitive landscape, defining core visual tension, and establishing typographic direction.",
        },
        {
          tag: "Phase 02",
          title: "Concept Architecture",
          desc: "Developing 2–3 distinct visual systems with logo marks, grid rules, chromatic hierarchy, and type specimens.",
        },
        {
          tag: "Phase 03",
          title: "Refinement & Collateral",
          desc: "Applying the chosen system to real-world touchpoints: packaging, editorial layouts, stationery, and digital assets.",
        },
        {
          tag: "Phase 04",
          title: "Guidelines & Production",
          desc: "Delivery of comprehensive brand manual, production-ready source files, and live deployment.",
        },
      ],
    },
    contactPage: {
      eyebrow: "Initiate Collaboration",
      title: "Contact",
      subtitle: "Please provide details regarding your brand scope, desired timeline, and project goals below.",
      directEmail: "Direct Correspondence",
      studioPhone: "Studio Telephone",
      location: "Studio Location",
      responseTitle: "Commission Timeline & Response",
      responseDesc: "Inquiries are typically reviewed within 24 to 48 business hours. If the commission is a fit, we will arrange a discovery video consultation.",
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "e.g. John Doe",
        emailLabel: "Email Address",
        emailPlaceholder: "your.email@example.com",
        companyLabel: "Company / Organization",
        companyPlaceholder: "Optional",
        serviceLabel: "Service Needed",
        budgetLabel: "Estimated Budget Scope",
        projectUrlLabel: "Optional Project / Website URL",
        projectUrlPlaceholder: "https://...",
        messageLabel: "Message & Project Goals",
        messagePlaceholder: "Tell me about your idea, goals, or what you would like to build...",
        sendButton: "Send Message",
        sendingButton: "Sending Message...",
        successTitle: "Message Received",
        sendAnother: "Send Another Message",
        serviceOptions: [
          "Website Design & Development",
          "UI / UX Design",
          "Brand Identity & Logo",
          "Poster & Visual Design",
          "Other / General Inquiry",
        ],
        budgetOptions: [
          "Flexible / Not set",
          "Under €500",
          "€500 – €1,500",
          "€1,500 – €3,000",
          "€3,000+",
        ],
      },
    },
    certificatesPage: {
      eyebrow: "Qualifications & Accreditations",
      title: "Certificates",
      subtitle: "Official professional accreditations, web architecture qualifications, and technical certificates.",
      emptyNotice: "No certificates currently published.",
      viewCert: "View",
      issuedBy: "Issued by:",
      issueDate: "Date:",
      credentialId: "Credential ID:",
      verifyOnline: "Verify",
      close: "Close",
    },
  },
  fa: {
    nav: {
      home: "صفحه اصلی",
      about: "درباره من",
      work: "نمونه‌کارها",
      experience: "تجربه‌ها",
      services: "خدمات",
      contact: "تماس",
      certificates: "سرتیفیکت‌ها",
      available: "آماده قبولی پروژه‌های نو",
      letsTalk: "بیایید گپ بزنیم",
    },
    hero: {
      eyebrow: "طراح گرافیک / توسعه‌دهنده وب",
      title: "طراحی ایده‌ها به تجربه‌های دیجیتال عصری",
      description:
        "طراحی و ساخت تجربه‌های دیجیتال عصری، وبسایت‌ها و رابط‌های تعاملی با تمرکز بالای زیبایی‌شناسی و مهندسی دقیق.",
      viewWork: "دیدن نمونه‌کارها",
      letsTalk: "بیایید گپ بزنیم",
      projectTag: "پروژه ۰۱",
      projectType: "طراحی وب / توسعه",
      location: "آلمان",
      languages: "دری · آلمانی · انگلیسی",
      role: "توسعه‌دهنده و طراح مستقل",
    },
    work: {
      eyebrow: "کارهای برگزیده",
      title: "پروژه‌ها و آزمایش‌ها",
      allProjects: "تمام پروژه‌ها",
    },
    about: {
      eyebrow: "درباره UrClub",
      statement:
        "طراحی و ساخت پلتفرم‌های دیجیتال مقیاس‌پذیر در نقطه‌ای که فناوری با دیزاین پیوند می‌خورد.",
      bio: "ما تیم UrClub استیم؛ یک تیم تخصصی در مهندسی نرم‌افزار، معماری وب و طراحی هویت بصری مقیم آلمان. تمرکز ما بر اجرای پروژه‌های باکیفیت تجاری، ساخت کادرهای تعاملی و ایجاد بستری مطمئن برای سرمایه‌گذاران و شرکای تجاری است.",
      basedInLabel: "مقیم",
      basedInValue: "آلمان",
      statusLabel: "وضعیت",
      statusValue: "آماده برای پروژه‌ها و سرمایه‌گذاری",
      focusLabel: "تمرکز",
      focusValue: "توسعه وب و مشارکت تجاری",
      readFull: "مشاهده مشخصات تیم",
    },
    experience: {
      eyebrow: "تجربه‌ها",
      title: "پیشینه و مهارت‌ها",
      fullTimeline: "تایم‌لاین مکمل",
      present: "فعلاً",
    },
    process: {
      eyebrow: "روش کار",
      title: "طرز کار من",
      steps: [
        {
          number: "۰۱",
          title: "کشف و شناخت",
          description:
            "فامیدن ایده، هدف‌ها، مخاطبین و نیازمندی‌های اساسی از طریق تحقیق و گفتگو.",
        },
        {
          number: "۰۲",
          title: "پلان‌گذاری",
          description:
            "تعیین مسیر بصری، ساختار صفحات و معماری تخنیکی پروژه.",
        },
        {
          number: "۰۳",
          title: "ساختن",
          description:
            "طراحی و توسعه راه‌حل با توجه به هر جزئیات.",
        },
        {
          number: "۰۴",
          title: "بهبود دادن",
          description:
            "بازبینی، تکرار و صیقل‌کاری تا رسیدن به بالاترین معیار کیفیت.",
        },
        {
          number: "۰۵",
          title: "تحویل‌دهی",
          description:
            "تحویل پروژه نهایی همراه با تمام فایل‌های سورس و محتوای آماده تولید.",
        },
      ],
    },
    services: {
      eyebrow: "خدمات",
      title: "چی کارها می‌کنم",
      allServices: "تمام خدمات",
    },
    contact: {
      eyebrow: "در تماس شوید",
      title: "بیایید باهم یک چیز\nماندگار بسازیم.",
      description:
        "ایده، پروژه یا آزمایشی در ذهن دارید؟ خوشحال می‌شوم که بشنوم.",
      cta: "شروع گفتگو",
    },
    footer: {
      role: "تیم مهندسی و نوآوری دیجیتال",
      copyright: "© ۲۰۲۶ UrClub. تمام حقوق محفوظ است.",
      imprint: "اطلاعات حقوقی",
      privacy: "حریم خصوصی",
    },
    aboutPage: {
      eyebrow: "مشخصات شخصی",
      title: "درباره من",
      subtitle: "طراح وب، توسعه‌دهنده خلاق و صنعتگر دیجیتال مقیم آلمان.",
      fullNameLabel: "نام مکمل",
      locationLabel: "موقعیت",
      locationValue: "آلمان",
      languagesLabel: "زبان‌ها",
      persianLevel: "دری — زبان مادری",
      germanLevel: "آلمانی — سطح B1",
      englishLevel: "انگلیسی — تخنیکی / کاری",
      interestsLabel: "علاقه‌مندی‌ها",
      interestsValue: "طراحی • وب • آی‌تی • هوش مصنوعی",
      downloadCV: "دانلود سی‌وی / رزومه (PDF)",
      introEyebrow: "معرفی",
      introHeadline: "ترکیب خلاقیت با تکنالوژی عصری.",
      defaultBio:
        "من محمد نظیف یوسفی استم، یک طراح گرافیک و وب مقیم آلمان. علاقه‌مندی‌های من طراحی بصری، توسعه وب، سیستم‌های کمپیوتر، هوش مصنوعی و تکنالوژی‌های عصری ره باهم پیوند می‌ته.\n\nمن از تبدیل ایده‌ها به تجربه‌های دیجیتال عملی و یادگیری مداوم ابزارها و تکنالوژی‌های نو لذت می‌برم.\n\nدر کنار طراحی، تجربه عملی در ساخت وبسایت‌ها، کار با توسعه فرانت‌اند و بک‌اند، سیستم‌های ویندوز و توسعه به کمک هوش مصنوعی دارم.",
      strengthsEyebrow: "نقاط قوت شخصی",
      strengthsList: [
        "علاقه‌مند به تکنالوژی",
        "انگیزه‌مند برای یادگیری",
        "قابل اعتماد و وقت‌شناس",
        "حل‌کننده مستقل مشکلات",
        "مسئولیت‌پذیر",
        "یادگیرنده سریع",
        "اشتیاق به کد پاک و رابط کاربری",
      ],
      capabilitiesEyebrow: "توانمندی‌ها",
      capabilitiesTitle: "دانش و ابزارهای تخصصی",
    },
    portfolioPage: {
      eyebrow: "آرشیف و بررسی پروژه‌ها",
      title: "نمونه‌کارها",
      subtitle: "مجموعه‌ای انتخاب‌شده از طراحی وب، هویت‌های بصری، رابط‌های سفارشی و پروژه‌های آزمایشی.",
      allCategory: "همه",
      emptyNotice: "هیچ پروژه‌ای در ای کتگوری پیدا نشد.",
    },
    projectDetailPage: {
      backToPortfolio: "برگشت به نمونه‌کارها",
      clientLabel: "مشتری",
      disciplineLabel: "رشته",
      yearLabel: "سال",
      liveSite: "سایت زنده",
      overviewEyebrow: "خلاصه بررسی پروژه",
      overviewTitle: "معماری پروژه و اجرای خلاقانه",
      servicesProvided: "خدمات ارائه‌شده",
      toolsUsed: "ابزارها و تکنالوژی‌ها",
      visualArchiveEyebrow: "آرشیف تصویری",
      visualArchiveTitle: "تصاویر و مواد پروژه",
      prevProject: "پروژه قبلی",
      nextProject: "پروژه بعدی",
    },
    experiencePage: {
      eyebrow: "تمرین و نقاط عطف",
      title: "تجربه و پروژه‌ها",
      subtitle: "کارهای مستقل طراحی، پروژه‌های عملی توسعه وب و یادگیری مداوم تکنالوژیکی.",
      present: "فعلاً",
      scopeLabel: "محدوده کاری و یادگیری",
      toolkitLabel: "ابزارها:",
      growingTitle: "تجربه به شکل مداوم در حال رشد اس.",
      growingDesc: "من فعالانه پروژه‌های عملی واقعی می‌سازم، دانش خوده در معماری‌های عصری وب و طراحی بصری وسعت می‌تم و آماده فرصت‌های شغلی استم.",
    },
    servicesPage: {
      eyebrow: "سفارشات و توانمندی‌ها",
      title: "خدمات",
      subtitle: "مسیر خلاقانه جامع مناسب برای برندهای بلندپرواز که معماری وب عصری و وضاحت بصری نیاز دارن.",
      investmentLabel: "سرمایه‌گذاری",
      bookService: "رزرو خدمت",
      customQuote: "قیمت سفارشی",
      inclusionsLabel: "محدوده و شمولیت‌ها",
      processEyebrow: "روند طراحی",
      processTitle: "طرز همکاری ما از کشف تا راه‌اندازی",
      phases: [
        {
          tag: "مرحله ۰۱",
          title: "کشف و استراتیژی",
          desc: "بررسی فضای رقابتی، تعریف تنش بصری اصلی و تعیین مسیر تایپوگرافی.",
        },
        {
          tag: "مرحله ۰۲",
          title: "معماری مفهومی",
          desc: "توسعه ۲ تا ۳ سیستم بصری متمایز با لوگو، قواعد شبکه، سلسله‌مراتب رنگی و نمونه‌های حروف.",
        },
        {
          tag: "مرحله ۰۳",
          title: "بهبود و مواد جانبی",
          desc: "تطبیق سیستم انتخاب‌شده بالای نقاط تماس واقعی: بسته‌بندی، صفحه‌آرایی، سربرگ و محتوای دیجیتال.",
        },
        {
          tag: "مرحله ۰۴",
          title: "رهنمود و تولید",
          desc: "تحویل کتابچه برند جامع، فایل‌های سورس آماده تولید و استقرار زنده.",
        },
      ],
    },
    contactPage: {
      eyebrow: "شروع همکاری",
      title: "تماس",
      subtitle: "لطفاً جزئیات مربوط به محدوده برند، تایم‌لاین مورد نظر و اهداف پروژه خوده در زیر بنویسید.",
      directEmail: "ایمیل مستقیم",
      studioPhone: "تلفون دفتر",
      location: "موقعیت دفتر",
      responseTitle: "تایم‌لاین سفارش و پاسخ",
      responseDesc: "درخواست‌ها معمولاً ظرف ۲۴ تا ۴۸ ساعت کاری بررسی می‌شن. اگه سفارش مناسب باشه، یک جلسه مشورتی ویدیویی ترتیب می‌تیم.",
      form: {
        nameLabel: "نام شما",
        namePlaceholder: "مثلاً: احمد رحیمی",
        emailLabel: "آدرس ایمیل",
        emailPlaceholder: "your.email@example.com",
        companyLabel: "شرکت / سازمان",
        companyPlaceholder: "اختیاری",
        serviceLabel: "خدمت مورد نیاز",
        budgetLabel: "بودجه تخمینی",
        projectUrlLabel: "آدرس پروژه / وبسایت (اختیاری)",
        projectUrlPlaceholder: "https://...",
        messageLabel: "پیام و اهداف پروژه",
        messagePlaceholder: "درباره ایده، اهداف یا چیزی که می‌خواهید بسازید برایم بگویید...",
        sendButton: "ارسال پیام",
        sendingButton: "در حال ارسال پیام...",
        successTitle: "پیام دریافت شد",
        sendAnother: "ارسال پیام دیگه",
        serviceOptions: [
          "طراحی و توسعه وبسایت",
          "طراحی رابط کاربری (UI/UX)",
          "هویت برند و لوگو",
          "پوستر و طراحی بصری",
          "موارد دیگه / پرسش عمومی",
        ],
        budgetOptions: [
          "قابل انعطاف / تعیین نشده",
          "کمتر از ۵۰۰ یورو",
          "۵۰۰ – ۱,۵۰۰ یورو",
          "۱,۵۰۰ – ۳,۰۰۰ یورو",
          "۳,۰۰۰+ یورو",
        ],
      },
    },
    certificatesPage: {
      eyebrow: "صلاحیت‌ها و اعتبارنامه‌ها",
      title: "سرتیفیکت‌ها",
      subtitle: "اعتبارنامه‌های رسمی حرفه‌ای، مدارک معماری وب و سرتیفیکت‌های تخنیکی.",
      emptyNotice: "فعلاً هیچ سرتیفیکتی نشر نشده.",
      viewCert: "دیدن",
      issuedBy: "صادرشده توسط:",
      issueDate: "تاریخ:",
      credentialId: "شناسه اعتبارنامه:",
      verifyOnline: "تأیید",
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
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  dir: "rtl",
  t: translations.fa,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fa");

  useEffect(() => {
    // Strictly Dari (Persian) per user requirement
    setLanguageState("fa");
    localStorage.setItem("site_language", "fa");
    document.documentElement.setAttribute("lang", "fa");
    document.documentElement.setAttribute("dir", "rtl");
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("site_language", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
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
