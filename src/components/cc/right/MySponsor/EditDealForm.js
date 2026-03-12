"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useEffect } from "react";
export default function EditDealForm({
  id,
  setToggleForm,
  toggleForm,
  sponsor,
  setdealCompleted
}) {
const [formData, setFormData] = useState({
  dealCompleted: sponsor?.dealCompleted || false,
  inCash: sponsor?.dealType === "cash",
  inKind: sponsor?.dealType === "kind",
  amount: sponsor?.ammount || "",
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

    try {

      const { error } = await supabase
        .from("sponsorProgress") // change if needed
        .update({
          dealCompleted: formData.dealCompleted,
          dealType: formData.inCash
            ? "cash"
            : formData.inKind
            ? "kind"
            : "none",
          ammount: formData.inCash
            ? Number(formData.amount) || 0
            : 0,
        })
        .eq("id", id);

      if (error) {
        
        return;
      }

      setdealCompleted(formData.dealCompleted);
      setToggleForm(false);

    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };

  const handleToggle = () => {
    setToggleForm(!toggleForm);
  };


  useEffect(() => {
  if (sponsor) {
    setFormData({
      dealCompleted: sponsor.dealCompleted || false,
      inCash: sponsor.dealType === "cash",
      inKind: sponsor.dealType === "kind",
      amount: sponsor.ammount || "",
    });
  }
}, [sponsor]);

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Edit Deal Details
        </h3>

        <button
          onClick={handleToggle}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleUpdate} className="space-y-5">

        {/* Deal Completed */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-sm font-medium text-gray-700">
            Mark Deal as Completed
          </p>

          <input
            type="checkbox"
            name="dealCompleted"
            checked={formData.dealCompleted}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-600 cursor-pointer"
          />
        </div>

        {formData.dealCompleted && (
          <div className="flex flex-col gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">

            {/* Cash */}
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

            {/* Kind */}
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

            {/* Amount */}
            {formData.inCash && (
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">
                  Enter Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

          </div>
        )}

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
            Update Deal
          </button>

        </div>

      </form>
    </div>
  );
}