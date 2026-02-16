"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { writeBatch, collection, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddContact() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage("");

    const reader = new FileReader(); // ✅ create here (browser only)

    reader.onload = async (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const batch = writeBatch(db);
        const contactsRef = collection(db, "contacts");

        jsonData.forEach((row) => {
          const newDocRef = doc(contactsRef);

          batch.set(newDocRef, {
            name: row.name || "",
            email: row.email || "",
            phone: row.phone || "",
            gender: row.gender || "",
            companyName: row.companyName || "",
            location: row.location || "",
            linkedin: row.linkedin || "",
            role: row.role || "",
            callMade: false,
            emailSent: false,
            followUpAt: "",
            note:"",
            callDate: "",
            emailDate:"",
          });
        });

        await batch.commit();

        setMessage(`${jsonData.length} contacts uploaded successfully 🎉`);
      } catch (error) {
        console.error(error);
        setMessage("Error uploading file");
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
          <div className="mb-4 text-sm bg-green-100 text-green-600 px-4 py-2 rounded-lg">
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
