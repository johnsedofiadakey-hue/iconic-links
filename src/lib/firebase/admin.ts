import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  if (process.env.FIREBASE_PRIVATE_KEY) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Handle newline characters in the private key correctly
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    try {
      // Try to initialize using Application Default Credentials (ADC)
      // This is the default behavior on GCP (Cloud Functions, Cloud Run)
      initializeApp();
    } catch (error) {
      // Fallback for Next.js build step or local dev without credentials
      initializeApp({ projectId: 'iconic-links' });
    }
  }
}

const adminAuth = getAuth();
export { adminAuth };
