import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

interface RSVPBody {
  guestName?: string;
  attendance?: "hadir" | "tidak_hadir" | "mungkin";
  guestCount?: number;
  message?: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const body: RSVPBody = await request.json();
    const { guestName, attendance, guestCount = 0, message = "" } = body;

    // 1. Validations
    if (!guestName || guestName.trim().length < 2) {
      return NextResponse.json(
        { error: "Nama lengkap wajib diisi (minimal 2 karakter)" },
        { status: 400 }
      );
    }

    if (!attendance || !["hadir", "tidak_hadir", "mungkin"].includes(attendance)) {
      return NextResponse.json(
        { error: "Status kehadiran wajib diisi dengan benar" },
        { status: 400 }
      );
    }

    const validatedCount = attendance === "hadir" ? Math.max(1, Math.min(5, guestCount)) : 0;

    // 2. Database Commit via Admin SDK (If credential variables exist)
    if (adminDb) {
      const rsvpDocRef = adminDb
        .collection("weddings")
        .doc(slug)
        .collection("rsvp")
        .doc(); // generates automatic ID

      const newEntry = {
        id: rsvpDocRef.id,
        weddingSlug: slug,
        guestName: guestName.trim(),
        attendance,
        guestCount: validatedCount,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };

      await rsvpDocRef.set(newEntry);

      return NextResponse.json(
        { success: true, id: rsvpDocRef.id, data: newEntry },
        { status: 201 }
      );
    }

    // 3. Emulated client response fallback
    const mockEntry = {
      id: `local-server-${Date.now()}`,
      weddingSlug: slug,
      guestName: guestName.trim(),
      attendance,
      guestCount: validatedCount,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        mocked: true,
        message: "Firebase Admin is disabled. Running in high-fidelity mock fallback mode.",
        data: mockEntry,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error processing RSVP submission:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal saat memproses data Anda" },
      { status: 500 }
    );
  }
}
