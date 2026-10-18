"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransitionBar from "./PageTransitionBar";
import IntroPreloader from "./IntroPreloader";

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
  designerName: string;
  availabilityStatus: boolean;
  tagline?: string;
  email?: string;
  location?: string;
  copyrightText?: string;
  socialLinks?: any[];
}

export default function PublicLayoutWrapper({
  children,
  designerName,
  availabilityStatus,
  tagline,
  email,
  location,
  copyrightText,
  socialLinks,
}: PublicLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <IntroPreloader />
      <PageTransitionBar />
      <Navbar
        designerName={designerName}
        availabilityStatus={availabilityStatus}
      />
      <main className="flex-grow">{children}</main>
      <Footer
        designerName={designerName}
        tagline={tagline}
        email={email}
        location={location}
        copyrightText={copyrightText}
        socialLinks={socialLinks}
      />
    </>
  );
}

