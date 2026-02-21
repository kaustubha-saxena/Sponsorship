import React, { useState } from "react";
import ProgressBar2 from "./Progressbar2";
import AddProgressForm from "./AddProgressForm";
import { Plus, Building2, User } from "lucide-react";

const ProgressBarBox2 = ({ sponsor }) => {
  const nodes = (sponsor.progressHeading || []).map((heading, index) => ({
    heading,
    notes: sponsor.progressNotes?.[index] || "",
    date: sponsor.progressDates?.[index] || "",
  }));

  const [toggleForm, setToggleForm] = useState(false);

  const handleToggle = () => {
    setToggleForm(!toggleForm);
  };

  return (
    <div
      className="relative w-full 
      bg-slate-800 
      border border-slate-600/40 
      rounded-2xl 
      p-6 
      shadow-md 
      hover:shadow-lg 
      transition-all duration-300"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-6">
        {/* Sponsor Info */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/15 rounded-xl">
            <Building2 size={20} className="text-blue-500" />
          </div>

          <div>
            <h3 className="font-semibold text-lg text-slate-100 tracking-wide">
              {sponsor.company}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
              <User size={14} />
              <span>
                Assigned to:{" "}
                <span className="text-blue-400 font-medium">
                  {sponsor.assignedOC}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 
          px-4 py-2 
          text-sm font-medium 
          bg-blue-500 
          hover:bg-blue-600 
          rounded-xl 
          text-white 
          transition-all duration-200 
          shadow-sm hover:shadow-md"
        >
          <Plus size={16} />
          Add Progress
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-700 p-4 rounded-xl border border-slate-600/30">
        <ProgressBar2 steps={nodes} currentStep={1} />
      </div>

      {/* Form Toggle */}
      {toggleForm && (
        <div className="mt-6 p-4 bg-slate-700 rounded-xl border border-slate-600/30">
          <AddProgressForm
            id={sponsor.id}
            setToggleForm={setToggleForm}
            toggleForm={toggleForm}
          />
        </div>
      )}
    </div>
  );
};

export default ProgressBarBox2;