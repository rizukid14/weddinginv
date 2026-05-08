import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/upload
 * Uploads a file to Vercel Blob from the server side — CORS-safe.
 * 
 * Expects multipart/form-data with:
 *   - file: File
 *   - path: string  (e.g. "weddings/{uid}/groomPhoto/filename.png")
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const path = formData.get("path") as string | null;

    if (!file || !path) {
      return NextResponse.json(
        { error: "Missing file or path" },
        { status: 400 }
      );
    }

    // Validate file size (max 20MB)
    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 20MB." },
        { status: 413 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg", "image/png", "image/webp", "image/gif",
      "audio/mpeg", "audio/mp3", "audio/wav",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed." },
        { status: 415 }
      );
    }

    const blob = await put(path, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("[Upload API] Error:", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
