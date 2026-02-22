"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";

export default function TransferContactsBetweenOCs() {
  const [ocs, setOcs] = useState([]);
  const [fromOC, setFromOC] = useState("");
  const [toOC, setToOC] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔥 Fetch OCs from Firebase
  useEffect(() => {
    const fetchOCs = async () => {
      try {
        const ocQuery = query(
          collection(db, "users"),
          where("role", "==", "oc")
        );

        const snapshot = await getDocs(ocQuery);

        const ocList = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));

        setOcs(ocList);
      } catch (error) {
        console.error("Error fetching OCs:", error);
      }
    };

    fetchOCs();
  }, []);

  // 🔥 Transfer Contacts
  const transferContacts = async () => {
    if (!fromOC || !toOC) {
      setMessage("Please select both OCs");
      return;
    }

    if (fromOC === toOC) {
      setMessage("Both OCs cannot be the same");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ Fetch contacts assigned to FROM OC
      const { data: contacts, error } = await supabase
        .from("contacts")
        .select("id")
        .eq("assignedTo", fromOC);

      if (error) throw error;

      if (!contacts || contacts.length === 0) {
        setMessage("No contacts found for selected OC");
        setLoading(false);
        return;
      }

      // 2️⃣ Update all contacts to TO OC
      const updatePromises = contacts.map((contact) =>
        supabase
          .from("contacts")
          .update({ assignedTo: toOC })
          .eq("id", contact.id)
      );

      await Promise.all(updatePromises);

      setMessage("Contacts transferred successfully 🎉");
    } catch (error) {
      console.error("Transfer Error:", error);
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 text-black bg-white rounded-xl shadow-md border w-[400px]">
      <h3 className="text-lg font-semibold mb-4">
        Transfer Contacts Between OCs
      </h3>

      {/* From OC */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          From OC
        </label>
        <select
          value={fromOC}
          onChange={(e) => setFromOC(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select OC</option>
          {ocs.map((oc) => (
            <option key={oc.uid} value={oc.uid}>
              {oc.name}
            </option>
          ))}
        </select>
      </div>

      {/* To OC */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          To OC
        </label>
        <select
          value={toOC}
          onChange={(e) => setToOC(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select OC</option>
          {ocs.map((oc) => (
            <option key={oc.uid} value={oc.uid}>
              {oc.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={transferContacts}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Transferring..." : "Transfer Contacts"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}