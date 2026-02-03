"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, allowedRole }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          router.replace("/login");
          return;
        }

        const { role } = snap.data();

        if (role !== allowedRole) {
          router.replace("/unauthorized");
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("AUTH GUARD ERROR:", err);
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router, allowedRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking access...</p>
      </div>
    );
  }

  return children;
}
