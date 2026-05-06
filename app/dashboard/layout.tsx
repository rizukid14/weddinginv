"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardProvider, useDashboard } from "@/lib/dashboard-context";
import Sidebar from "@/components/dashboard/Sidebar";
import { Loader2 } from "lucide-react";

function ProtectedDashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useDashboard();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0B0B] text-zinc-100 flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
            Memeriksa Keamanan...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Don't flash layout if redirecting
  }

  return (
    <div className="min-h-screen bg-[#0D0B0B] text-zinc-100 font-sans flex overflow-hidden">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content viewport */}
      <main className="flex-1 min-h-screen overflow-y-auto px-6 md:px-10 py-8 relative">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <ProtectedDashboardShell>{children}</ProtectedDashboardShell>
    </DashboardProvider>
  );
}
