"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, CheckCircle2, MessageSquare, Reply, Archive, Eye } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";
import { formatDate } from "@/lib/utils";
import { updateMessageStatus, deleteMessage } from "@/lib/actions/message-actions";
import { EDITORIAL_EASE } from "@/lib/motion";

type StatusType = "NEW" | "READ" | "REPLIED" | "ARCHIVED";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
  status: string;
  createdAt: Date | string;
}

export default function MessagesClient({
  initialMessages,
}: {
  initialMessages: MessageItem[];
}) {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  const filtered = messages.filter((m) => {
    if (activeFilter === "ALL") return true;
    return m.status === activeFilter;
  });

  const handleStatusChange = async (id: string, newStatus: StatusType) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    await updateMessageStatus(id, newStatus);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await deleteMessage(deleteId);
    setMessages((prev) => prev.filter((m) => m.id !== deleteId));
    if (selectedMessage?.id === deleteId) {
      setSelectedMessage(null);
    }
    setIsDeleting(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["ALL", "NEW", "READ", "REPLIED", "ARCHIVED"].map((tab) => {
          const count =
            tab === "ALL"
              ? messages.length
              : messages.filter((m) => m.status === tab).length;

          return (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`mono-tag text-xs px-4 py-2 rounded-full border transition-colors flex items-center gap-2 ${
                activeFilter === tab
                  ? "bg-zinc-100 text-zinc-950 border-zinc-100 font-semibold shadow-sm"
                  : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeFilter === tab ? "bg-zinc-900 text-zinc-100" : "bg-zinc-850 text-zinc-400"
                }`}
              >
                {count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Messages List & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inbox List */}
        <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
          {filtered.length > 0 ? (
            <div className="divide-y divide-zinc-900 max-h-[700px] overflow-y-auto">
              <AnimatePresence>
                {filtered.map((msg, idx) => {
                  const isSelected = selectedMessage?.id === msg.id;

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                      transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.2), ease: EDITORIAL_EASE }}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (msg.status === "NEW") {
                          handleStatusChange(msg.id, "READ");
                        }
                      }}
                      className={`p-5 cursor-pointer transition-colors space-y-2 select-none ${
                        isSelected
                          ? "bg-zinc-900 border-l-2 border-zinc-100"
                          : "hover:bg-zinc-900/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={msg.status} />
                          <span className="text-sm font-semibold text-zinc-100">{msg.name}</span>
                        </div>
                        <span className="mono-tag text-[10px] text-zinc-500">
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span>{msg.email}</span>
                        {msg.company && <span>• {msg.company}</span>}
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 font-light">
                        {msg.message}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-zinc-500">
              No inquiries found in this category.
            </div>
          )}
        </div>

        {/* Right Column: Active Message Inspector */}
        <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedMessage.status} />
                    <span className="mono-tag text-xs text-zinc-500">
                      Received: {formatDate(selectedMessage.createdAt)}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1, color: "#f87171" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDeleteId(selectedMessage.id)}
                    className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:bg-red-500/10 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>

                <div>
                  <h3 className="text-xl font-light text-zinc-100">{selectedMessage.name}</h3>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-xs text-zinc-400 font-mono hover:text-zinc-200 transition-colors"
                  >
                    {selectedMessage.email}
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-850 text-xs">
                <div>
                  <span className="mono-tag text-zinc-500 text-[10px] block">Company</span>
                  <span className="text-zinc-200 font-medium">
                    {selectedMessage.company || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="mono-tag text-zinc-500 text-[10px] block">Service Scope</span>
                  <span className="text-zinc-200 font-medium">
                    {selectedMessage.service || "General Commission"}
                  </span>
                </div>
                <div className="col-span-2 pt-2 border-t border-zinc-850">
                  <span className="mono-tag text-zinc-500 text-[10px] block">Estimated Budget</span>
                  <span className="text-zinc-200 font-medium">
                    {selectedMessage.budget || "Flexible Scope"}
                  </span>
                </div>
              </div>

              <div>
                <span className="mono-tag text-[10px] text-zinc-500 block mb-2">Message Body</span>
                <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-850 text-xs text-zinc-300 font-light leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status Update Buttons & Reply CTA */}
              <div className="pt-4 border-t border-zinc-900 space-y-4">
                <span className="mono-tag text-[10px] text-zinc-500 block">Update Status</span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedMessage.id, "NEW")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 hover:text-white"
                  >
                    Mark as New
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedMessage.id, "READ")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 hover:text-white"
                  >
                    Mark as Read
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedMessage.id, "REPLIED")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-purple-400 hover:bg-purple-500/10"
                  >
                    Mark as Replied
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedMessage.id, "ARCHIVED")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-500 hover:text-zinc-300"
                  >
                    Archive
                  </button>
                </div>

                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                    `Re: Design Inquiry - ${selectedMessage.service || "Brand Collaboration"}`
                  )}`}
                  onClick={() => handleStatusChange(selectedMessage.id, "REPLIED")}
                  className="w-full py-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Reply className="w-4 h-4" />
                  <span>Compose Email Reply</span>
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-16 text-center text-xs text-zinc-500 space-y-2"
            >
              <MessageSquare className="w-8 h-8 mx-auto text-zinc-700" />
              <p>Select an inquiry from the inbox to inspect details and respond.</p>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete Contact Inquiry"
      />
    </div>
  );
}

