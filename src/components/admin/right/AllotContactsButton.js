"use client";

import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";

export default function AllotContactsButton() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 const allotContactsEqually = async () => {

  setLoading(true);
  setMessage("");

  try {

    const ocQuery = query(
      collection(db, "users"),
      where("role", "==", "oc")
    );

    const ocSnapshot = await getDocs(ocQuery);

    const ocs = ocSnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    }));

    if (ocs.length === 0) {
      setMessage("No OCs found");
      setLoading(false);
      return;
    }

    const batchSize = 500;
    let assignedCount = 0;

    while (true) {

      const { data: contacts, error } = await supabase
        .from("contacts")
        .select("id")
        .is("assignedTo", null)
        .limit(batchSize);

      if (error) throw error;

      if (!contacts || contacts.length === 0) break;

      const updates = contacts.map((contact, index) => {

        const ocIndex = (assignedCount + index) % ocs.length;
        const assignedOC = ocs[ocIndex];

        return supabase
          .from("contacts")
          .update({ assignedTo: assignedOC.uid })
          .eq("id", contact.id);

      });

      await Promise.all(updates);

      assignedCount += contacts.length;

    }

    setMessage("Contacts allotted successfully 🎉");

  } catch (error) {

    console.error("Allotment Error:", error);
    setMessage("Something went wrong");

  }

  setLoading(false);
};
  return (
    <div className="w-full h-full hover:cursor-pointer">

      <button
        onClick={allotContactsEqually}
        disabled={loading}
        className="px-4 py-2 w-full h-full hover:cursor-pointer  text-black text-lg   disabled:opacity-50"
      >
        {loading ? "Allotting..." : "Allot Contacts"}
      {message && (
        <p className="mt-4 text-sm text-green-600">{message}</p>
      )}
      </button>


    </div>
  );
}