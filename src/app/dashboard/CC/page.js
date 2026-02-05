"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/cc/Sidebar/Sidebar";

export default function CCPage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserName(userSnap.data().name);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ProtectedRoute allowedRole="cc">
      <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <Sidebar />

        <div className="p-6">
          <p className="text-lg">
            Welcome{userName ? `, ${userName}` : ""} 👋
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
