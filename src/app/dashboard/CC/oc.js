"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function OCButtons({ onSelectOC }) {
  const [ocs, setOcs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOCs = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "==", "oc") // 🔴 make sure role value matches DB
        );

        const snapshot = await getDocs(q);

        const ocList = snapshot.docs.map(doc => ({
          uid: doc.id,
          name: doc.data().name,
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

  if (loading) {
    return <p>Loading OCs...</p>;
  }

  if (ocs.length === 0) {
    return <p>No OCs found</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {ocs.map(oc => (
        <button
          key={oc.uid}
          onClick={() => onSelectOC?.(oc)}
          className="px-4 py-2 rounded-md bg-black text-white hover:bg-zinc-800 transition"
        >
          {oc.name}
        </button>
      ))}
    </div>
  );
}
