"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/cc/Sidebar/Sidebar";
import Right from "@/components/cc/right/Right";
import { useUser } from "@/app/context/UserContext";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function CCPage() {

  const [selectedOCid, setSelectedOCid] = useState("");
  const [ocs, setOcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
const {user} = useUser();

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

 useEffect(() => { 
      const fetchOCs = async () => {
        try {
          const q = query(
            collection(db, "users"),
            where("role", "==", "oc") 
          );
  
          const snapshot = await getDocs(q);
  
          const ocList = snapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data(),
          }));
  
          setOcs(ocList);
          console.log("list", ocList);
          
        } catch (error) {
          console.error("Error fetching OCs:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOCs();
      }, []);

  return (
    <ProtectedRoute allowedRole="cc">
      <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <Sidebar selectedOCid={selectedOCid} setSelectedOCid={setSelectedOCid } />

<Right selectedOCid={selectedOCid} />

        {/* <div className="p-6">
          <p className="text-lg">
            Welcome{userName ? `, ${userName}` : ""} 👋
          </p>
        </div> */}
      </div>
    </ProtectedRoute>
  );
}
