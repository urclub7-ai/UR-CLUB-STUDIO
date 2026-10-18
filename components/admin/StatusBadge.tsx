interface StatusBadgeProps {
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED" | "PUBLISHED" | "DRAFT" | "FEATURED" | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const s = status.toUpperCase();

  if (s === "NEW") {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#00C3FF]/15 text-[#00C3FF] border border-[#00C3FF]/35 shadow-[0_0_8px_rgba(0, 195, 255,0.25)]">
        NEW
      </span>
    );
  }

  if (s === "READ") {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#14171C] text-[#CBD5E1] border border-[rgba(255,255,255,0.08)]">
        READ
      </span>
    );
  }

  if (s === "REPLIED") {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#00C3FF]/10 text-[#00C3FF] border border-[#00C3FF]/25">
        REPLIED
      </span>
    );
  }

  if (s === "ARCHIVED") {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#14171C] text-[#8C8F96] border border-[rgba(255,255,255,0.06)]">
        ARCHIVED
      </span>
    );
  }

  if (s === "PUBLISHED" || s === "ACTIVE") {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#00C3FF]/12 text-[#00C3FF] border border-[#00C3FF]/30 shadow-[0_0_8px_rgba(0, 195, 255,0.15)]">
        PUBLISHED
      </span>
    );
  }

  if (s === "DRAFT" || s === "INACTIVE") {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#14171C] text-[#8C8F96] border border-[rgba(255,255,255,0.08)]">
        DRAFT
      </span>
    );
  }

  if (s === "FEATURED") {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#00C3FF]/20 text-[#00C3FF] border border-[#00C3FF]/45 shadow-[0_0_10px_rgba(0, 195, 255,0.3)]">
        ★ FEATURED
      </span>
    );
  }

  return (
    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#14171C] text-[#CBD5E1] border border-[rgba(255,255,255,0.08)]">
      {status}
    </span>
  );
}
