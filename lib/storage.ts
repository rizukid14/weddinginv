/**
 * Client-side storage utility.
 * Uploads files via the server-side /api/upload route (Vercel Blob).
 * This approach is fully CORS-safe — no direct browser-to-Firebase calls.
 */

/**
 * Upload a file to Vercel Blob via the /api/upload server route.
 * Returns the public CDN URL of the uploaded file.
 */
export async function uploadFile(
  uid: string,
  file: File,
  path: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("path", `weddings/${uid}/${path}`);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Upload failed with status ${response.status}`);
  }

  const { url } = await response.json();
  return url;
}

/**
 * Generate a unique filename with timestamp to avoid collisions.
 */
export function generateFileName(original: string): string {
  const ext = original.split(".").pop();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
}
