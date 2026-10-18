import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  let unreadMessagesCount = 0;
  try {
    unreadMessagesCount = session
      ? await prisma.contactMessage.count({
          where: { status: "NEW" },
        })
      : 0;
  } catch (e) {
    unreadMessagesCount = 0;
  }

  if (!session) {
    return <div className="min-h-screen bg-[#08090B] text-[#F8FAFC]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F8FAFC] flex">
      {/* Sidebar */}
      <AdminSidebar unreadCount={unreadMessagesCount} />

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader adminName={session.name} adminEmail={session.email} />
        <main className="p-8 lg:p-12 flex-1 overflow-y-auto bg-[#08090B]">{children}</main>
      </div>
    </div>
  );
}
