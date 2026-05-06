"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

interface DashboardContextValue {
  user: User | null;
  slug: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

const DashboardContext = createContext<DashboardContextValue>({
  user: null,
  slug: "",
  setSlug: () => {},
  loading: true,
});

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Fetch linked slug from users doc
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists() && userDoc.data().weddingSlug) {
            setSlug(userDoc.data().weddingSlug);
          } else {
            setSlug("");
          }
        } catch (e) {
          console.error("Gagal memuat slug pengguna:", e);
        }
      } else {
        setSlug("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <DashboardContext.Provider value={{ user, slug, setSlug, loading }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
