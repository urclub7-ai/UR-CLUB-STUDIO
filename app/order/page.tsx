import type { Metadata } from "next";
import ProjectInquiryForm from "@/components/public/ProjectInquiryForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "سفارش پروژه و پیکربندی اختصاصی | UR CLUB",
  description: "فرم تعاملی ثبت و پیکربندی پروژه وب‌سایت، اپلیکیشن موبایل، نرم‌افزار دسکتاپ و هویت بصری با صدور شناسه اختصاصی",
};

export default function OrderPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      <ProjectInquiryForm />
    </div>
  );
}
