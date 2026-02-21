"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/app/context/UserContext";
import AddSponsor from "./AddSponsor";
import ProgressBarBox from "./ProgressBarBox";

const MySponsor = () => {
  const [mySponsors, setMySponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleForm, setToggleForm] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchAssignedSponsors = async () => {
      try {
        const { data, error } = await supabase
          .from("sponsorProgress") // your table name
          .select("*")
          .eq("assignedTo", user.uid);
         
          

        if (error) throw error;
console.log(data);

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
  };

  return (
    <div className="bg-gray-50 w-5/6 min-h-full absolute right-0 p-5 text-black flex gap-5 flex-col">
      
      <div className="flex justify-end items-center">
        <button
          onClick={handleToggle}
          className="px-3 py-2 font-semibold text-white bg-[#0B1324] rounded-lg cursor-pointer"
        >
          Add Sponsor
        </button>
      </div>

      {mySponsors.length === 0 ? (
        <div className="text-gray-500">No Sponsors Assigned</div>
      ) : (
        mySponsors.map((sponsor) => (
          <ProgressBarBox
            key={sponsor.id}  // ⚠ important change
            sponsor={sponsor}
          />
        ))
      )}

      <div>
        {toggleForm && <AddSponsor handleToggle={handleToggle} />}
      </div>
    </div>
  );
};

export default MySponsor;