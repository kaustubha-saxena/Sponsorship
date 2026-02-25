"use client";
import { supabase } from "@/lib/supabase";

import { useState } from "react";

export default function AddProgressForm({ id, setToggleForm, toggleForm, dealCompleted, setdealCompleted }) {
  const [formData, setFormData] = useState({
    heading: "",
    notes: "",
    date: "",
    dealCompleted: false,
    inCash: false,
    inKind: false,
    amount: "",
  });

const handleChange = (e) => {
  const { name, type, checked, value } = e.target;

  if (name === "inCash" && checked) {
    setFormData((prev) => ({
      ...prev,
      inCash: true,
      inKind: false,
    }));
    return;
  }

  if (name === "inKind" && checked) {
    setFormData((prev) => ({
      ...prev,
      inCash: false,
      inKind: true,
    }));
    return;
  }

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
      new_date: formData.date || null, 
      new_deal_completed: formData.dealCompleted,
      new_deal_type: formData.inCash
        ? "cash"
        : formData.inKind
        ? "kind"
        : "none",
      new_amount: formData.inCash
        ? Number(formData.amount) || 0
        : 0,
    });

    if (error) {
      console.error("Supabase Error:", error);
      return;
    }

    console.log("Updated successfully ✅", data);

    setFormData({
      heading: "",
      notes: "",
      date: "",
      dealCompleted: false,
      inCash: false,
      inKind: false,
      amount: "",
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
          
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition "
          />
        </div>

        {/* Deal Completed Section */}
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">

          {/* Deal Completed */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Mark Deal as Completed
              </p>
              {/* <p className="text-xs text-gray-500">
                This will disable the date field
              </p> */}
            </div>

            <input
              type="checkbox"
              name="dealCompleted"
              checked={formData.dealCompleted}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Show Only If Deal Completed */}
          {formData.dealCompleted && (
            <div className="flex flex-col gap-4 pl-2 border-l-2 border-blue-200">

              {/* In Cash */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">In Cash</p>
                <input
                  type="checkbox"
                  name="inCash"
                  checked={formData.inCash}
                  onChange={handleChange}
                  className="w-5 h-5 accent-green-600 cursor-pointer"
                />
              </div>

              {/* In Kind */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">In Kind</p>
                <input
                  type="checkbox"
                  name="inKind"
                  checked={formData.inKind}
                  onChange={handleChange}
                  className="w-5 h-5 accent-purple-600 cursor-pointer"
                />
              </div>

             
            
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">
                    Enter Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              

            </div>
          )}

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
