"use client";

import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";

export default function AllotContactsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const allotContactsEqually = async () => {
    setLoading(true);
    setMessage("");

    try {
      // 🔥 1️⃣ Fetch OCs from Firebase
      const ocQuery = query(
        collection(db, "users"),
        where("role", "==", "oc")
      );

      const ocSnapshot = await getDocs(ocQuery);

      const ocs = ocSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      if (ocs.length === 0) {
        setMessage("No OCs found");
        setLoading(false);
        return;
      }

      // 🔥 2️⃣ Fetch ONLY unassigned contacts from Supabase
      const { data: contacts, error } = await supabase
        .from("contacts")
        .select("id")
        .is("assignedTo", null); // 👈 important

      if (error) throw error;

      if (!contacts || contacts.length === 0) {
        setMessage("No unassigned contacts found");
        setLoading(false);
        return;
      }

      // 🔥 3️⃣ Round Robin Distribution
      const updatePromises = contacts.map((contact, index) => {
        const ocIndex = index % ocs.length;
        const assignedOC = ocs[ocIndex];

        return supabase
          .from("contacts")
          .update({ assignedTo: assignedOC.uid }) // must match column case
          .eq("id", contact.id);
      });

      await Promise.all(updatePromises);

      setMessage("Contacts allotted successfully 🎉");
    } catch (error) {
      console.error("Allotment Error:", error);
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={allotContactsEqually}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Allotting..." : "Allot Contacts"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-green-600">{message}</p>
      )}
    </div>
  );
}