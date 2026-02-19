"use client";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { useState } from "react";

export default function AddSponsor({id, setToggleForm, toggleForm }) {
  const [formData, setFormData] = useState({
    company:"",
    assignedTo:"",
    assignedOC:"",
    heading: "",
    notes: "",
    date: "",
    dealCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


 const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    await updateDoc(doc(db, "sponsorProgress", id), {
      progressHeading: arrayUnion(formData.heading),
      progressNotes: arrayUnion(formData.notes),
      progressDates: arrayUnion(formData.date),
    });

    console.log("Updated successfully");

    setFormData({
      heading: "",
      notes: "",
      date: "",
      dealCompleted: false,
    });

    setToggleForm(false);

  } catch (error) {
    console.error("Update failed:", error);
  }
};

  const handleToggle = () => {
    setToggleForm(!toggleForm);
  }
  return (
    <div className="absolute z-20 right-0 mt-6 bg-white p-6 rounded-xl shadow-md border">
      <h3 className="text-lg font-semibold mb-4">Add Progress Update</h3>

     <form onSubmit={handleUpdate} className="space-y-4">

        {/* Heading */}
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
            required={!formData.dealCompleted}
            disabled={formData.dealCompleted}
            className="w-full border rounded-lg p-2    disabled:bg-gray-100"
          />
        </div>

        {/* Deal Completed Checkbox */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            name="dealCompleted"
            checked={formData.dealCompleted}
            onChange={handleChange}
            className="w-4 h-4 accent-green-500"
          />
          <label className="text-sm font-medium">
            Mark Deal as Completed
          </label>
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
            Save Progress
          </button>
        </div>
      </form>
    </div>
  );
}
