import { adminDb } from "./firebase-admin";
import { WeddingData } from "@/types/wedding";

export const dummyWeddingData: WeddingData = {
  slug: "rizki-amira",
  templateId: "floral",
  isActive: true,
  passwordEnabled: true,
  password: "rizki2025",

  groomName: "Rizki Aditya Pratama",
  groomNickname: "Rizki",
  groomFatherName: "Bpk. Hendra Pratama",
  groomMotherName: "Ibu Sari Wulandari",
  groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&fit=crop",

  brideName: "Amira Putri Rahayu",
  brideNickname: "Amira",
  brideFatherName: "Bpk. Rahmat Hidayat",
  brideMotherName: "Ibu Dewi Rahayu",
  bridePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&fit=crop",

  akadEnabled: true,
  akadDate: "2025-12-21T09:00:00",
  akadVenue: "Masjid Al-Ikhlas",
  akadAddress: "Jl. Raya Kebayoran Baru No. 12, Jakarta Selatan",
  akadMapsUrl: "https://maps.google.com/?q=-6.2297,106.7986",

  resepsiEnabled: true,
  resepsiDate: "2025-12-21T11:00:00",
  resepsiVenue: "The Grand Ballroom - Hotel Mulia",
  resepsiAddress: "Jl. Asia Afrika, Senayan, Jakarta",
  resepsiMapsUrl: "https://maps.google.com/?q=-6.2186,106.8000",

  coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&h=1000&fit=crop",
  galleryPhotos: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519225495810-7517c296517a?q=80&w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&h=600&fit=crop"
  ],

  musicEnabled: true,
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  musicTitle: "Can't Help Falling in Love",

  giftEnabled: true,
  bankAccounts: [
    { bankName: "BCA", accountNumber: "1234567890", accountName: "Rizki Aditya Pratama" },
    { bankName: "Mandiri", accountNumber: "0987654321", accountName: "Amira Putri Rahayu" }
  ],
  ewallets: [
    { provider: "GoPay", number: "081234567890" },
    { provider: "OVO", number: "081234567890" }
  ],

  openingQuote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.",
  openingQuoteSource: "QS. Ar-Rum: 21",

  createdAt: "2025-01-01T00:00:00",
  expiresAt: "2028-12-31T00:00:00" // extended to 2028 so it won't be expired in 2026!
};

export const dummyWeddingBrush: WeddingData = {
  slug: "dimas-cantika",
  templateId: "brush",
  isActive: true,
  passwordEnabled: true,
  password: "dimas2025",

  groomName: "Dimas Anggara Putra",
  groomNickname: "Dimas",
  groomFatherName: "Bpk. Hermawan Putra",
  groomMotherName: "Ibu Amalia Sari",
  groomPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=500&fit=crop",

  brideName: "Cantika Kirana Lestari",
  brideNickname: "Cantika",
  brideFatherName: "Bpk. Surya Lestari",
  brideMotherName: "Ibu Indah Lestari",
  bridePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=500&fit=crop",

  akadEnabled: true,
  akadDate: "2025-12-28T08:00:00",
  akadVenue: "Pendopo Ageng",
  akadAddress: "Jl. Diponegoro No. 24, Solo, Jawa Tengah",
  akadMapsUrl: "https://maps.google.com/?q=-7.5666,110.8243",

  resepsiEnabled: true,
  resepsiDate: "2025-12-28T11:00:00",
  resepsiVenue: "Grand Ballroom - Lorin Solo Hotel",
  resepsiAddress: "Jl. Adisucipto No. 47, Solo",
  resepsiMapsUrl: "https://maps.google.com/?q=-7.5441,110.7818",

  coverPhoto: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&h=1000&fit=crop",
  galleryPhotos: [
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519225495810-7517c296517a?q=80&w=400&h=600&fit=crop"
  ],

  musicEnabled: true,
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  musicTitle: "Perfect - Acoustic",

  giftEnabled: true,
  bankAccounts: [
    { bankName: "BCA", accountNumber: "3120456789", accountName: "Dimas Anggara" },
    { bankName: "Mandiri", accountNumber: "138002134567", accountName: "Cantika Kirana" }
  ],
  ewallets: [
    { provider: "GoPay", number: "08122334455" }
  ],

  openingQuote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.",
  openingQuoteSource: "QS. Ar-Rum: 21",

  createdAt: "2025-01-01T00:00:00",
  expiresAt: "2028-12-31T00:00:00"
};

export const dummyWeddingModern: WeddingData = {
  slug: "farhan-zahra",
  templateId: "modern",
  isActive: true,
  passwordEnabled: true,
  password: "farhan2025",

  groomName: "Farhan Mahendra",
  groomNickname: "Farhan",
  groomFatherName: "Bpk. Ridwan Mahendra",
  groomMotherName: "Ibu Kartika Mahendra",
  groomPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&fit=crop",

  brideName: "Azzahra Kamila Shadiq",
  brideNickname: "Zahra",
  brideFatherName: "Bpk. Ahmad Shadiq",
  brideMotherName: "Ibu Laila Shadiq",
  bridePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=500&fit=crop",

  akadEnabled: true,
  akadDate: "2026-01-11T16:00:00",
  akadVenue: "Glass House - Ritz Carlton Mega Kuningan",
  akadAddress: "Kawasan Mega Kuningan, Jakarta Selatan",
  akadMapsUrl: "https://maps.google.com/?q=-6.2291,106.8273",

  resepsiEnabled: true,
  resepsiDate: "2026-01-11T18:30:00",
  resepsiVenue: "Grand Ballroom - Ritz Carlton Mega Kuningan",
  resepsiAddress: "Kawasan Mega Kuningan, Jakarta Selatan",
  resepsiMapsUrl: "https://maps.google.com/?q=-6.2291,106.8273",

  coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&h=1000&fit=crop",
  galleryPhotos: [
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519225495810-7517c296517a?q=80&w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&h=400&fit=crop"
  ],

  musicEnabled: true,
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  musicTitle: "L-O-V-E - Jazz Quintet",

  giftEnabled: true,
  bankAccounts: [
    { bankName: "BCA", accountNumber: "5220456123", accountName: "Farhan Mahendra" },
    { bankName: "Bank Mandiri", accountNumber: "138002456789", accountName: "Azzahra Kamila" }
  ],
  ewallets: [
    { provider: "Dana", number: "081299887766" }
  ],

  openingQuote: "Di mana ada cinta yang besar, di situ selalu ada keajaiban.",
  openingQuoteSource: "Willa Cather",

  createdAt: "2025-01-01T00:00:00",
  expiresAt: "2028-12-31T00:00:00"
};

