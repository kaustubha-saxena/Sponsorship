"use client";

import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddContactBtn(user) {

  const handleAddContact = async () => {
    try {
      await addDoc(collection(db, "contacts"), {
        name: "Random Swiggy",
        email: "randomswiggy@gmail.com",
        phone: "+91 9876543210",
        gender: "Male",
        companyName: "Swiggy",
        location: "Bangalore",
        linkedin: "https://linkedin.com/in/randomswiggy",
        role: "Manager",

        // CRM fields
        callMade: false,
        emailSent: false,
        followUpAt: new Date("2024-02-28"),
        note: "Interested in partnership opportunities.",
        assignedTo: "SOME_OC_UID", 
        createdAt: new Date(),
      });

      // alert("Contact added successfully ");
    } catch (error) {
      console.error("Error adding contact:", error);
      // alert("Failed to add contact ❌");
    }
  };

  return (
    <button
      onClick={handleAddContact}
      className="px-4 py-2 bg-amber-600 text-white rounded-md"
    >
      Click me
    </button>
  );
}
