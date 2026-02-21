"use client";

export default function ProgressBar2({ steps = [] }) {
  if (!steps || steps.length === 0) {
    return (
      <div className="text-slate-400 text-sm text-center py-6">
        No progress added yet
      </div>
    );
  }

  const totalSteps = steps.length;
  const progressWidth =
    totalSteps === 1
      ? "50%"
      : `${(totalSteps / (totalSteps + 1)) * 100}%`;

  return (
    <div className="w-full bg-slate-800 p-6 rounded-2xl border border-slate-600/40 shadow-sm">
      <div className="relative flex justify-between items-start">

        {/* Background Line */}
        <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-500/30" />

        {/* Active Line */}
        <div
          className="absolute top-5 left-0 h-[2px] bg-blue-500 transition-all duration-700"
          style={{ width: progressWidth }}
        />

        {/* Start Node */}
        <StepNode label="Initial Contact" index={1} active />

        {/* Dynamic Steps */}
        {steps.map((step, index) => (
          <StepNode
            key={index}
            label={step.heading}
            index={index + 2}
            step={step}
            active
          />
        ))}

        {/* Final Node */}
        <StepNode label="MOU Signed" index="" />
      </div>
    </div>
  );
}

/* ========================= */
/* Step Node Component */
/* ========================= */

function StepNode({ label, index, step, active }) {
  return (
    <div className="relative flex flex-col items-center group z-10">

      {/* Circle */}
      <div
        className={`
          w-10 h-10 flex items-center justify-center
          rounded-full border-2 text-sm font-semibold
          transition-all duration-300 cursor-pointer
          ${
            active
              ? "bg-blue-500 border-blue-500 text-white shadow-md"
              : "bg-slate-600 border-slate-500 text-slate-300"
          }
          group-hover:scale-105
        `}
      >
        {index}
      </div>

      {/* Label */}
      <span className="mt-3 text-xs text-slate-300 text-center max-w-[90px] leading-tight">
        {label}
      </span>

      {/* Tooltip */}
      {step && (
        <div
          className="
            absolute top-14 opacity-0 translate-y-2
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300
            bg-slate-800 text-slate-200 text-xs
            w-64 p-4 rounded-xl shadow-xl border border-slate-600/40
            z-50
          "
        >
          <h4 className="font-semibold text-sm text-white mb-2">
            {step.heading}
          </h4>

          <p className="text-slate-400 mb-2 leading-relaxed">
            {step.notes || "No notes added"}
          </p>

          <p className="text-blue-400 text-[11px]">
            {step.date || "No date"}
          </p>
        </div>
      )}
    </div>
  );
}