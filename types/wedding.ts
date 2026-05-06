export interface WeddingData {
  // Identity
  slug: string;
  templateId: "floral" | "brush" | "modern" | "retro" | "culture" | "spiritual" | "seasonal";
  isActive: boolean;

  // Password
  passwordEnabled: boolean;
  password?: string;

  // Mempelai
  groomName: string;           // "Rizki Aditya Pratama"
  groomNickname: string;       // "Rizki"
  groomFatherName: string;     // "Bpk. Hendra Pratama"
  groomMotherName: string;     // "Ibu Sari Pratama"
  groomPhoto: string;          // Firebase Storage URL
  groomInstagram?: string;

  brideName: string;           // "Amira Putri Rahayu"
  brideNickname: string;       // "Amira"
  brideFatherName: string;
  brideMotherName: string;
  bridePhoto: string;
  brideInstagram?: string;

  // Acara
  akadEnabled: boolean;
  akadDate: string;            // ISO string "2025-12-21T09:00:00"
  akadVenue: string;
  akadAddress: string;
  akadMapsUrl: string;

  resepsiEnabled: boolean;
  resepsiDate: string;
  resepsiVenue: string;
  resepsiAddress: string;
  resepsiMapsUrl: string;

  // Media
  coverPhoto: string;          // Firebase Storage URL
  galleryPhotos: string[];     // Array of URLs (max 10)

  // Music
  musicEnabled: boolean;
  musicUrl: string;
  musicTitle: string;

  // Gift
  giftEnabled: boolean;
  bankAccounts: BankAccount[];
  ewallets: EWallet[];
  giftRegistryUrl?: string;
  giftAddress?: string;
  giftReceiverName?: string;

  // Quote
  openingQuote: string;
  openingQuoteSource: string;

  // Meta
  createdAt: string;
  expiresAt: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface EWallet {
  provider: string;            // "GoPay" | "OVO" | "Dana"
  number: string;
  qrCodeUrl?: string;
}

export interface RSVPEntry {
  id: string;
  weddingSlug: string;
  guestName: string;
  attendance: "hadir" | "tidak_hadir" | "mungkin";
  guestCount: number;
  message: string;
  createdAt: string;
}
