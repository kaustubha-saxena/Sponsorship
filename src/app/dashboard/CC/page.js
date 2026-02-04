"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Right from "@/components/cc/right/Right";
import { db } from "@/lib/firebase";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/cc/Sidebar/Sidebar";

export default function CCPage() {
  const [userName, setUserName] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserName(userSnap.data().name);
      }
    };

    fetchUserName();
  }, []);

  return (
    <ProtectedRoute allowedRole="cc">
      <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <Sidebar />
     <Right />

          {/* <p className="text-lg">
            Welcome{userName ? `, ${userName}` : ""} 
          </p> */}

        {/* <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              CC Dashboard
            </h1>
          
          </div>
        </div> */}
        
      </div>
    </ProtectedRoute>
  );
}




