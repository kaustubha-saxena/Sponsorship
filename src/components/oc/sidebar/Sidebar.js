"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LogoutButton from "@/components/LogoutButton";
import Followups from "./Followups";
import { useUser } from "@/app/context/UserContext";

export default function Sidebar() {
  
  const {user } = useUser();

  // useEffect(() => {
  //   const fetchOCs = async () => {
  //     try {
  //       const q = query(
  //         collection(db, "contacts"),
  //         where(),
  //         where("assignedTo", "==", `${user ? user.uid : ""}`)
  //       );

  //       const snapshot = await getDocs(q);

  //       const ocList = snapshot.docs.map(doc => ({
  //         uid: doc.id,
  //         ...doc.data(),
  //       }));

  //       setOcs(ocList);
  //     } catch (error) {
  //       console.error("Error fetching OCs:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOCs();
  // }, []);

  return (
    <aside className="w-1/6 relative bg-[#0B1324] text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Welcome {user ? user.name : "Guest"}</h2>

      <nav className="space-y-4 ">
        
      </nav>
<Followups/>  
      <div className="absolute bottom-0 left-0 right-0  w-full h-12">
      <LogoutButton  />
      </div>
    </aside>
  );
}
