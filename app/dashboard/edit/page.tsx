"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "@/lib/dashboard-context";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { WeddingData } from "@/types/wedding";
import IframePreview from "@/components/dashboard/IframePreview";

// Wizard steps
import StepIdentitas from "@/components/dashboard/wizard/StepIdentitas";
import StepAcara from "@/components/dashboard/wizard/StepAcara";
import StepMedia from "@/components/dashboard/wizard/StepMedia";
import StepHadiah from "@/components/dashboard/wizard/StepHadiah";
import StepPengaturan from "@/components/dashboard/wizard/StepPengaturan";

import { Loader2, ArrowLeft, ArrowRight, Save, Check } from "lucide-react";

export default function EditWizardPage() {
  const { slug, loading: contextLoading } = useDashboard();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<Partial<WeddingData>>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load wedding document on mount / when slug is resolved
  useEffect(() => {
    if (!slug) return;

    const fetchWedding = async () => {
      try {
        const docRef = doc(db, "weddings", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data() as WeddingData);
        }
      } catch (err) {
        console.error("Gagal mengambil data undangan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWedding();
  }, [slug]);

  const handleUpdateFormData = (updates: Partial<WeddingData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSaveData = async () => {
    if (!slug) return;
    setIsSaving(true);
    setToastMessage("");

    try {
      await setDoc(doc(db, "weddings", slug), formData, { merge: true });
      
      // Fire beautiful toast
      setToastMessage("Perubahan disimpan ✓");
      setRefreshTrigger((prev) => prev + 1); // Live reload preview
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  if (contextLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-3 text-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-sm text-zinc-400">Menyinkronkan profil editor Anda...</p>
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
        <p className="text-sm text-zinc-400">Mengambil konten undangan digital Anda...</p>
      </div>
    );
  }

  const stepsLabels = [
    "Mempelai",
    "Acara",
    "Media",
    "Hadiah",
    "Pengaturan"
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 select-none font-sans pb-16">
      {/* Header section with inline Save Trigger */}
      <div className="flex justify-between items-center border-b border-zinc-800/60 pb-5">
        <div>
          <h1 className="font-serif text-3xl font-medium text-zinc-50">Edit Undangan</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Isi formulir bertahap di bawah ini untuk mendesain undangan pernikahan impian Anda.
          </p>
        </div>
        <button
          onClick={handleSaveData}
          disabled={isSaving}
          className="bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-semibold text-xs px-5 py-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/5 transition-all duration-200"
        >
          {isSaving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          <span>{isSaving ? "Menyimpan" : "Simpan Perubahan"}</span>
        </button>
      </div>

      {/* Main Split Layout: Left Form, Right Simulated Preview */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Form (60% width) */}
        <div className="flex-1 w-full lg:max-w-[60%] flex flex-col gap-6">
          
          {/* Progress Tracker Bar */}
          <div className="bg-[#181616] border border-zinc-800/80 p-4 rounded-2xl flex justify-between items-center relative overflow-hidden select-none">
            {stepsLabels.map((lbl, idx) => {
              const stepNum = idx + 1;
              const isActive = activeStep === stepNum;
              const isCompleted = activeStep > stepNum;

              return (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(stepNum)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer z-10 flex-1 relative"
                >
                  <div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
                      isActive 
                        ? "bg-amber-500 text-zinc-950 border-amber-500 shadow-lg shadow-amber-500/15" 
                        : isCompleted 
                        ? "bg-amber-500/15 text-amber-400 border-amber-500/20" 
                        : "bg-zinc-900 text-zinc-500 border-zinc-800"
                    }`}
                  >
                    {isCompleted ? <Check size={12} className="stroke-[3]" /> : stepNum}
                  </div>
                  <span 
                    className={`text-[9px] font-bold uppercase tracking-wider transition-all select-none hidden sm:inline ${
                      isActive ? "text-amber-400" : "text-zinc-500"
                    }`}
                  >
                    {lbl}
                  </span>
                </div>
              );
            })}
            
            {/* Background connection track line */}
            <div className="absolute top-[30px] inset-x-8 h-[1px] bg-zinc-800/80 z-0" />
          </div>

          {/* Render Step content card */}
          <div className="bg-[#181616] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 min-h-[400px]">
            {activeStep === 1 && (
              <StepIdentitas data={formData} update={handleUpdateFormData} />
            )}
            {activeStep === 2 && (
              <StepAcara data={formData} update={handleUpdateFormData} />
            )}
            {activeStep === 3 && (
              <StepMedia data={formData} update={handleUpdateFormData} />
            )}
            {activeStep === 4 && (
              <StepHadiah data={formData} update={handleUpdateFormData} />
            )}
            {activeStep === 5 && (
              <StepPengaturan data={formData} update={handleUpdateFormData} />
            )}
          </div>

          {/* Form navigation controls footer */}
          <div className="flex justify-between items-center mt-2 select-none">
            <button
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className="px-4.5 py-3 rounded-xl border border-zinc-800/80 hover:border-zinc-700 bg-zinc-900/10 text-zinc-400 hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
            >
              <ArrowLeft size={14} />
              <span>Sebelumnya</span>
            </button>

            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              Langkah {activeStep} dari 5
            </span>

            {activeStep < 5 ? (
              <button
                onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
                className="px-4.5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-100 border border-zinc-750 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Berikutnya</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSaveData}
                disabled={isSaving}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-amber-500/5"
              >
                {isSaving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                <span>Simpan Perubahan</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Iframe Live Preview Panel (40% width) */}
        <div className="flex-1 w-full lg:max-w-[40%] flex flex-col gap-4 items-center sticky top-8">
          <div className="w-full flex items-center justify-between px-2 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Pratinjau Langsung
              </span>
            </div>
            <span className="text-[9px] text-zinc-500 font-medium">Bebas Klik &amp; Interaktif</span>
          </div>
          
          <IframePreview slug={slug} refreshTrigger={refreshTrigger} />
        </div>
      </div>

      {/* Floating status Toast message banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-950 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl z-50 animate-bounce flex items-center gap-2 border border-amber-400">
          <Check size={14} className="stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
