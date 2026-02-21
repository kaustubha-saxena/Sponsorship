"use client";

import React from "react";
import { supabase } from "@/lib/supabase";

export default function PushBtn({ contactForm, toggleForm }) {

  const handleAddContact = async () => {
    try {

      // Validation
      if (
        !contactForm.name ||
        !contactForm.companyName ||
        !contactForm.role
      ) {
        alert("Please fill required fields: Name, Company, Role");
        return;
      }

      const { data, error } = await supabase
        .from("contacts")
        .insert([
          {
            name: contactForm.name,
            email: contactForm.email,
            phone: contactForm.phone,
            gender: contactForm.gender,
            company: contactForm.companyName, // 🔥 mapped correctly
            role: contactForm.role,
            location: contactForm.location,
            linkedin: contactForm.linkedin,
            note: contactForm.notes,

            "assignedTo": contactForm.assignedTo,
            "callMade": contactForm.callMade,
            "callDate": contactForm.callDate || null,
            "emailSent": contactForm.emailSent,
            "emailDate": contactForm.emailDate || null,
            "followUpAt": contactForm.followUpDate || null,
          },
        ])
        .select();

      if (error) {
        console.error("Insert Error:", error);
        alert("Failed to add contact ❌");
        return;
      }

      console.log("Inserted:", data);
      toggleForm();

    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <button
      onClick={handleAddContact}
      className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
    >
      Save Contact
    </button>
  );
}