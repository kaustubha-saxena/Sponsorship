



"use client";

import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AllotContactsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const allotContactsEqually = async () => {
    setLoading(true);
    setMessage("");

    try {
      // 🔥 Fetch OCs
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

      // 🔥 Fetch All Contacts
      const contactSnapshot = await getDocs(
        collection(db, "contacts")
      );

      const contacts = contactSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (contacts.length === 0) {
        setMessage("No contacts found");
        setLoading(false);
        return;
      }

      // 🔥 Round Robin Distribution
      const batch = writeBatch(db);

      contacts.forEach((contact, index) => {
        const ocIndex = index % ocs.length;
        const assignedOC = ocs[ocIndex];

        const contactRef = doc(db, "contacts", contact.id);

        batch.update(contactRef, {
          assignedTo: assignedOC.uid,
         
        });
      });

      await batch.commit();

      setMessage("Contacts allotted successfully 🎉");
    } catch (error) {
      console.error(error);
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
