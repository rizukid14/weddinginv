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

export async function getWeddingData(slug: string): Promise<WeddingData | null> {
  // If Firebase Admin SDK is initialized, read from Firestore
  if (adminDb) {
    try {
      const docRef = adminDb.collection("weddings").doc(slug);
      const doc = await docRef.get();
      if (doc.exists) {
        return doc.data() as WeddingData;
      } else if (slug === "rizki-amira") {
        // Automatic showcase profile Seeding!
        console.log(`[Firebase Seeding] Automatically seeding showcase wedding profile for '${slug}' into live Cloud Firestore...`);
        await docRef.set(dummyWeddingData);
        return dummyWeddingData;
      }
    } catch (err) {
      console.error(`Error fetching/seeding wedding from Firestore for slug ${slug}:`, err);
    }
  }

  // Fallback path
  if (slug === "rizki-amira") {
    return dummyWeddingData;
  }

  return null;
}
