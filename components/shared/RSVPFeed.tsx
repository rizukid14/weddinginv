"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RSVPEntry } from "@/types/wedding";

interface RSVPFeedProps {
  slug: string;
  className?: string;
  cardClassName?: string;
  avatarClassName?: string;
  nameClassName?: string;
  messageClassName?: string;
  timeClassName?: string;
  emptyStateClassName?: string;
  badgeHadirClass?: string;
  badgeMungkinClass?: string;
  badgeAbsenClass?: string;
  fallbackWishes?: RSVPEntry[];
}

const DEFAULT_FALLBACK: RSVPEntry[] = [
  {
    id: "m1",
    weddingSlug: "rizki-amira",
    guestName: "Budi Santoso",
    attendance: "hadir",
    guestCount: 2,
    message: "Barakallahu lakum wa baraka 'alaikum, semoga menjadi keluarga sakinah, mawaddah, warahmah. Sangat tidak sabar untuk hadir di hari istimewa kalian!",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "m2",
    weddingSlug: "rizki-amira",
    guestName: "Siti Rahma",
    attendance: "mungkin",
    guestCount: 1,
    message: "Selamat ya Amira & Rizki! Semoga persiapannya lancar sampai hari-H. Insya Allah aku usahakan hadir.",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: "m3",
    weddingSlug: "rizki-amira",
    guestName: "Hendra Wijaya",
    attendance: "tidak_hadir",
    guestCount: 0,
    message: "Mohon maaf yang sebesar-besarnya Rizki & Amira, saya sedang ada tugas di luar kota. Selamat menempuh hidup baru ya, semoga langgeng bahagia dunia akhirat!",
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
  },
];

export default function RSVPFeed({
  slug,
  className = "",
  cardClassName = "bg-white border rounded-xl p-4 shadow-sm flex gap-3.5 items-start",
  avatarClassName = "w-10 h-10 rounded-full bg-amber-50 flex-shrink-0 flex items-center justify-center text-amber-700 font-semibold",
  nameClassName = "font-sans text-xs font-semibold text-zinc-800",
  messageClassName = "font-sans text-[11px] text-zinc-600 italic mt-1.5 leading-relaxed",
  timeClassName = "font-sans text-[8px] text-zinc-400 mt-1 block",
  emptyStateClassName = "bg-white border rounded-xl p-6 text-center shadow-sm select-none",
  badgeHadirClass = "bg-[#E2F0D9] text-[#385723] text-[9px] px-2 py-0.5 rounded-full font-medium leading-none",
  badgeMungkinClass = "bg-[#FFF2CC] text-[#7F6000] text-[9px] px-2 py-0.5 rounded-full font-medium leading-none",
  badgeAbsenClass = "bg-[#FCE4D6] text-[#C65911] text-[9px] px-2 py-0.5 rounded-full font-medium leading-none",
  fallbackWishes = DEFAULT_FALLBACK,
}: RSVPFeedProps) {
  const [wishes, setWishes] = useState<RSVPEntry[]>([]);

  const getRelativeTime = (isoString: string) => {
    try {
      const now = new Date();
      const past = new Date(isoString);
      const diffMs = now.getTime() - past.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return "Baru saja";
      if (diffMins < 60) return `${diffMins} menit yang lalu`;

      const diffHrs = Math.floor(diffMins / 60);
      if (diffHrs < 24) return `${diffHrs} jam yang lalu`;

      const diffDays = Math.floor(diffHrs / 24);
      return `${diffDays} hari yang lalu`;
    } catch (e) {
      return "Beberapa saat yang lalu";
    }
  };

  useEffect(() => {
    const key = `rsvp_wishes_${slug}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setWishes(JSON.parse(stored));
      } catch (e) {
        setWishes(fallbackWishes);
      }
    } else {
      setWishes(fallbackWishes);
    }

    const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    if (isFirebaseConfigured) {
      try {
        const rsvpCollectionRef = collection(db, "weddings", slug, "rsvp");
        const rsvpQuery = query(rsvpCollectionRef, orderBy("createdAt", "desc"), limit(10));

        const unsubscribe = onSnapshot(rsvpCollectionRef, (snapshot) => {
          if (!snapshot.empty) {
            const list: RSVPEntry[] = [];
            snapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() } as RSVPEntry);
            });
            // Overwrite and persist data
            setWishes(list);
            localStorage.setItem(key, JSON.stringify(list));
          }
        }, (err) => {
          console.warn("Firestore listener failed, using local fallback.", err);
        });

        return () => unsubscribe();
      } catch (e) {
        console.warn("Error setting up real-time onSnapshot listener. Using local wishes.", e);
      }
    }
  }, [slug, fallbackWishes]);

  if (wishes.length === 0) {
    return (
      <div className={emptyStateClassName}>
        <Heart size={20} className="text-red-400 mx-auto mb-2 animate-pulse" />
        <p className="font-sans text-xs text-zinc-500 italic">
          Jadilah yang pertama untuk mengirimkan ucapan tulus bagi kedua mempelai 💌
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1 no-scrollbar ${className}`}>
      <AnimatePresence initial={false}>
        {wishes.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={cardClassName}
          >
            {/* Circle Avatar */}
            <div className={avatarClassName}>
              <span>{item.guestName.charAt(0)}</span>
            </div>

            {/* Info block */}
            <div className="flex-grow">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className={nameClassName}>
                  {item.guestName}
                </h4>

                {/* Attendance badge */}
                {item.attendance === "hadir" ? (
                  <span className={badgeHadirClass}>
                    Hadir {item.guestCount > 0 ? `(${item.guestCount})` : ""}
                  </span>
                ) : item.attendance === "mungkin" ? (
                  <span className={badgeMungkinClass}>
                    Mungkin
                  </span>
                ) : (
                  <span className={badgeAbsenClass}>
                    Berhalangan
                  </span>
                )}
              </div>

              {item.message && (
                <p className={messageClassName}>
                  &ldquo;{item.message}&rdquo;
                </p>
              )}

              <span className={timeClassName}>
                {getRelativeTime(item.createdAt)}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
