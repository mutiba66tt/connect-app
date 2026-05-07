import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAH096kUZeP4ahpxP6bFx1K_VMSqM2arLs",
  authDomain: "connectapp-64759.firebaseapp.com",
  projectId: "connectapp-64759",
  storageBucket: "connectapp-64759.firebasestorage.app",
  messagingSenderId: "343257610921",
  appId: "1:343257610921:web:5905018393a5df9c1587b8",
  measurementId: "G-GEYJYZ6J4X",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
