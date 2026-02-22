"use client";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@/app/context/UserContext";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
export default function AddSponsor({ handleToggle }) {

  const { user } = useUser();
  const [formData, setFormData] = useState({
    company: "",
    assignedTo: user ? user.uid : "",
    assignedOC: user ? user.name : "",
    heading: "",
    notes: "",
    date: "",

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  // const addSponsor = async (e) => {
  //   e.preventDefault();

  //   if (!user) return;

  //   try {
  //     await addDoc(collection(db, "sponsorProgress"), {
  //       company: formData.company,
  //       assignedTo: user.uid,
  //       assignedOC: user.name,

  //       progressHeading: [formData.heading],   // store as array
  //       progressNotes: [formData.notes],
  //       progressDates: [formData.date],
  //       dealCompleted: false,

  //     });

  //     console.log("Sponsor added successfully ✅");

  //     // Reset form
  //     setFormData({
  //       company: "",
  //       heading: "",
  //       notes: "",
  //       date: "",
  //       dealCompleted: false,
  //     });

  //     handleToggle(); // close modal

  //   } catch (error) {
  //     console.error("Error adding sponsor:", error);
  //   }
  // };


   const addSponsor = async (e) => {
    e.preventDefault();

    if (!user) return;
console.log(formData);

    try {
      const { data, error } = await supabase
        .from("sponsorProgress")
        .insert([
          {
            company: formData.company,
            assignedTo: user.uid,
            assignedOC: user.name,
            dealType: null,
            ammount: 0,
            progressHeading: [formData.heading], // Postgres array
            progressNotes: [formData.notes],
            progressDates: [formData.date],

            dealCompleted: false,
          },
        ]);

      if (error) throw error;

      console.log("Sponsor added successfully ✅", data);

      setFormData({
        company: "",
        heading: "",
        notes: "",
        date: "",
      });

      handleToggle();

    } catch (error) {
      console.error("Error adding sponsor:", error);
    }
  };



  //   const addSponsor = async (e) => {
  //     e.preventDefault();

  //     if (!user) return;
  // console.log(formData);

  //     try {
  //       const { data, error } = await supabase
  //         .from("sponsorProgress")
  //         .insert([
  //           {
  //             company: formData.company,
  //             assignedTo: user.uid,
  //             assignedOC: null,
  //             type: null,
  //             amount:0,
  //             progressHeading: [formData.heading], // Postgres array
  //             progressNotes: [formData.notes],
  //             progressDates: [formData.date],

  //             dealCompleted: false,
  //           },
  //         ]);

  //       if (error) throw error;

  //       console.log("Sponsor added successfully ✅", data);

  //       setFormData({
  //         company: "",
  //         heading: "",
  //         notes: "",
  //         date: "",
  //       });

  //       handleToggle();

  //     } catch (error) {
  //       console.error("Error adding sponsor:", error);
  //     }
  //   }; 

  return (
    <div className="absolute top-0 w-full h-screen bg-white/60 left-0 flex justify-center items-center
    ">
      <div className="relative z-20 w-[30%]  mt-6 bg-white p-6 rounded-xl shadow-md border">
        <h3 className="text-lg font-semibold mb-4">Add Sponsor</h3>

        <form onSubmit={addSponsor} className="space-y-4">

          {/* Heading */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2  "
              placeholder="Enter sponsor name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Heading
            </label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2  "
              placeholder="Enter progress title"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border rounded-lg p-2  "
              placeholder="Enter details..."
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required

              className="w-full border rounded-lg p-2    disabled:bg-gray-100"
            />
          </div>


          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleToggle}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
