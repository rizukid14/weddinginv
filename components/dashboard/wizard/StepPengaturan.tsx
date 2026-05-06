"use client";

import React, { useState } from "react";
import { WeddingData } from "@/types/wedding";
import { useDashboard } from "@/lib/dashboard-context";
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { deleteUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Shield, Link2, Copy, Check, Trash2, AlertTriangle } from "lucide-react";

interface StepProps {
  data: Partial<WeddingData>;
  update: (updates: Partial<WeddingData>) => void;
}

export default function StepPengaturan({ data, update }: StepProps) {
  const router = useRouter();
  const { slug } = useDashboard();
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const baseUrl = typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}` : "";
  const invitationUrl = `${baseUrl}/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteInvitation = async () => {
    const doubleConfirm = confirm(
      "PERINGATAN KERAS:\nTindakan ini akan menghapus seluruh data undangan pernikahan Anda beserta seluruh ucapan doa dan data RSVP dari tamu permanen di Cloud Firestore.\n\nApakah Anda yakin ingin melanjutkan?"
    );
    if (!doubleConfirm) return;

    const finalConfirm = confirm(
      "Apakah Anda benar-benar yakin? Tindakan ini bersifat final dan tidak dapat dibatalkan dengan cara apa pun."
    );
    if (!finalConfirm) return;

    setIsDeleting(true);

    try {
      // 1. Delete weddings/{slug} document
      await deleteDoc(doc(db, "weddings", slug));

      // 2. Delete users/{uid} document if needed (optional, let's keep authentication account or delete if wished)
      const user = auth.currentUser;
      if (user) {
        await deleteDoc(doc(db, "users", user.uid));
        // Delete authentication account too
        await deleteUser(user);
      }

      alert("Akun dan Undangan Pernikahan Anda berhasil dihapus sepenuhnya.");
      router.push("/register");
    } catch (e) {
      console.error("Gagal menghapus akun pengantin:", e);
      alert("Gagal menghapus data. Silakan coba bersihkan sesi atau muat ulang.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in font-sans">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-50">Pengaturan Undangan</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Kelola proteksi keamanan kata sandi, tautan URL, dan hapus akun undangan Anda.
        </p>
      </div>

      {/* URL Share Link */}
      <div className="flex flex-col gap-3 bg-zinc-900/10 border border-zinc-800/40 p-5 rounded-2xl select-none">
        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold flex items-center gap-1.5 border-b border-zinc-800/80 pb-3 mb-1">
          <Link2 size={14} /> Tautan URL Undangan Anda
        </span>
        <div className="relative flex items-center">
          <div className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-3 text-xs text-amber-200/90 font-mono select-all truncate pr-12">
            {invitationUrl}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 text-zinc-500 hover:text-amber-500 p-1.5 rounded-lg transition-colors"
          >
            {copied ? (
              <Check size={16} className="text-emerald-500" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Password Gate Protection */}
      <div className="flex flex-col gap-4 bg-zinc-900/10 border border-zinc-800/40 p-5 rounded-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-2 select-none">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-amber-500" />
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
              Aktifkan Kata Sandi Privat (Password Gate)
            </span>
          </div>
          {/* Toggle Switch */}
          <button
            type="button"
            onClick={() => update({ passwordEnabled: !data.passwordEnabled })}
            className={`w-11 h-6 rounded-full relative p-1 transition-colors duration-200 focus:outline-none ${
              data.passwordEnabled ? "bg-amber-500" : "bg-zinc-800"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#110F0F] transition-transform duration-200 ${
                data.passwordEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {data.passwordEnabled && (
          <div className="flex flex-col gap-2 animate-fade-in">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-1">
              Kata Sandi Pengaman (Min. 6 karakter)
            </label>
            <input
              type="text"
              value={data.password || ""}
              onChange={(e) => update({ password: e.target.value })}
              placeholder="rizki2025"
              className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
            <p className="text-[10px] text-zinc-500 leading-normal mt-1">
              Tamu yang mengakses undangan Anda diwajibkan untuk memasukkan sandi di atas sebelum dapat melihat isi konten undangan. Bagikan sandi ini bersamaan dengan URL link personal.
            </p>
          </div>
        )}
      </div>

      {/* Template Selector Section */}
      <div className="flex flex-col gap-4">
        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold border-b border-zinc-800/80 pb-1.5 block select-none">
          🎨 Pilih Desain Template Undangan
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Option 1: Floral */}
          <div className="border-2 border-amber-500 bg-[#221F1F]/20 rounded-xl p-4 flex flex-col gap-1.5 relative overflow-hidden select-none shadow-lg shadow-amber-500/5">
            <span className="text-xs font-bold text-zinc-100">Floral Elegant</span>
            <span className="text-[10px] text-zinc-400">Palet krem lembut dan ornamen bunga mawar klasik premium.</span>
            <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center">
              <Check size={10} className="text-zinc-950 stroke-[3]" />
            </div>
          </div>

          {/* Option 2: Brush */}
          <div className="border border-zinc-800/80 bg-zinc-900/10 rounded-xl p-4 flex flex-col gap-1.5 relative overflow-hidden opacity-50 select-none cursor-not-allowed">
            <span className="text-xs font-bold text-zinc-400">Brush Artistic</span>
            <span className="text-[10px] text-zinc-500">Sentuhan sapuan kuas kanvas modern bernuansa abu estetis.</span>
            <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
              Segera
            </span>
          </div>

          {/* Option 3: Modern */}
          <div className="border border-zinc-800/80 bg-zinc-900/10 rounded-xl p-4 flex flex-col gap-1.5 relative overflow-hidden opacity-50 select-none cursor-not-allowed">
            <span className="text-xs font-bold text-zinc-400">Modern Minimalist</span>
            <span className="text-[10px] text-zinc-500">Tata letak serif geometris bersih bergaya editorial majalah.</span>
            <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
              Segera
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="border border-rose-950 bg-rose-950/5 p-6 rounded-2xl flex flex-col gap-4 mt-4 select-none">
        <div className="flex items-center gap-2.5 text-rose-400 border-b border-rose-950/60 pb-3">
          <AlertTriangle size={18} />
          <h3 className="text-sm font-bold uppercase tracking-wider">Zona Berbahaya</h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-rose-200">Hapus Akun &amp; Undangan</span>
            <span className="text-[10px] text-rose-300/60 max-w-md leading-relaxed">
              Ini akan melenyapkan database undangan pernikahan serta profil login Anda selamanya. Tamu tidak akan dapat lagi membuka tautan undangan Anda.
            </span>
          </div>
          <button
            type="button"
            onClick={handleDeleteInvitation}
            disabled={isDeleting}
            className="bg-transparent hover:bg-rose-500/15 border border-rose-800 hover:border-rose-500 text-rose-400 hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 self-start sm:self-center"
          >
            <Trash2 size={14} />
            <span>{isDeleting ? "Menghapus..." : "Hapus Akun"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
