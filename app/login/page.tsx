"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Silakan lengkapi semua kolom");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      // Map common Firebase auth errors to nice Indonesian
      switch (err.code) {
        case "auth/invalid-email":
          setError("Format email tidak valid");
          break;
        case "auth/user-disabled":
          setError("Akun ini telah dinonaktifkan");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Email atau kata sandi salah");
          break;
        case "auth/too-many-requests":
          setError("Terlalu banyak percobaan. Silakan coba lagi nanti");
          break;
        default:
          setError("Terjadi kesalahan teknis. Silakan coba lagi");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B0B] flex items-center justify-center px-4 font-sans selection:bg-amber-500/30 selection:text-amber-200">
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
              Masuk ke Dashboard
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Kelola data undangan pernikahan Anda di sini.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                Kata Sandi
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
                  <span>Memuat...</span>
                </>
              ) : (
                <span>Masuk</span>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="text-center mt-2 border-t border-zinc-800/50 pt-4">
            <p className="text-xs text-zinc-400">
              Belum memiliki akun?{" "}
              <Link
                href="/register"
                className="text-amber-400 font-semibold hover:underline"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
