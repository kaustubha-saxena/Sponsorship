import React from 'react'
import { db } from "@/lib/firebase";
import { useUser } from "@/app/context/UserContext";  
import { doc, updateDoc } from "firebase/firestore";
const Updatebtn = async ({ contactForm, toggleForm }) => {
  
await updateDoc(doc(db, "contacts", contactForm), {
  assignedTo: "Team C",
});
  return (
    <button  className="px-4 py-2 bg-amber-600 text-white rounded-md cursor-pointer  hover:bg-amber-700">
      update
    </button>
  )
}

export default Updatebtn
