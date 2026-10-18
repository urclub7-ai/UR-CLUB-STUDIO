import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding showcase websites & brand assets...");

  // 1. Showcase Websites
  const websiteCount = await prisma.showcaseWebsite.count();
  if (websiteCount === 0) {
    await prisma.showcaseWebsite.createMany({
      data: [
        {
          name: "LEVI Smart Web Business Card",
          name_fa: "کارت ویزیت انترنتی صفحه (LEVI)",
          url: "https://urclub.vercel.app/",
          displayOrder: 1,
          active: true,
        },
        {
          name: "Ideology Mahdaviyat",
          name_fa: "ایدئولوژی مهدویت",
          url: "https://www.ideologymahdaviyat.org/",
          displayOrder: 2,
          active: true,
        },
        {
          name: "Novin Pay Financial Portal",
          name_fa: "سامانه مالی نوین‌پِی",
          url: "/showcase/novin-pay/index.html",
          displayOrder: 3,
          active: true,
        },
        {
          name: "Aura Cloud English",
          name_fa: "Aura Cloud (انگلیسی)",
          url: "/showcase/aura-tech/index.html",
          displayOrder: 4,
          active: true,
        },
        {
          name: "Azimian Market",
          name_fa: "عظیمیان مارکت",
          url: "/showcase/azimian-markt/index.html",
          displayOrder: 5,
          active: true,
        },
      ],
    });
    console.log("✓ Seeded 5 showcase websites");
  }

  // 2. Brand Assets (Logos & Posters)
  const assetCount = await prisma.brandAsset.count();
  if (assetCount === 0) {
    await prisma.brandAsset.createMany({
      data: [
        {
          type: "logo",
          title: "AriaTech Cloud Solutions",
          title_fa: "لوگوی فناوری آریا تک",
          category: "Cloud & Software",
          category_fa: "فناوری و نرم‌افزار",
          description: "Minimalist cloud architecture layer emblem.",
          description_fa: "طراحی مینیمال برای پلتفرم‌های ابری و هوش مصنوعی.",
          image: "/showcase/designs/logo_ariatech.png",
          displayOrder: 1,
          active: true,
        },
        {
          type: "logo",
          title: "Royal Coffee & Roastery",
          title_fa: "لوگوی کافه رویال",
          category: "Cafe & Restaurant",
          category_fa: "کافه و رستورانت",
          description: "Warm gold and espresso coffee emblem.",
          description_fa: "نشان‌واره اصیل قهوه با تایپوگرافی طلایی و گرم.",
          image: "/showcase/designs/logo_royalcafe.png",
          displayOrder: 2,
          active: true,
        },
        {
          type: "logo",
          title: "Saze Architecture Studio",
          title_fa: "لوگوی مهندسی سازه",
          category: "Architecture & Design",
          category_fa: "معماری و ساختمانی",
          description: "Isometric geometric cube symbol.",
          description_fa: "طراحی نماد ایزومتریک مکعبی برای شرکت‌های ساختمانی.",
          image: "/showcase/designs/logo_saze.png",
          displayOrder: 3,
          active: true,
        },
        {
          type: "logo",
          title: "Pishro Currency Exchange",
          title_fa: "لوگوی صرافی پیشرو",
          category: "Fintech & Remittance",
          category_fa: "صرافی و فین‌تک",
          description: "Dynamic dual-arrow currency exchange loop.",
          description_fa: "طراحی نماد چرخه تبادل و انتقال سریع ارزها.",
          image: "/showcase/designs/logo_pishro.png",
          displayOrder: 4,
          active: true,
        },
        {
          type: "poster",
          title: "Shefa 24/7 Pharmacy Poster",
          title_fa: "پوستر دواخانه شفا",
          category: "Promotional Poster",
          category_fa: "پوستر تبلیغاتی",
          description: "24/7 medicine delivery and doctor consultation.",
          description_fa: "معرفی خدمات ادویه، مشاوره و تحویل فوری ۲۴ ساعته.",
          image: "/showcase/designs/poster_pharmacy.png",
          displayOrder: 5,
          active: true,
        },
        {
          type: "poster",
          title: "Palace Cafe & Lounge Poster",
          title_fa: "پوستر کافه پالاس",
          category: "Promotional Poster",
          category_fa: "پوستر تبلیغاتی",
          description: "Specialty roast, fresh pastries, and workspace.",
          description_fa: "معرفی قهوه دمی تخصصی، دسرها و فضای کار اختصاصی.",
          image: "/showcase/designs/poster_cafe_v2.png",
          displayOrder: 6,
          active: true,
        },
      ],
    });
    console.log("✓ Seeded 6 brand assets");
  }
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
