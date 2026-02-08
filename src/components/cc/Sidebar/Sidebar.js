// "use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LogoutButton from "@/components/LogoutButton";
import OCbox from "./OCbox";

import AddContactBtn from "@/components/AddContact/PushBtn";
import { useUser } from "@/app/context/UserContext";

export default function Sidebar({selectedOCid, setSelectedOCid}) {
// console.log("oooooo", ocs);
const {user}= useUser();
  const [ocs, setOcs] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      } catch (error) {
        console.error("Error fetching OCs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOCs();
  }, []);

  return (
    <aside className="w-64 relative bg-[#0B1324] text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">{user?.name || "User"}</h2>


      <nav className="space-y-4 ">
        <p className="text-gray-400 text-xs">ORGANIZING COMMITTEES</p>

        {loading && (
          <p className="text-xs text-gray-400">Loading OCs...</p>
        )}

        {!loading && ocs.length === 0 && (
          <p className="text-xs text-gray-400">No OCs found</p>
        )}

        {!loading &&
          ocs.map((item) => (
            <OCbox key={item.uid} item={item} setSelectedOCid={setSelectedOCid} />
          ))}
      </nav>
      <div className="absolute bottom-0  left-0 right-0  w-full h-12">
            <LogoutButton  />
            </div>
    </aside>
  );
}
