"use client";

export default function ProgressBar({ steps = [], currentStep = 0 }) {

    if (!steps || steps.length === 0) {
        return (
            <div className="text-gray-400 text-sm">
                No progress added yet
            </div>
        );
    }

    const progressWidth =
        steps.length === 1
            ? "0%"
            : `${(currentStep / (steps.length - 1)) * 100}%`;

    return (
         <div className="w-full bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="relative flex justify-between items-center">

                {/* Background Line */}
                <div className="absolute top-4 left-0 w-full h-1 bg-white" />

                {/* Active Line */}
                <div
                    className="absolute top-4 left-0 h-1 bg-green-500 transition-all duration-500"
                    style={{ width: progressWidth }}
                />




                <div className="relative flex flex-col items-center group" >
                    {/* Circle */}
                    <div
                        className={`w-8 h-8 rounded-full flex items-center bg-green-500 border-green-500 text-white justify-center border-2 transition-all duration-300 cursor-pointer`}>
                        1
                    </div>

                    {/* Label Below Circle */}
                    <span
                        className={`mt-2 text-sm whitespace-nowrap `}
                    >
                        Call
                    </span>
                </div>









                {steps.map((step, index) => {
                    const isActive = index <= currentStep;

                    return (
                        <div
                            key={index}
                            className="relative flex flex-col items-center group"
                        >
                            {/* Circle */}
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer
                  ${isActive
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "bg-white border-gray-300 text-gray-400"
                                    }
                `}
                            >
                                {index + 1}
                            </div>

                            {/* Hover Card */}
                            <div
                                className="
                  absolute top-12 opacity-0 translate-y-2
                  group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-300
                  bg-white text-black text-sm
                  w-64 p-4 rounded-xl shadow-xl border
                  z-50
                "
                            >
                                <h4 className="font-semibold mb-2">
                                    {step.heading}
                                </h4>

                                <p className="text-gray-600 text-xs leading-relaxed mb-2">
                                    {step.notes}
                                </p>

                                <p className="text-gray-400 text-xs">
                                    {step.date}
                                </p>
                            </div>

                            {/* Label Below Circle */}
                            <span
                                className={`mt-2 text-sm whitespace-nowrap ${isActive
                                        ? "text-black font-medium"
                                        : "text-gray-400"
                                    }`}
                            >
                                {step.heading}
                            </span>
                        </div>
                    );
                })}

                <div className="relative flex flex-col items-center group" >
                    {/* Circle */}
                    <div
                        className={`w-8 h-8 rounded-full flex items-center bg-green-500 border-green-500 text-white justify-center border-2 transition-all duration-300 cursor-pointer`}>
                        1
                    </div>

                    {/* Label Below Circle */}
                    <span
                        className={`mt-2 text-sm whitespace-nowrap `}
                    >
                        MOU
                    </span>
                </div>

            </div>
        </div>
    );
}
