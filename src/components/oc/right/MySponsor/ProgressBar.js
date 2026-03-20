"use client"; 
import Image from "next/image";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import EditProgressForm from "@/components/cc/right/MySponsor/EditProgressForm";
import { supabase } from "@/lib/supabase";
export default function ProgressBar({ id,
    sponsor,
    steps = [],
    dealCompleted,
    setdealCompleted,
    refreshSponsorReport,
    setRefreshSponsorReport }) {

 const [toggleForm, setToggleForm] = useState(false);
    const [editStep, setEditStep] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    
    if (!steps || steps.length === 0) {
        return (
            <div className="text-gray-400 text-sm">
                No progress added yet
            </div>
        );
    } 

const progressWidth =
  dealCompleted
    ? "100%"
    : steps.length === 1
      ? "50%"
      : `${(steps.length / (steps.length + 1)) * 100}%`;

       const handleDeleteStep = async (index) => {
              try {
      
                  const { data, error } = await supabase
                      .from("sponsorProgress")
                      .select("progressHeading, progressNotes, progressDates")
                      .eq("id", id)
                      .single();
      
                  if (error) throw error;
      
                  const headings = [...data.progressHeading];
                  const notes = [...data.progressNotes];
                  const dates = [...data.progressDates];
      
                  headings.splice(index, 1);
                  notes.splice(index, 1);
                  dates.splice(index, 1);
      
                  const { error: updateError } = await supabase
                      .from("sponsorProgress")
                      .update({
                          progressHeading: headings,
                          progressNotes: notes,
                          progressDates: dates
                      })
                      .eq("id", id);
      
                  if (updateError) throw updateError;
      
                  setRefreshSponsorReport(!refreshSponsorReport);
      
              } catch (err) {
                 
              }
          };
      


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
                            const isActive = false;
        
                            return (
                                <div
                                    key={index}
                                    className="relative flex flex-col items-center group"
                                >
                                    {/* Circle */}
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center bg-green-500 border-green-500 text-white justify-center border-2 transition-all duration-300 cursor-pointer
                          
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
                                        {/* Header with delete icon */}
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold">
                                                {step.heading}
                                            </h4>
        
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditStep(step);
                                                        setEditIndex(index);
                                                        setToggleForm(true);
                                                    }}
                                                    className="text-gray-400 hover:text-blue-500 transition"
                                                >
                                                    <Pencil size={16} />
                                                </button>
        
                                                <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteStep(index);
          }}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 size={16} />
        </button>
                                            </div>
                                        </div>
        
                                        <p className="text-gray-600 text-xs leading-relaxed mb-2">
                                            {step.notes}
                                        </p>
        
                                        <p className="text-gray-400 text-xs">
                                            {step.date}
                                        </p>
                                    </div>
        
                                    {/* Label Below Circle */}
                                    <span
                                        className={`mt-2 text-sm whitespace-nowrap text-black font-medium `}
                                    >
                                        {step.heading}
                                    </span>
                                </div>
                            );
                        })}
        
                        <div className="relative flex flex-col items-center group" >
                            {/* Circle */}
                            <div
                                className={`w-8 h-8 rounded-full flex items-center bg-gray-300 border-gray-300 text-white justify-center border-2 transition-all duration-300 cursor-pointer`}>
        
        
                                {dealCompleted ? <Image
                                    src="/check.png"
                                    alt="tick"
                                    width={32}
                                    height={32}
        
                                /> : <Image
                                    src="/tickUnselected.svg"
                                    alt="tick"
                                    width={32}
                                    height={32}
        
                                />
        
                                }
                            </div>
        
                            {/* Label Below Circle */}
                            <span
                                className={`mt-2 text-sm whitespace-nowrap `}
                            >
                                MOU
                            </span>
                        </div>
        
                    </div>
                    {toggleForm && (
                        <EditProgressForm
                            id={id}
                            sponsor={sponsor}
                            stepData={editStep}
                            stepIndex={editIndex}
                            toggleForm={toggleForm}
                            setToggleForm={setToggleForm}
                            dealCompleted={dealCompleted}
                            setdealCompleted={setdealCompleted}
                            refreshSponsorReport={refreshSponsorReport}
                            setRefreshSponsorReport={setRefreshSponsorReport}
                        />
                    )}
                </div>
    );
}
