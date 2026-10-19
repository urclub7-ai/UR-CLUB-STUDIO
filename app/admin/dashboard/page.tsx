import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FolderKanban,
  Palette,
  Globe,
  Inbox,
  ArrowUpRight,
  Plus,
  Monitor,
  Users,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/utils";
import MotionSection from "@/components/public/MotionSection";
import { getTeamMembers } from "@/lib/actions/team-actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let totalProjects = 0;
  let publishedProjects = 0;
  let totalBrandAssets = 6;
  let totalWebsites = 5;
  let unreadMessagesCount = 0;
  let recentMessages: any[] = [];
  let teamMembersList: any[] = [];

  try {
    teamMembersList = await getTeamMembers();
  } catch (e) {
    teamMembersList = [];
  }

  try {
    const [
      dbTotalProjects,
      dbPublishedProjects,
      dbTotalBrandAssets,
      dbTotalWebsites,
      dbUnreadMessagesCount,
      dbRecentMessages,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { published: true } }),
      prisma.brandAsset.count(),
      prisma.showcaseWebsite.count(),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);
    totalProjects = dbTotalProjects;
    publishedProjects = dbPublishedProjects;
    totalBrandAssets = dbTotalBrandAssets;
    totalWebsites = dbTotalWebsites;
    unreadMessagesCount = dbUnreadMessagesCount;
    recentMessages = dbRecentMessages;
  } catch (e) {
    console.warn("Dashboard database offline fallback active:", e);
  }

  const statsCards = [
    {
      title: "Team Members",
      persianTitle: "اعضای تیم UR CLUB",
      count: teamMembersList.length,
      label: "اعضای فعال و ثبت‌شده",
      href: "/admin/team",
      icon: Users,
    },
    {
      title: "Portfolio Projects",
      persianTitle: "پروژه‌ها و نمونه‌کارها",
      count: `${publishedProjects} / ${totalProjects}`,
      label: "منتشر شده / کل پروژه‌ها",
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      title: "Logos & Posters",
      persianTitle: "لوگوها و هویت بصری",
      count: totalBrandAssets,
      label: "نشان‌واره‌ها و پوسترهای آپلودشده",
      href: "/admin/logos",
      icon: Palette,
    },
    {
      title: "Live Frame Websites",
      persianTitle: "وب‌سایت‌های آنلاین (کادر تعاملی)",
      count: totalWebsites,
      label: "سایت‌های فعال در کادر اسکرول",
      href: "/admin/websites",
      icon: Globe,
    },
    {
      title: "Incoming Inquiries",
      persianTitle: "پیام‌های دریافتی استعلام",
      count: unreadMessagesCount,
      label: "پیام‌های جدید بررسی نشده",
      href: "/admin/messages",
      icon: Inbox,
      isUnread: unreadMessagesCount > 0,
    },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto select-none">
      {/* Top Welcome Header */}
      <MotionSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[rgba(255,255,255,0.08)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]" />
              <span className="mono-tag text-xs text-[#00D2FF] font-mono uppercase tracking-wider">
                UR CLUB Digital Platform
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              پنل مدیریت و کنترل بخش‌های سایت
            </h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-normal">
              خوش آمدید. از این بخش می‌توانید پروژه‌ها، لوگوها، پوسترهای گرافیکی و وب‌سایت‌های کادر آنلاین را ویرایش یا آپلود کنید.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/projects/new"
              className="px-4 py-2.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)] flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>پروژه جدید</span>
            </Link>
            <Link
              href="/admin/logos"
              className="px-4 py-2.5 rounded-xl bg-[#14171C] border border-[#00D2FF]/30 text-white hover:border-[#00D2FF] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>آپلود لوگو/پوستر</span>
            </Link>
            <Link
              href="/admin/websites"
              className="px-4 py-2.5 rounded-xl bg-[#14171C] border border-[#00D2FF]/30 text-white hover:border-[#00D2FF] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>وب‌سایت کادر آنلاین</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="p-2.5 rounded-xl bg-[#0D0F12] border border-[rgba(255,255,255,0.08)] text-[#CBD5E1] hover:text-white hover:border-[#00D2FF]/40 text-xs transition-all flex items-center gap-1.5"
              title="مشاهده سایت اصلی"
            >
              <ArrowUpRight className="w-4 h-4 text-[#00D2FF]" />
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* Stats Grid */}
      <MotionSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                href={stat.href}
                className="p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 hover:border-[#00C3FF]/40 hover:bg-[#14171C]/70 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0, 195, 255,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold text-[#F8FAFC] block group-hover:text-white transition-colors">
                      {stat.persianTitle}
                    </span>
                    <span className="mono-tag text-[10.5px] text-[#94A3B8] font-mono">
                      {stat.title}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] group-hover:border-[#00C3FF]/40 group-hover:bg-[#00C3FF]/10 text-[#00C3FF] transition-all duration-200 shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="pt-2">
                  <span
                    className={`text-3xl font-semibold tracking-tight block ${
                      stat.isUnread ? "text-[#00C3FF] drop-shadow-[0_0_8px_rgba(0, 195, 255,0.5)]" : "text-[#F8FAFC]"
                    }`}
                  >
                    {stat.count}
                  </span>
                  <span className="text-xs text-[#94A3B8] mt-1 block font-mono">
                    {stat.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </MotionSection>

      {/* Recent Messages Inbox */}
      <MotionSection>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.06)]">
            <div>
              <span className="mono-tag text-[10.5px] text-[#00C3FF] font-mono block mb-1">
                CONTACT INQUIRIES
              </span>
              <h3 className="text-lg font-semibold text-[#F8FAFC]">
                آخرین پیام‌های دریافتی (Recent Inquiries)
              </h3>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs uppercase tracking-wider font-semibold text-[#CBD5E1] hover:text-[#00C3FF] transition-colors flex items-center gap-1.5"
            >
              <span>مشاهده همه ({unreadMessagesCount} جدید)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00C3FF]" />
            </Link>
          </div>

          {recentMessages.length > 0 ? (
            <div className="divide-y divide-[rgba(255,255,255,0.06)]">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <StatusBadge status={msg.status} />
                      <span className="text-sm font-semibold text-[#F8FAFC]">{msg.name}</span>
                      <span className="text-xs text-[#94A3B8] font-mono">({msg.email})</span>
                    </div>
                    <p className="text-xs text-[#CBD5E1] line-clamp-1 max-w-xl font-normal leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#94A3B8] flex-shrink-0">
                    <span className="font-mono">{formatDate(msg.createdAt)}</span>
                    <Link
                      href="/admin/messages"
                      className="px-3 py-1.5 rounded-lg bg-[#14171C] border border-[rgba(255,255,255,0.08)] hover:border-[#00C3FF]/40 text-[#CBD5E1] hover:text-white transition-colors"
                    >
                      مدیریت پیام
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#94A3B8] py-6 text-center">
              هنوز پیامی از فرم تماس ارسال نشده است.
            </p>
          )}
        </div>
      </MotionSection>
    </div>
  );
}
