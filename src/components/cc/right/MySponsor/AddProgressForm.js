"use client";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { useState } from "react";

export default function AddProgressForm({id, setToggleForm, toggleForm }) {
  const [formData, setFormData] = useState({
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
  <div className="relative w-full  bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition-all duration-300">

    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Add Progress Update
      </h3>

      <button
        onClick={handleToggle}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        ✕
      </button>
    </div>

    <form onSubmit={handleUpdate} className="space-y-5">

      {/* Heading */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Heading
        </label>
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Enter progress title"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
          placeholder="Enter details..."
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required={!formData.dealCompleted}
          disabled={formData.dealCompleted}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:text-gray-400"
        />
      </div>

      {/* Deal Completed Section */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
        <div>
          <p className="text-sm font-medium text-gray-700">
            Mark Deal as Completed
          </p>
          <p className="text-xs text-gray-500">
            This will disable the date field
          </p>
        </div>

        <input
          type="checkbox"
          name="dealCompleted"
          checked={formData.dealCompleted}
          onChange={handleChange}
          className="w-5 h-5 accent-blue-600 cursor-pointer"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">

        <button
          type="button"
          onClick={handleToggle}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 hover:bg-gray-200 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm hover:shadow-md"
        >
          Save Progress
        </button>

      </div>
    </form>
  </div>
);
}
