import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID
} = process.env;

const firebaseConfig = {
  apiKey: `${NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${NEXT_PUBLIC_FIREBASE_APP_ID}`
};

const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
}

export const storage = getStorage(app);
export const firestore = getFirestore(app);
