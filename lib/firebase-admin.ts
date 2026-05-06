import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App | null = null;
let adminDb: Firestore | null = null;

const hasAdminKeys =
  process.env.FIREBASE_ADMIN_PROJECT_ID &&
  process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
  process.env.FIREBASE_ADMIN_PRIVATE_KEY;

if (hasAdminKeys) {
  try {
    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });
    } else {
      adminApp = getApps()[0];
    }
    adminDb = getFirestore(adminApp);
  } catch (err) {
    console.error("Failed to initialize Firebase Admin SDK:", err);
  }
} else {
  console.warn("Firebase Admin credentials missing. Running in local mock fallback mode.");
}

export { adminDb };
export default adminApp;
