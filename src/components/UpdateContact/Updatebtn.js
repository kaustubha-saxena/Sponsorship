import React from "react";
import { supabase } from "@/lib/supabase";

const Updatebtn = ({ contactForm, uid, toggleForm }) => {

  const handleUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .update({
          name: contactForm.name || null,
          email: contactForm.email || null,
          phone: contactForm.phone || null,
          gender: contactForm.gender || null,
          company: contactForm.company || null,
          location: contactForm.location || null,
          linkedin: contactForm.linkedin || null,
          role: contactForm.role || null,

  
          assignedTo: contactForm.assignedTo || "",
          callMade: contactForm.callMade ?? false,
          emailSent: contactForm.emailSent ?? false,
          followUpAt: contactForm.followUpDate || null,
          callDate: contactForm.callDate || null,
          emailDate: contactForm.emailDate || null,

          note: contactForm.notes || null,
        })
        .eq("id", uid)
        .select();

      if (error) {
        console.error("Supabase Update Error:", error);
        return;
      }

      console.log("Updated successfully ✅", data);
      toggleForm?.();

    } catch (error) {
      console.error("Unexpected Error:", error);
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