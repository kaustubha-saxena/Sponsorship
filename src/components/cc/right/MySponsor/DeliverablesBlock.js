"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Trash2, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function DeliverablesCard({ sponsor }) {
  const [open, setOpen] = useState(false);
  const [deliverablesArray, setDeliverablesArray] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  /* ===============================
     Sync sponsor → local state
  =============================== */
  useEffect(() => {
    if (!sponsor) return;

    // Ensure it is ALWAYS an array
    if (Array.isArray(sponsor.deliverables)) {
      setDeliverablesArray(sponsor.deliverables);
    } else {
      setDeliverablesArray([]);
    }
  }, [sponsor]);

  /* ===============================
     Close dropdown on outside click
  =============================== */
  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===============================
     Update DB
  =============================== */
  const updateDeliverablesInDB = async () => {
    if (!sponsor?.id) return;

    setLoading(true);

    const safeArray = [...deliverablesArray]; // ensure array copy

    const { error } = await supabase
      .from("sponsorProgress")
      .update({
        deliverables: safeArray,
        
      })
      .eq("id", sponsor.id);

    if (error) {
      // console.error("Update error:", error.message);
    }

    setLoading(false);
  };

  /* ===============================
     Add Deliverable
  =============================== */
  const handleAdd = () => {
    if (!newItem.trim()) return;

    setDeliverablesArray((prev) => [...prev, newItem.trim()]);
    setNewItem("");
  };

  /* ===============================
     Delete Deliverable
  =============================== */
  const handleDelete = (index) => {
    setDeliverablesArray((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="relative inline-block" ref={boxRef}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-3 cursor-pointer hover:bg-gray-50 transition flex items-center gap-2"
      >
        <h3 className="text-sm font-semibold">Deliverables</h3>
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          size={18}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-[-50px] z-99 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-5 z-50">
          
          {/* Add Section */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add deliverable..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* List */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {deliverablesArray.length === 0 && (
              <p className="text-sm text-gray-400 text-center">
                No deliverables yet
              </p>
            )}

            {deliverablesArray.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50"
              >
                <p className="text-sm font-medium">{item}</p>

                <button
                  onClick={() => handleDelete(index)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Update Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={updateDeliverablesInDB}
              disabled={loading}
              className={`px-4 py-2 rounded-xl text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}