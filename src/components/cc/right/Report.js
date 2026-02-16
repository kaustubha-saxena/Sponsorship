import React from 'react'
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Calendar } from "lucide-react";
import { useUser } from "@/app/context/UserContext";

const Report = ({assignedContacts}) => {
 
  
const today = new Date().toISOString().split("T")[0];
  const { user } = useUser();


  

  const [mode, setMode] = useState("total"); // "total" | "range"
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [date, setDate] = useState()
  const [callsMade, setCallsMade] = useState(0)
  const [emailsSend, setEmailsSend] = useState(0)
  const [followUpsleft, setFollowUpsleft] = useState(0)
  const [totalContacts, setTotalContacts] = useState(0)
  const [selected, setSelected] = useState("Monthly");


  useEffect(() => {

    setTotalContacts(assignedContacts.length)
    setCallsMade(
      assignedContacts.filter(contact => contact.callMade === true).length
    );
    setEmailsSend(
      assignedContacts.filter(contact => contact.emailSent === true).length
    );
   setFollowUpsleft(
  assignedContacts.filter(contact => {
    if (!contact.followUpAt) return false;

    const today = new Date();
    const followUpDate = new Date(contact.followUpAt);

    return followUpDate < today;
  }).length

  
);
if(mode=="range"){
  setEmailsSend(
  assignedContacts.filter(contact => {
    if (!contact.emailDate) return false;

    if (fromDate && contact.emailDate < fromDate) return false;
    if (toDate && contact.emailDate > toDate) return false;

    return true;
  }).length
);
setCallsMade(
  assignedContacts.filter(contact => {
    if (!contact.callMade || !contact.callDate) return false;

    if (fromDate && contact.callDate < fromDate) return false;
    if (toDate && contact.callDate > toDate) return false;

    return true;
  }).length
);

}

  }, [assignedContacts, toDate,fromDate,mode])

  return (
    <div className=" absolute w-full h-[30%] px-6 py-6 bg-gray-50">




      <div className="flex items-center gap-4 bg-gray-50 pb-4 rounded-xl w-fit">

        {/* Total Button */}
        <button
          onClick={() => setMode("total")}
          className={`px-5 py-2 rounded-lg font-medium transition
          ${mode === "total"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border"
            }`}
        >
          Till Date
        </button>

        {/* Date Range Button */}
        <button
          onClick={() => setMode("range")}
          className={`px-5 py-2 rounded-lg font-medium transition
          ${mode === "range"
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
                onChange={(e) => {setToDate(e.target.value)
                 
                  
                }}
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
            {callsMade}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">Total Emails</p>
            {/* <span className="text-orange-500 text-xl">✉️</span> */}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            {emailsSend}
          </h2>
        </div>

        {/* Follow-ups Left */}
       <div
  className={`rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition
  ${followUpsleft > 1 ? "bg-red-50 border-red-200" : "bg-white"}`}
>
  <div className="flex justify-between items-center">
    <p className="text-gray-500 text-sm font-medium">Follow-ups Left</p>
  </div>

  <h2 className={`text-3xl font-bold mt-4 
    ${followUpsleft > 1 ? "text-red-600" : "text-gray-900"}`}
  >
    {followUpsleft}
  </h2>
</div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">Total Contacts</p>
            {/* <span className="text-orange-500 text-xl">⏳</span> */}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            {totalContacts}
          </h2>
        </div>



      </div>
    </div>
  );

}

export default Report
