import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a file to Firebase Storage under weddings/{uid}/{path}
 * Returns the public download URL.
 */
export async function uploadFile(
  uid: string,
  file: File,
  path: string
): Promise<string> {
  const storageRef = ref(storage, `weddings/${uid}/${path}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

/**
 * Generate a unique filename with timestamp to avoid collisions.
 */
export function generateFileName(original: string): string {
  const ext = original.split(".").pop();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
}
