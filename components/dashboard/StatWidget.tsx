import React from "react";

interface StatWidgetProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: "emerald" | "amber" | "rose" | "blue";
}

export default function StatWidget({ label, value, icon, color }: StatWidgetProps) {
  const colorSchemes = {
    emerald: {
      bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      iconContainer: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    amber: {
      bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      iconContainer: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    rose: {
      bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
      iconContainer: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    },
    blue: {
      bg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      iconContainer: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
  };

  const scheme = colorSchemes[color];

  return (
    <div className="bg-[#181616] border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between gap-4 select-none">
      <div className="flex flex-col">
        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
          {label}
        </span>
        <span className="text-3xl font-bold text-zinc-50 mt-1">
          {value}
        </span>
      </div>
      <div className={`w-11 h-11 rounded-full border flex items-center justify-center ${scheme.iconContainer}`}>
        {icon}
      </div>
    </div>
  );
}
