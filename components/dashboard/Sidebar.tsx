"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDashboard } from "@/lib/dashboard-context";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LayoutDashboard, Edit, Eye, Share2, LogOut, Heart } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, slug } = useDashboard();

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      try {
        await signOut(auth);
        router.push("/login");
      } catch (e) {
        console.error("Gagal keluar:", e);
      }
    }
  };

  const menuItems = [
    {
      label: "Ringkasan",
      icon: <LayoutDashboard size={18} />,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Edit Undangan",
      icon: <Edit size={18} />,
      href: "/dashboard/edit",
      active: pathname === "/dashboard/edit",
    },
    {
      label: "Lihat Undangan",
      icon: <Eye size={18} />,
      href: slug ? `/${slug}` : "#",
      target: "_blank",
      active: false,
      disabled: !slug,
    },
  ];

  const handleScrollToGenerator = (e: React.MouseEvent) => {
    if (pathname === "/dashboard") {
      e.preventDefault();
      const element = document.getElementById("link-generator");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // route to dashboard first
      router.push("/dashboard#link-generator");
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-[#110F0F] border-r border-zinc-800/60 flex flex-col justify-between px-4 py-6 select-none font-sans flex-shrink-0">
      {/* Top Section */}
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <div className="flex items-center px-3 select-none">
          <img
            src="/ENIX DESIGN LOGO wht.png"
            alt="ENIX DESIGN"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item, i) => {
            const Component = item.disabled ? "div" : Link;
            return (
              <Component
                key={i}
                href={item.href}
                target={item.target}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  item.disabled
                    ? "opacity-40 cursor-not-allowed text-zinc-500"
                    : item.active
                    ? "bg-amber-500/10 text-amber-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 cursor-pointer"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Component>
            );
          })}

          {/* Special trigger: share links */}
          <button
            onClick={handleScrollToGenerator}
            className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-all"
          >
            <Share2 size={18} />
            <span>Bagikan Link</span>
          </button>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-3">
        <div className="border-t border-zinc-800/60 my-2" />

        {/* User Info Card */}
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-900/30 border border-zinc-800/40">
            {/* Avatar Circle */}
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              {user.email ? user.email[0].toUpperCase() : "U"}
            </div>
            {/* Email info */}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-zinc-200 truncate">
                {user.displayName || "Pengantin"}
              </span>
              <span className="text-[10px] text-zinc-500 truncate">
                {user.email}
              </span>
            </div>
          </div>
        )}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400/90 hover:text-rose-300 hover:bg-rose-500/5 transition-all w-full text-left"
        >
          <LogOut size={16} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
