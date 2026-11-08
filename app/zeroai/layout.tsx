import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#090A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Zero AI — On-Device Intelligence for iPhone | UR CLUB STUDIO",
  description:
    "Zero AI on-device neural intelligence agent for iOS. Direct OTA enterprise installation, zero cloud LLM latency, 100% private and hardware-locked security.",
  keywords: [
    "Zero AI",
    "UR CLUB",
    "iOS OTA",
    "On-device AI",
    "iPhone AI agent",
    "Private AI",
    "Offline LLM",
  ],
  openGraph: {
    title: "Zero AI — On-Device Intelligence for iPhone",
    description:
      "Exclusive direct OTA download portal for Zero AI. Pure offline execution and hardware-locked private intelligence.",
    url: "https://urclub.vercel.app/zeroai",
    siteName: "UR CLUB STUDIO",
    images: [
      {
        url: "https://urclub.vercel.app/zeroai/icon-512.png",
        width: 512,
        height: 512,
        alt: "Zero AI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/zeroai/icon-57.png",
    apple: "/zeroai/icon-512.png",
  },
};

export default function ZeroAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
