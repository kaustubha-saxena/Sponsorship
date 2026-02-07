// "use client";
// import React from 'react'
// import { db } from "@/lib/firebase";
// import { useUser } from "@/app/context/UserContext";  
// import { doc, updateDoc } from "firebase/firestore";
// const Updatebtn = async ({ contactForm, toggleForm }) => {
  
// await updateDoc(doc(db, "contacts", contactForm), {
//   assignedTo: "Team C",
// });
//   return (
//     <button  className="px-4 py-2 bg-amber-600 text-white rounded-md cursor-pointer  hover:bg-amber-700">
//       update
//     </button>
//   )
// }

// export default Updatebtn

"use client";

import React from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

const Updatebtn = ({ contactForm,uid, toggleForm }) => {


  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "contacts", uid), {
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

      toggleForm?.(); 
      console.log("Updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <button
      onClick={handleUpdate}
      className="px-4 py-2 bg-amber-600 text-white rounded-md cursor-pointer hover:bg-amber-700"
    >
      Update
    </button>
  );
};

export default Updatebtn;
