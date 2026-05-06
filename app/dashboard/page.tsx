"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "@/lib/dashboard-context";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RSVPEntry } from "@/types/wedding";
import StatWidget from "@/components/dashboard/StatWidget";
import { 
  UserCheck, 
  UserX, 
  HelpCircle, 
  Users, 
  Share2, 
  MessageSquare, 
  Trash2, 
  Copy, 
  Check, 
  Download, 
  ExternalLink,
  MessageCircle,
  Loader2
} from "lucide-react";

export default function DashboardOverview() {
  const { slug, loading: contextLoading } = useDashboard();
  const [wishes, setWishes] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ hadir: 0, tidakHadir: 0, mungkin: 0, totalPorsi: 0 });

  // Single invitation link generator state
  const [guestName, setGuestName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Bulk link generator state
  const [bulkNames, setBulkNames] = useState("");
  const [generatedBulk, setGeneratedBulk] = useState<{ name: string; url: string }[]>([]);
  const [copiedBulkIndex, setCopiedBulkIndex] = useState<number | null>(null);

  // Real-time Firestore sync for RSVPs
  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const rsvpRef = collection(db, "weddings", slug, "rsvp");
    const unsubscribe = onSnapshot(rsvpRef, (snapshot) => {
      const list: RSVPEntry[] = [];
      let counts = { hadir: 0, tidakHadir: 0, mungkin: 0, totalPorsi: 0 };

      snapshot.forEach((docSnap) => {
        const item = { id: docSnap.id, ...docSnap.data() } as RSVPEntry;
        list.push(item);

        // Normalize state values (accept both snake_case or standard spelling)
        if (item.attendance === "hadir") {
          counts.hadir += 1;
          counts.totalPorsi += Number(item.guestCount || 1);
        } else if (item.attendance === "mungkin") {
          counts.mungkin += 1;
        } else {
          counts.tidakHadir += 1;
        }
      });

      // Sort by creation time (newest first)
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setWishes(list);
      setStats(counts);
      setLoading(false);
    }, (err) => {
      console.error("Gagal mendengarkan data RSVP:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slug]);

  // Handle single guest link generation
  const handleGenerateLink = () => {
    if (!guestName.trim()) return;
    const cleanName = encodeURIComponent(guestName.trim());
    const baseUrl = typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}` : "";
    const url = `${baseUrl}/${slug}?to=${cleanName}`;
    setGeneratedLink(url);
    setCopiedLink(false);
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Handle bulk links generation
  const handleGenerateBulk = () => {
    if (!bulkNames.trim()) return;
    const namesArray = bulkNames
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    const baseUrl = typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}` : "";
    const list = namesArray.map((name) => ({
      name,
      url: `${baseUrl}/${slug}?to=${encodeURIComponent(name)}`,
    }));

    setGeneratedBulk(list);
    setCopiedBulkIndex(null);
  };

  const handleCopyBulkItem = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedBulkIndex(index);
    setTimeout(() => setCopiedBulkIndex(null), 2000);
  };

  // Delete RSVP wish
  const handleDeleteWish = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ucapan dan data kehadiran tamu ini?")) return;
    try {
      await deleteDoc(doc(db, "weddings", slug, "rsvp", id));
    } catch (e) {
      console.error("Gagal menghapus ucapan:", e);
      alert("Gagal menghapus ucapan dari database.");
    }
  };

  // Client side CSV exporter
  const handleExportCSV = () => {
    if (wishes.length === 0) {
      alert("Belum ada data untuk diekspor");
      return;
    }

    const headers = ["No", "Nama Tamu", "Kehadiran", "Jumlah Tamu/Porsi", "Pesan Doa", "Tanggal Konfirmasi"];
    const rows = wishes.map((item, idx) => [
      idx + 1,
      `"${item.guestName.replace(/"/g, '""')}"`,
      item.attendance === "hadir" ? "Hadir" : item.attendance === "mungkin" ? "Mungkin" : "Berhalangan",
      item.attendance === "hadir" ? item.guestCount : 0,
      `"${(item.message || "").replace(/"/g, '""')}"`,
      new Date(item.createdAt).toLocaleString("id-ID"),
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `RSVP_${slug}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWaShareText = (name: string, url: string) => {
    const text = `Kepada Yth. Bapak/Ibu/Saudara/i *${name}*,

Dengan penuh kebahagiaan, kami mengundang Anda untuk menghadiri acara pernikahan kami.

Detail undangan digital Anda dapat diakses melalui tautan di bawah ini:
👉 ${url}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.

Terima kasih.`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  if (contextLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-3 text-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-sm text-zinc-400">Menyelaraskan profil undangan Anda...</p>
      </div>
    );
  }

  if (!slug) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center max-w-md mx-auto py-12 px-4 select-none">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-2 text-xl font-bold">
          !
        </div>
        <h2 className="text-lg font-bold text-zinc-50">Profil Undangan Tidak Ditemukan</h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Akun Anda berhasil terdaftar, tetapi database gagal membuat profil undangan pernikahan (seeding) otomatis karena masalah aturan database sebelumnya.
        </p>
        <p className="text-xs text-amber-400/90 leading-relaxed font-semibold">
          Solusi: Silakan klik tombol di bawah untuk keluar dan mendaftarkan ulang slug Anda. Aturan keamanan Firestore saat ini sudah 100% pulih dan normal!
        </p>
        <button
          onClick={async () => {
            const { signOut } = await import("firebase/auth");
            const { auth } = await import("@/lib/firebase");
            await signOut(auth);
            window.location.href = "/register";
          }}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-all mt-2 active:scale-95"
        >
          Daftar Ulang Sekarang
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-3 text-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-sm text-zinc-400">Memuat ringkasan RSVP...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 select-none font-sans pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium text-amber-50">
            Ringkasan Undangan
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            ID Undangan: <span className="text-amber-500 font-semibold">{slug}</span>
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 hover:border-zinc-600 font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 self-start transition-colors duration-200"
        >
          <Download size={14} />
          <span>Ekspor CSV</span>
        </button>
      </div>

      {/* Analytics Widgets Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatWidget
          label="Konfirmasi Hadir"
          value={stats.hadir}
          icon={<UserCheck size={18} />}
          color="emerald"
        />
        <StatWidget
          label="Mungkin Hadir"
          value={stats.mungkin}
          icon={<HelpCircle size={18} />}
          color="amber"
        />
        <StatWidget
          label="Berhalangan"
          value={stats.tidakHadir}
          icon={<UserX size={18} />}
          color="rose"
        />
        <StatWidget
          label="Total Porsi (Pax)"
          value={stats.totalPorsi}
          icon={<Users size={18} />}
          color="blue"
        />
      </div>

      {/* Links Generator Component */}
      <div id="link-generator" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Single Link Creator */}
        <div className="bg-[#181616] border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
              <Share2 size={15} /> Pembuat Link Personal
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Buat link personal agar nama tamu tampil di layar pembuka undangan.
            </p>
            <div className="flex gap-3 mt-4">
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Ketikkan Nama Tamu (misal: Pak Hendra Wijaya)"
                className="flex-grow bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleGenerateLink()}
              />
              <button
                onClick={handleGenerateLink}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs px-5 rounded-lg uppercase tracking-wider transition-colors"
              >
                Buat
              </button>
            </div>
          </div>

          {generatedLink && (
            <div className="mt-5 bg-[#221F1F] border border-zinc-800 p-4 rounded-xl flex flex-col gap-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                  Link Undangan
                </span>
                <span className="text-xs text-amber-500 font-medium">
                  {guestName}
                </span>
              </div>
              <p className="font-mono text-xs text-zinc-300 bg-zinc-900 px-3 py-2 rounded-lg truncate select-all">
                {generatedLink}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-grow bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Salin Link</span>
                    </>
                  )}
                </button>
                <a
                  href={getWaShareText(guestName, generatedLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 border border-emerald-500/20 transition-all"
                >
                  <MessageCircle size={14} />
                  <span>Kirim WA</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Link Creator */}
        <div className="bg-[#181616] border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
              <Users size={15} /> Pembuat Link Massal (Bulk)
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Ketik daftar nama tamu (satu nama per baris) untuk membuat banyak link sekaligus.
            </p>
            <textarea
              rows={2}
              value={bulkNames}
              onChange={(e) => setBulkNames(e.target.value)}
              placeholder="Joni Walker&#10;Pak Budi Santoso&#10;Keluarga Dr. Rian"
              className="w-full mt-3 bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none transition-colors resize-none"
            />
            <button
              onClick={handleGenerateBulk}
              className="w-full mt-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:border-zinc-600 font-semibold text-xs py-2.5 rounded-lg uppercase tracking-wider transition-colors"
            >
              Generate Semua Link
            </button>
          </div>

          {generatedBulk.length > 0 && (
            <div className="mt-4 bg-[#221F1F] border border-zinc-800 p-3 rounded-xl max-h-44 overflow-y-auto flex flex-col gap-2">
              {generatedBulk.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs border-b border-zinc-800/60 pb-2 last:border-none last:pb-0">
                  <span className="font-semibold text-zinc-200 truncate pr-2 flex-1">
                    {item.name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyBulkItem(item.url, idx)}
                      className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400 hover:text-zinc-100 font-semibold"
                    >
                      {copiedBulkIndex === idx ? "✓ Tersalin" : "Salin"}
                    </button>
                    <a
                      href={getWaShareText(item.name, item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-emerald-500/10 px-2 py-1 rounded text-emerald-400 hover:bg-emerald-500/20 font-semibold"
                    >
                      WA
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RSVP Prayers Management Table */}
      <div className="bg-[#181616] border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800/60 flex items-center gap-2">
          <MessageSquare size={16} className="text-amber-500" />
          <h3 className="text-sm font-semibold text-zinc-100">
            Daftar Doa Restu &amp; RSVP ({wishes.length})
          </h3>
        </div>

        {/* Wishes Table Content */}
        {wishes.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center gap-2 text-center text-zinc-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-zinc-600 animate-pulse"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <p className="text-sm font-medium">Belum ada tamu yang mengirimkan doa restu.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm text-zinc-300">
              <thead className="bg-[#221F1F] text-[10px] uppercase text-zinc-400 tracking-wider font-semibold select-none">
                <tr>
                  <th className="px-6 py-4 border-b border-zinc-800/60 text-center w-12">No</th>
                  <th className="px-6 py-4 border-b border-zinc-800/60 w-44">Tamu</th>
                  <th className="px-6 py-4 border-b border-zinc-800/60 w-32">Kehadiran</th>
                  <th className="px-6 py-4 border-b border-zinc-800/60 text-center w-16">Porsi</th>
                  <th className="px-6 py-4 border-b border-zinc-800/60">Doa Restu</th>
                  <th className="px-6 py-4 border-b border-zinc-800/60 text-right w-16">Hapus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 bg-transparent">
                {wishes.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4 text-center font-mono text-xs text-zinc-500">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 font-semibold text-amber-100 max-w-[176px] truncate">
                      {item.guestName}
                    </td>
                    <td className="px-6 py-4">
                      {item.attendance === "hadir" ? (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-1 rounded-full font-bold select-none inline-block">
                          Hadir
                        </span>
                      ) : item.attendance === "mungkin" ? (
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2.5 py-1 rounded-full font-bold select-none inline-block">
                          Mungkin
                        </span>
                      ) : (
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] px-2.5 py-1 rounded-full font-bold select-none inline-block">
                          Berhalangan
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-zinc-200">
                      {item.attendance === "hadir" ? item.guestCount : "—"}
                    </td>
                    <td className="px-6 py-4 italic text-zinc-400 text-xs font-serif leading-relaxed max-w-sm truncate whitespace-nowrap" title={item.message}>
                      &ldquo;{item.message || "—"}&rdquo;
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteWish(item.id)}
                        className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 p-1.5 rounded-lg transition-colors inline-flex items-center justify-center"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
