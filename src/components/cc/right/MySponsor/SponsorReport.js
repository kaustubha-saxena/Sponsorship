import React from 'react'
import { useEffect, useState } from "react";


const SponsorReport = ({ mySponsors }) => {
console.log(mySponsors,"report");

  const [totalSponsorship, settotalSponsorship] = useState(0)
  const [totalSponsors, setTotalSponsors] = useState(0)
  const [inKind, setinKind] = useState(0)
  const [incash, setIncash] = useState(0)

useEffect(() => {
  updateStats();
}, [mySponsors]); 

  const updateStats = () => {
  // Default stats object
  const stats = {
    total: 0,
    count: 0,
    inkind: 0,
    cash: 0,
  };

  // Safety check
  if (!Array.isArray(mySponsors) || mySponsors.length === 0) {
    settotalSponsorship(0);
    setTotalSponsors(0);
    setinKind(0);
    setIncash(0);
    return;
  }

  mySponsors.forEach((sponsor) => {
    // Only count completed deals
    if (!sponsor?.dealCompleted) return;

    const amount = Number(sponsor?.ammount) || 0;

    stats.total += amount;
    stats.count += 1;

    if (sponsor?.dealType?.toLowerCase() === "inkind") {
      stats.inkind += amount;
    } else if (sponsor?.dealType?.toLowerCase() === "cash") {
      stats.cash += amount;
    }
  });

  // Update state
  settotalSponsorship(stats.total);
  setTotalSponsors(stats.count);
  setinKind(stats.inkind);
  setIncash(stats.cash);
};


  return (
    <div className="  z-50 top-0 w-full h-[30%] px-6 py-6 bg-gray-50 sticky">





      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

   
        <div className="bg-white rounded-2xl shadow-sm  p-6 flex flex-col justify-between hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">Total Sponosrship</p>

          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            ₹{totalSponsorship}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm  p-6 flex flex-col justify-between hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">Total sponsors</p>
            {/* <span className="text-orange-500 text-xl">✉️</span> */}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            {totalSponsors}
          </h2>
        </div>

        {/* Follow-ups Left */}
        <div
          className={"bg-white rounded-2xl shadow-sm  p-6 flex flex-col justify-between hover:shadow-md transition"}
        >
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">In Kind</p>
          </div>

          <h2 className={`text-3xl font-bold mt-4 
    `}
          >
           ₹{inKind}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm  p-6 flex flex-col justify-between hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">In Cash</p>
            {/* <span className="text-orange-500 text-xl">⏳</span> */}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            ₹{incash}
          </h2>
        </div>



      </div>
    </div>
  );

}

export default SponsorReport
