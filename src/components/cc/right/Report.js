import React from 'react'
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@/app/context/UserContext";
import Data from '@/components/oc/Data';
const Report = (assignedContacts) => {
  const { user } = useUser();


  const [emailCount, setEmailCount] = useState(0)
  const [callCount, setCallCount] = useState(0)
  const [followupsRemaining, setFollowupsRemaining] = useState(0)
  const [mode, setMode] = useState("total"); // "total" | "range"
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [date, setDate] = useState()

  const [selected, setSelected] = useState("Monthly");

  const handleChange = (e) => {
    setdate = e.target.value
  };

  // return (
  //   <div className='w-full min-h-50  bg-green-500 text-black'>
  //   <div className='flex justify-center items-center gap-4 h-full'>
  //     <div className='rounded-2xl bg-red-300 w-[20%] h-full '>
  //       <div>
  //         Total Calls
  //       </div>
  //       <div>
  //         100
  //       </div>
  //     </div>
  //     <div className='rounded-2xl bg-red-300 w-[20%] h-[80%] '>
  //       <div>
  //         Total Calls
  //       </div>
  //       <div>
  //         100
  //       </div>
  //     </div>
  //     <div className='rounded-2xl bg-red-300 w-[20%] h-[80%] '>
  //       <div>
  //         Total Calls
  //       </div>
  //       <div>
  //         100
  //       </div>
  //     </div>
  //     <div className='rounded-2xl bg-red-300 w-[20%] h-[80%] '>
  //       <div>
  //         Total Calls
  //       </div>
  //       <div>
  //         100
  //       </div>
  //     </div>
  //   </div>
  //   </div>
  // )
  return (
    <div className=" absolute w-full h-[30%] px-6 py-6 bg-red-300">



    
      <div className="flex items-center gap-4 bg-gray-100  rounded-xl w-fit">

      {/* Total Button */}
      <button
        onClick={() => setMode("total")}
        className={`px-5 py-2 rounded-lg font-medium transition
          ${
            mode === "total"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border"
          }`}
      >
        Total (All Time)
      </button>

      {/* Date Range Button */}
      <button
        onClick={() => setMode("range")}
        className={`px-5 py-2 rounded-lg font-medium transition
          ${
            mode === "range"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border"
          }`}
      >
        Date Range
      </button>

      {/* Date Inputs (Only Show When Range Selected) */}
      {mode === "range" && (
        <div className="flex items-center gap-3 ml-4">

          
          <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
            <Calendar size={16} className="text-gray-500" />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="outline-none text-sm"
            />
          </div>

          <span className="text-gray-500">to</span>

          {/* To */}
          <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
            <Calendar size={16} className="text-gray-500" />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="outline-none text-sm"
            />
          </div>

        </div>
      )}
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Calls */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">Total Calls</p>

          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            {callCount}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">Total Emails</p>
            {/* <span className="text-orange-500 text-xl">✉️</span> */}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            {emailCount}
          </h2>
        </div>

        {/* Follow-ups Left */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">Follow-ups Left</p>
            {/* <span className="text-orange-500 text-xl">⏳</span> */}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            {followupsRemaining}
          </h2>
        </div>

        {/* OC Members */}

      </div>
    </div>
  );

}

export default Report
