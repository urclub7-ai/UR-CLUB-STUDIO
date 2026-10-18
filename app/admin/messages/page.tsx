import prisma from "@/lib/prisma";
import MessagesClient from "./MessagesClient";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="pb-8 border-b border-zinc-800">
        <span className="mono-tag text-xs text-zinc-400 block mb-1">Inquiries & Leads</span>
        <h1 className="text-2xl sm:text-3xl font-light text-zinc-100">Contact Messages Inbox</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review incoming client inquiries, update communication statuses, and respond to potential clients.
        </p>
      </div>

      <MessagesClient initialMessages={messages} />
    </div>
  );
}

