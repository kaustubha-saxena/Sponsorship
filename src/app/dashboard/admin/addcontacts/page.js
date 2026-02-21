"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/app/context/UserContext";

export default function AddContact() {
  const { user } = useUser(); // Firebase Auth
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("");

    const reader = new FileReader();

    reader.onload = async (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (!jsonData.length) {
          setMessage("Excel file is empty.");
          setLoading(false);
          return;
        }

        // 🔥 Transform Excel rows safely
        const contactsToInsert = jsonData.map((row) => ({
          name: row.name?.toString().trim() || "",
          email: row.email?.toString().trim() || "",
          phone: row.phone?.toString().trim() || "",
          gender: row.gender?.toString().trim() || "",
          company: row.company?.toString().trim() || "",
          location: row.location?.toString().trim() || "",
          linkedin: row.linkedin?.toString().trim() || "",
          role: row.role?.toString().trim() || "",
          callMade: false,
          emailSent: false,
          followUpAt: null,
          note: "",
          callDate: null,
          emailDate: null,
          assignedTo: null, // intentionally null
        }));

        // 🔥 Insert into Supabase
        const { error } = await supabase
          .from("contacts")
          .insert(contactsToInsert, { returning: "minimal" });

        if (error) {
          console.error("SUPABASE ERROR:", error);
          throw error;
        }

        setMessage(
          `${contactsToInsert.length} contacts uploaded successfully 🎉`
        );
      } catch (err) {
        console.error("Upload Error:", err);
        setMessage("Error uploading file. Check console.");
      }

      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Upload Contacts</h1>

        {message && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded-lg ${
              message.includes("Error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="w-full border p-2 rounded-lg"
        />

        {loading && (
          <p className="mt-3 text-sm text-gray-500">Uploading...</p>
        )}
      </div>
    </div>
  );
}