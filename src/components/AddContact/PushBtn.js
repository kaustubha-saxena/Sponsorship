"use client";

import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function PushBtn({contactForm, toggleForm}) {


  const handleAddContact = async () => {
    try {

      if(contactForm.name!="" && contactForm.companyName!="" && contactForm.role!="" && contactForm.linkedin!="") {
      await addDoc(collection(db, "contacts"), {
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        gender: contactForm.gender,
        companyName: contactForm.companyName,
        location: contactForm.location,
        linkedin: contactForm.linkedin,
        role: contactForm.role,
        callMade: contactForm.callMade,
        emailSent: contactForm.emailSent,
        followUpAt: contactForm.followUpDate,
        note: contactForm.notes,
        assignedTo: contactForm.assignedTo, 

      
      });
    } else {
      alert("Please fill in the required fields: Name, Company Name, Role");
      return;
    }

      // alert("Contact added successfully ");
    } catch (error) {
      console.error("Error adding contact:", error);
      // alert("Failed to add contact ❌");
    }
  };

  return (
    
    <button
      onClick={() => {
        handleAddContact();
        toggleForm(); // Close the form after saving
      }}
      className="px-4 py-2 bg-amber-600 text-white rounded-md cursor-pointer  hover:bg-amber-700"
    >
      Save Contact
    </button>
  );
}


