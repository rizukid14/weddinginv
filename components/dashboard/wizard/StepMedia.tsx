"use client";

import React, { useState, useRef } from "react";
import { WeddingData } from "@/types/wedding";
import { uploadFile, generateFileName } from "@/lib/storage";
import { useDashboard } from "@/lib/dashboard-context";
import { 
  Upload, 
  ImagePlus, 
  Music, 
  Trash2, 
  X, 
  Loader2, 
  Play, 
  Pause 
} from "lucide-react";

interface StepProps {
  data: Partial<WeddingData>;
  update: (updates: Partial<WeddingData>) => void;
}

export default function StepMedia({ data, update }: StepProps) {
  const { user } = useDashboard();
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [musicUploading, setMusicUploading] = useState(false);

  // Hidden inputs refs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const groomInputRef = useRef<HTMLInputElement>(null);
  const brideInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const thankYouInputRef = useRef<HTMLInputElement>(null);

  const handleSingleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverPhoto" | "groomPhoto" | "bridePhoto" | "thankYouPhoto"
  ) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingField(field);

    try {
      const fileName = generateFileName(file.name);
      const storagePath = `${field}/${fileName}`;
      const downloadUrl = await uploadFile(user.uid, file, storagePath);
      update({ [field]: downloadUrl });
    } catch (err) {
      console.error(`Gagal mengunggah ${field}:`, err);
      alert("Gagal mengunggah foto. Silakan coba lagi");
    } finally {
      setUploadingField(null);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !user) return;

    const currentGallery = data.galleryPhotos || [];
    const spaceRemaining = 10 - currentGallery.length;
    if (spaceRemaining <= 0) {
      alert("Galeri sudah penuh (maksimum 10 foto)");
      return;
    }

    setGalleryUploading(true);
    const filesToUpload = Array.from(files).slice(0, spaceRemaining);
    const uploadedUrls: string[] = [...currentGallery];

    try {
      for (const file of filesToUpload) {
        const fileName = generateFileName(file.name);
        const storagePath = `gallery/${fileName}`;
        const downloadUrl = await uploadFile(user.uid, file, storagePath);
        uploadedUrls.push(downloadUrl);
      }
      update({ galleryPhotos: uploadedUrls });
    } catch (err) {
      console.error("Gagal mengunggah beberapa foto galeri:", err);
      alert("Terjadi masalah saat mengunggah beberapa foto");
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleRemoveGalleryPhoto = (indexToRemove: number) => {
    const current = data.galleryPhotos || [];
    const filtered = current.filter((_, idx) => idx !== indexToRemove);
    update({ galleryPhotos: filtered });
  };

  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Check size (max 12MB for music track)
    if (file.size > 12 * 1024 * 1024) {
      alert("Ukuran file lagu terlalu besar (maksimal 12MB)");
      return;
    }

    setMusicUploading(true);

    try {
      const fileName = generateFileName(file.name);
      const storagePath = `music/${fileName}`;
      const downloadUrl = await uploadFile(user.uid, file, storagePath);
      
      update({ 
        musicUrl: downloadUrl,
        musicTitle: file.name.replace(/\.[^/.]+$/, "") // Set music title from file name automatically
      });
    } catch (err) {
      console.error("Gagal mengunggah lagu latar:", err);
      alert("Gagal mengunggah file musik");
    } finally {
      setMusicUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in font-sans">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-50">Media &amp; Musik Latar</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Unggah foto sampul, foto profil mempelai, galeri prewedding, dan musik latar.
        </p>
      </div>

      {/* Profile & Cover Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cover Image Upload */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            Foto Sampul (Cover)
          </label>
          <div 
            onClick={() => coverInputRef.current?.click()}
            className="aspect-[3/4] rounded-2xl border-2 border-dashed border-zinc-800/80 bg-zinc-900/10 hover:border-amber-500/50 cursor-pointer overflow-hidden flex items-center justify-center relative group transition-all"
          >
            {data.coverPhoto ? (
              <>
                <img 
                  src={data.coverPhoto} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  alt="Cover" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Upload size={18} className="text-white" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-zinc-500 group-hover:text-amber-500">
                <ImagePlus size={24} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Unggah Cover</span>
              </div>
            )}
            
            {uploadingField === "coverPhoto" && (
              <div className="absolute inset-0 bg-[#110F0F]/80 flex items-center justify-center z-20">
                <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={coverInputRef} 
            onChange={(e) => handleSingleImageUpload(e, "coverPhoto")} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Groom Profile Photo */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            Foto Mempelai Pria
          </label>
          <div 
            onClick={() => groomInputRef.current?.click()}
            className="aspect-[3/4] rounded-2xl border-2 border-dashed border-zinc-800/80 bg-zinc-900/10 hover:border-amber-500/50 cursor-pointer overflow-hidden flex items-center justify-center relative group transition-all"
          >
            {data.groomPhoto ? (
              <>
                <img 
                  src={data.groomPhoto} 
                  className="w-full h-full object-cover object-top transition-transform group-hover:scale-105" 
                  alt="Groom" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Upload size={18} className="text-white" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-zinc-500 group-hover:text-amber-500">
                <ImagePlus size={24} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Unggah Foto Pria</span>
              </div>
            )}
            
            {uploadingField === "groomPhoto" && (
              <div className="absolute inset-0 bg-[#110F0F]/80 flex items-center justify-center z-20">
                <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={groomInputRef} 
            onChange={(e) => handleSingleImageUpload(e, "groomPhoto")} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Bride Profile Photo */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            Foto Mempelai Wanita
          </label>
          <div 
            onClick={() => brideInputRef.current?.click()}
            className="aspect-[3/4] rounded-2xl border-2 border-dashed border-zinc-800/80 bg-zinc-900/10 hover:border-amber-500/50 cursor-pointer overflow-hidden flex items-center justify-center relative group transition-all"
          >
            {data.bridePhoto ? (
              <>
                <img 
                  src={data.bridePhoto} 
                  className="w-full h-full object-cover object-top transition-transform group-hover:scale-105" 
                  alt="Bride" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Upload size={18} className="text-white" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-zinc-500 group-hover:text-amber-500">
                <ImagePlus size={24} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Unggah Foto Wanita</span>
              </div>
            )}
            
            {uploadingField === "bridePhoto" && (
              <div className="absolute inset-0 bg-[#110F0F]/80 flex items-center justify-center z-20">
                <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={brideInputRef} 
            onChange={(e) => handleSingleImageUpload(e, "bridePhoto")} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>

      {/* Thank You Photo Upload (For Seasonal Template) */}
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            Foto Penutup (Thank You Photo)
          </label>
          <span className="text-[10px] text-zinc-500">Opsional, hanya untuk template yang mendukung (misal: Seasonal)</span>
        </div>
        <div 
          onClick={() => thankYouInputRef.current?.click()}
          className="aspect-video max-w-sm rounded-2xl border-2 border-dashed border-zinc-800/80 bg-zinc-900/10 hover:border-amber-500/50 cursor-pointer overflow-hidden flex items-center justify-center relative group transition-all"
        >
          {data.thankYouPhoto ? (
            <>
              <img 
                src={data.thankYouPhoto} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                alt="Thank You" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Upload size={18} className="text-white" />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-zinc-500 group-hover:text-amber-500">
              <ImagePlus size={24} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Unggah Foto Bersama</span>
            </div>
          )}
          
          {uploadingField === "thankYouPhoto" && (
            <div className="absolute inset-0 bg-[#110F0F]/80 flex items-center justify-center z-20">
              <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
            </div>
          )}
        </div>
        <input 
          type="file" 
          ref={thankYouInputRef} 
          onChange={(e) => handleSingleImageUpload(e, "thankYouPhoto")} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      {/* Prewedding Gallery Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-baseline border-b border-zinc-800/80 pb-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            Galeri Foto Prewedding
          </label>
          <span className="text-[10px] text-zinc-500 font-medium">
            {(data.galleryPhotos || []).length} / 10 foto
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-1.5">
          {/* Render active gallery items */}
          {(data.galleryPhotos || []).map((photoUrl, idx) => (
            <div key={idx} className="aspect-square bg-[#221F1F] rounded-xl overflow-hidden relative group border border-zinc-800/80 select-none">
              <img src={photoUrl} className="w-full h-full object-cover" alt={`Galeri ${idx+1}`} />
              <button
                type="button"
                onClick={() => handleRemoveGalleryPhoto(idx)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 hover:bg-rose-600/90 text-rose-400 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {/* Add gallery button cell */}
          {(data.galleryPhotos || []).length < 10 && (
            <div 
              onClick={() => galleryInputRef.current?.click()}
              className="aspect-square rounded-xl border border-dashed border-zinc-800/80 bg-zinc-900/10 hover:border-amber-500/50 flex flex-col items-center justify-center text-zinc-500 hover:text-amber-500 cursor-pointer relative transition-all"
            >
              {galleryUploading ? (
                <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
              ) : (
                <>
                  <ImagePlus size={20} />
                  <span className="text-[9px] uppercase tracking-wider font-semibold mt-1">Tambah</span>
                </>
              )}
            </div>
          )}
        </div>
        <input 
          type="file" 
          ref={galleryInputRef} 
          onChange={handleGalleryUpload} 
          accept="image/*" 
          multiple 
          className="hidden" 
        />
      </div>

      {/* Background Music Section */}
      <div className="flex flex-col gap-4 bg-zinc-900/10 border border-zinc-800/40 p-5 rounded-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-2">
          <div className="flex items-center gap-2">
            <Music size={16} className="text-amber-500" />
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
              Musik Latar Belakang (Audio)
            </span>
          </div>
          {/* Toggle Switch */}
          <button
            type="button"
            onClick={() => update({ musicEnabled: !data.musicEnabled })}
            className={`w-11 h-6 rounded-full relative p-1 transition-colors duration-200 focus:outline-none ${
              data.musicEnabled ? "bg-amber-500" : "bg-zinc-800"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#110F0F] transition-transform duration-200 ${
                data.musicEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {data.musicEnabled && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                  Judul Lagu / Keterangan
                </label>
                <input
                  type="text"
                  value={data.musicTitle || ""}
                  onChange={(e) => update({ musicTitle: e.target.value })}
                  placeholder="Can't Help Falling in Love"
                  className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
              
              <div className="flex flex-col gap-1.5 justify-end">
                <button
                  type="button"
                  onClick={() => musicInputRef.current?.click()}
                  disabled={musicUploading}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 disabled:bg-zinc-900 disabled:text-zinc-600 font-semibold text-xs py-3 rounded-lg uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  {musicUploading ? (
                    <Loader2 className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  ) : (
                    <Upload size={14} />
                  )}
                  <span>Unggah Berkas MP3</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                Tautan Berkas Audio (URL MP3)
              </label>
              <input
                type="text"
                value={data.musicUrl || ""}
                onChange={(e) => update({ musicUrl: e.target.value })}
                placeholder="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors font-mono"
              />
            </div>

            {data.musicUrl && (
              <div className="mt-2.5 p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/40 select-none">
                <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold block mb-2">Pratinjau Pemutar Musik</span>
                <audio controls src={data.musicUrl} className="w-full max-h-10 outline-none" />
              </div>
            )}
          </div>
        )}
        <input 
          type="file" 
          ref={musicInputRef} 
          onChange={handleMusicUpload} 
          accept="audio/mp3,audio/mpeg" 
          className="hidden" 
        />
      </div>
    </div>
  );
}
