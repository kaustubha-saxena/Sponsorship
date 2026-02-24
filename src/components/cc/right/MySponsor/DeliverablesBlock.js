"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Trash2, Plus } from "lucide-react";

export default function DeliverablesCard() {
  const [open, setOpen] = useState(false);
  const [deliverables, setDeliverables] = useState([
    "2 reels for Instagram",
    "1 LinkedIn post",
    "1 blog post",
    "1 YouTube video",
  ]);
  const [newItem, setNewItem] = useState("");

  const boxRef = useRef(null);

  // Close when clicking outside
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

  // Add Deliverable
  const handleAdd = () => {
    if (!newItem.trim()) return;
    setDeliverables((prev) => [...prev, newItem]);
    setNewItem("");
    console.log(deliverables);
  };

  // Delete Deliverable
  const handleDelete = (index) => {
    setDeliverables((prev) =>
      prev.filter((_, i) => i !== index)

    );
    console.log(deliverables);
}    ;

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

      {/* Floating Box */}
      {open && (
        <div className="absolute left-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-5 z-50">
          
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
            {deliverables.length === 0 && (
              <p className="text-sm text-gray-400 text-center">
                No deliverables yet
              </p>
            )}

            {deliverables.map((item, index) => (
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
        </div>
      )}
    </div>
  );
}