export const dummyWeddingRetro: WeddingData = {
  slug: "bimo-sekar",
  templateId: "retro",
  isActive: true,
  passwordEnabled: true,
  password: "bimo2025",

  groomName: "Bimo Prasetyo Wibowo",
  groomNickname: "Bimo",
  groomFatherName: "Bpk. Prasetyo Wibowo",
  groomMotherName: "Ibu Sri Wahyuni",
  groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&fit=crop",

  brideName: "Sekar Ayu Maharani",
  brideNickname: "Sekar",
  brideFatherName: "Bpk. Bambang Maharani",
  brideMotherName: "Ibu Endang Maharani",
  bridePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&fit=crop",

  akadEnabled: true,
  akadDate: "2025-10-04T08:00:00",
  akadVenue: "Pendopo Agung Keraton Surakarta",
  akadAddress: "Jl. Mangkubumi No. 1, Surakarta, Jawa Tengah",
  akadMapsUrl: "https://maps.google.com/?q=-7.5742,110.8315",

  resepsiEnabled: true,
  resepsiDate: "2025-10-04T11:00:00",
  resepsiVenue: "The Sunan Hotel Solo",
  resepsiAddress: "Jl. Ahmad Yani No. 40, Surakarta, Jawa Tengah",
  resepsiMapsUrl: "https://maps.google.com/?q=-7.5578,110.8354",

  coverPhoto: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&h=1000&fit=crop",
  galleryPhotos: [
    "https://images.unsplash.com/photo-1519225495810-7517c296517a?q=80&w=800&h=533&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&h=533&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&h=500&fit=crop"
  ],

  musicEnabled: true,
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  musicTitle: "Bengawan Solo — Gesang",

  giftEnabled: true,
  bankAccounts: [
    {
      bankName: "BRI",
      accountNumber: "0987654321098",
      accountName: "Bimo Prasetyo Wibowo"
    },
    {
      bankName: "BSI",
      accountNumber: "7171234567890",
      accountName: "Sekar Ayu Maharani"
    }
  ],
  ewallets: [
    {
      provider: "GoPay",
      number: "082134567890",
      accountName: "Bimo Prasetyo",
      qrCodeUrl: ""
    },
    {
      provider: "Dana",
      number: "082134567890",
      accountName: "Sekar Ayu",
      qrCodeUrl: ""
    }
  ],
  giftRegistryUrl: "",

  openingQuote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri.",
  openingQuoteSource: "QS. Ar-Rum: 21",

  createdAt: "2025-01-01T00:00:00",
  expiresAt: "2028-12-31T00:00:00"
};

export async function getWeddingData(slug: string): Promise<WeddingData | null> {
  // If Firebase Admin SDK is initialized, read from Firestore
  if (adminDb) {
    try {
      const docRef = adminDb.collection("weddings").doc(slug);
      const doc = await docRef.get();
      if (doc.exists) {
        return doc.data() as WeddingData;
      } else if (slug === "rizki-amira") {
        console.log(`[Firebase Seeding] Automatically seeding showcase wedding profile for '${slug}' into live Cloud Firestore...`);
        await docRef.set(dummyWeddingData);
        return dummyWeddingData;
      } else if (slug === "dimas-cantika") {
        console.log(`[Firebase Seeding] Automatically seeding brush template wedding profile for '${slug}' into live Cloud Firestore...`);
        await docRef.set(dummyWeddingBrush);
        return dummyWeddingBrush;
      } else if (slug === "farhan-zahra") {
        console.log(`[Firebase Seeding] Automatically seeding modern template wedding profile for '${slug}' into live Cloud Firestore...`);
        await docRef.set(dummyWeddingModern);
        return dummyWeddingModern;
      } else if (slug === "bimo-sekar") {
        console.log(`[Firebase Seeding] Automatically seeding retro template wedding profile for '${slug}' into live Cloud Firestore...`);
        await docRef.set(dummyWeddingRetro);
        return dummyWeddingRetro;
      }
    } catch (err) {
      console.error(`Error fetching/seeding wedding from Firestore for slug ${slug}:`, err);
    }
  }

  // Fallback path
  if (slug === "rizki-amira") {
    return dummyWeddingData;
  }
  if (slug === "dimas-cantika") {
    return dummyWeddingBrush;
  }
  if (slug === "farhan-zahra") {
    return dummyWeddingModern;
  }
  if (slug === "bimo-sekar") {
    return dummyWeddingRetro;
  }

  return null;
}
