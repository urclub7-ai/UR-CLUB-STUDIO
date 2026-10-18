"use client";

export default function AdminLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-pulse p-2">
      <div className="flex items-center justify-between pb-8 border-b border-zinc-800/80">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-zinc-800 rounded" />
          <div className="h-8 w-64 bg-zinc-800 rounded-xl" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-28 bg-zinc-800 rounded-xl" />
          <div className="h-10 w-28 bg-zinc-800 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-zinc-800 rounded" />
              <div className="h-8 w-8 bg-zinc-800 rounded-lg" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-8 w-16 bg-zinc-800 rounded" />
              <div className="h-3 w-32 bg-zinc-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
