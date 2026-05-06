"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import { Check, X, Loader2, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Validate and check slug availability in real time with debounce
  useEffect(() => {
    if (!slug) {
      setSlugStatus("idle");
      return;
    }

    // Regex check: only lowercase letters, numbers, and hyphens allowed
    const validRegex = /^[a-z0-9-]+$/;
    if (!validRegex.test(slug) || slug.length < 3) {
      setSlugStatus("invalid");
      return;
    }

    setSlugStatus("checking");

    const delayDebounce = setTimeout(async () => {
      try {
        const docRef = doc(db, "weddings", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSlugStatus("taken");
        } else {
          setSlugStatus("available");
        }
      } catch (err) {
        console.error("Error checking slug availability:", err);
        setSlugStatus("idle");
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [slug]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !slug || !email || !password || !confirmPassword) {
      setError("Silakan lengkapi semua kolom");
      return;
    }

    if (slugStatus !== "available") {
      setError("Slug URL tidak tersedia atau tidak valid");
      return;
    }

    if (password.length < 8) {
      setError("Kata sandi harus minimal 8 karakter");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Write User profile in users collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: name,
        weddingSlug: slug,
        createdAt: new Date().toISOString(),
      });

      // 3. Setup default Seed Data for their wedding invitation
      const defaultWeddingSeed = {
        slug: slug,
        uid: user.uid,
        templateId: "floral",
        isActive: true,
        passwordEnabled: false,
        password: "123456",

        groomName: "Nama Mempelai Pria",
        groomNickname: "Pria",
        groomFatherName: "Nama Ayah Pria",
        groomMotherName: "Nama Ibu Pria",
        groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&fit=crop",

        brideName: "Nama Mempelai Wanita",
        brideNickname: "Wanita",
        brideFatherName: "Nama Ayah Wanita",
        brideMotherName: "Nama Ibu Wanita",
        bridePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&fit=crop",

        akadEnabled: true,
        akadDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 30 days from now
        akadVenue: "Masjid Raya",
        akadAddress: "Jl. Protokol No. 1, Kota Pusat",
        akadMapsUrl: "https://maps.google.com/?q=-6.2000,106.8166",

        resepsiEnabled: true,
        resepsiDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
        resepsiVenue: "Gedung Serbaguna",
        resepsiAddress: "Jl. Protokol No. 2, Kota Pusat",
        resepsiMapsUrl: "https://maps.google.com/?q=-6.2000,106.8166",

        coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&h=1000&fit=crop",
        galleryPhotos: [
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1519225495810-7517c296517a?q=80&w=400&h=600&fit=crop",
          "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=400&h=400&fit=crop"
        ],

        musicEnabled: true,
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        musicTitle: "Can't Help Falling in Love",

        giftEnabled: true,
        bankAccounts: [
          { bankName: "BCA", accountNumber: "1234567890", accountName: name }
        ],
        ewallets: [],

        openingQuote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.",
        openingQuoteSource: "QS. Ar-Rum: 21",

        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year expiry
      };

      await setDoc(doc(db, "weddings", slug), defaultWeddingSeed);

      // 4. Register complete, route to edit wizard directly
      router.push("/dashboard/edit");
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email sudah terdaftar");
      } else if (err.code === "auth/invalid-email") {
        setError("Format email tidak valid");
      } else if (err.code === "auth/weak-password") {
        setError("Kata sandi terlalu lemah (minimal 6 karakter)");
      } else {
        setError("Gagal membuat akun. Silakan coba lagi");
      }
      setLoading(false);
    }
  };

  const handleSlugChange = (val: string) => {
    // Force lower case and strip spaces to help user select a valid URL format
    const formatted = val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setSlug(formatted);
  };

  return (
    <div className="min-h-screen bg-[#0D0B0B] flex items-center justify-center py-10 px-4 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <div className="bg-[#181616] border border-zinc-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl relative overflow-hidden">
        {/* Decorative gold gradient edge */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        <div className="flex flex-col gap-6">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="flex flex-col items-center justify-center gap-1.5 mb-2 select-none">
              <img
                src="/ENIX DESIGN LOGO wht.png"
                alt="ENIX DESIGN"
                className="h-10 w-auto object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-zinc-50 tracking-tight mt-5">
              Buat Akun Pengantin
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Buat undangan pernikahan digital premium Anda sekarang.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {/* Nama Lengkap */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-amber-500/90 font-semibold">
                Nama Pengantin / Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth: Rizki & Amira"
                disabled={loading}
                className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Slug URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-amber-500/90 font-semibold">
                Slug URL Undangan
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="rizki-amira"
                  disabled={loading}
                  className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg pl-4 pr-10 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none transition-colors font-mono"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  {slugStatus === "checking" && (
                    <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                  )}
                  {slugStatus === "available" && (
                    <Check className="w-4 h-4 text-emerald-500" />
                  )}
                  {slugStatus === "taken" && (
                    <X className="w-4 h-4 text-rose-500" />
                  )}
                  {slugStatus === "invalid" && (
                    <X className="w-4 h-4 text-amber-500" />
                  )}
                </div>
              </div>
              {/* Slug status messages */}
              {slugStatus === "available" && (
                <span className="text-[10px] text-emerald-500 font-medium">
                  ✓ enixdesign.com/{slug} tersedia!
                </span>
              )}
              {slugStatus === "taken" && (
                <span className="text-[10px] text-rose-500 font-medium">
                  ✗ URL ini sudah digunakan oleh pengantin lain.
                </span>
              )}
              {slugStatus === "invalid" && (
                <span className="text-[10px] text-amber-500 font-medium">
                  ✗ Min. 3 karakter (hanya huruf kecil, angka, tanda hubung).
                </span>
              )}
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-amber-500/90 font-semibold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@anda.com"
                disabled={loading}
                className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-amber-500/90 font-semibold">
                Kata Sandi (Min. 8 karakter)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg pl-4 pr-10 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-amber-500/90 font-semibold">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Error banner */}
            {error && (
              <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 px-3.5 py-2.5 rounded-lg font-medium">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-amber-500/5 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mendaftarkan...</span>
                </>
              ) : (
                <span>Buat Akun &amp; Mulai</span>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="text-center mt-2 border-t border-zinc-800/50 pt-4">
            <p className="text-xs text-zinc-400">
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="text-amber-400 font-semibold hover:underline"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
