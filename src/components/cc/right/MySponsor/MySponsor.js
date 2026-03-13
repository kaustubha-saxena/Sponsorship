"use client";

import React, { useEffect, useState } from "react";
import ProgressBarBox from "./ProgressBarBox";

import ProgressBarBox2 from "./ProgressBarBox2";
import { supabase } from "@/lib/supabase";
import SponsorReport from "./SponsorReport";
import { useUser } from "@/app/context/UserContext";

import AddSponsor from "./AddSponsor";


const MySponsor = () => {
  const [mySponsors, setMySponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleForm, setToggleForm] = useState(false)
  const [dealCompleted, setdealCompleted] = useState(false);

  const { user } = useUser();


  useEffect(() => {
    if (!user) return;

    const fetchAssignedSponsors = async () => {
      try {
        const { data, error } = await supabase
          .from("sponsorProgress") // your table name
          .select("*");




        if (error) throw error;


        setMySponsors(data || []);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedSponsors();
  }, [user]);

  if (loading) {
    return (
      <div className="w-5/6 absolute right-0 p-5">
        Loading sponsors...
      </div>
    );
  }
  const handleToggle = () => {
    setToggleForm(!toggleForm);
  }

  const deleteSponsor = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this sponsor?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("sponsorProgress")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // remove from UI
      setMySponsors((prev) => prev.filter((s) => s.id !== id));

    } catch (err) {
      console.error("Error deleting sponsor:", err);
      alert("Failed to delete sponsor");
    }
  };

  return (
    <div className='bg-gray-50  w-5/6 min-h-full h-full absolute right-0 p-5 '>
      <div className="flex  justify-between items-center  ">
        <h3 className="font-bold text-2xl text-black">Sponsor Progress</h3>
        <button onClick={handleToggle} className="px-3 py-2 font-semibold text-white bg-[#0B1324] rounded-lg cursor-pointer">
          Add Sponsor
        </button>
      </div>
      <SponsorReport mySponsors={mySponsors} />

      <div className="w-full  flex flex-col gap-2 h-[70%] overflow-scroll no-scrollbar ">
        {mySponsors.length === 0 ? (
          <div className="text-gray-500">No Sponsors Assigned</div>
        ) : (
          mySponsors.map((sponsor) => (
            <ProgressBarBox
              key={sponsor.company}
              sponsor={sponsor}

              onDelete={deleteSponsor}
              dealCompleted={sponsor.dealCompleted}
              setdealCompleted={setdealCompleted}
            />

          ))
        )}
      </div>

      <div >
        {toggleForm ? <AddSponsor handleToggle={handleToggle} /> : <></>}

      </div>
    </div>


  );
};

export default MySponsor;
