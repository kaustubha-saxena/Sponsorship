"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function AddProgressForm({ id, setToggleForm, toggleForm, dealCompleted, setdealCompleted }) {

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
    setdealCompleted(formData.dealCompleted);

    try {
      const { data, error } = await supabase.rpc("append_progress", {
        row_id: id,
        new_heading: formData.heading,
        new_notes: formData.notes,
        new_date: formData.date,
        new_deal_completed: formData.dealCompleted,
      });

      if (error) {
        // console.error("Supabase Error:", error);
        return;
      }

      console.log("Updated successfully ✅", data);

      setFormData({
        heading: "",
        notes: "",
        date: "",
        dealCompleted: false,
      });

      setToggleForm(false);

    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };

  const handleToggle = () => {
    setToggleForm(!toggleForm);
  };

  return (
    <div className="absolute z-20 right-0 mt-6 bg-white p-6 rounded-xl shadow-md border">
      <h3 className="text-lg font-semibold mb-4">Add Progress Update</h3>

      <form onSubmit={handleUpdate} className="space-y-4">

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
            className="w-full border rounded-lg p-2"
          />
        </div>

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
            className="w-full border rounded-lg p-2"
          />
        </div>

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
            className="w-full border rounded-lg p-2 disabled:bg-gray-100"
          />
        </div>

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

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleToggle}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Save Progress
          </button>
        </div>

      </form>
    </div>
  );
}