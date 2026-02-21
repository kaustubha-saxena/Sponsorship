"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { supabase } from "@/lib/supabase";

const Followups = () => {
  const { user } = useUser();

  const [followToday, setFollowToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFollowups, setShowFollowups] = useState(false);
const today = new Date();
const formattedToday = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  useEffect(() => {
    const fetchFollowToday = async () => {
      if (!user?.uid) return;

      setLoading(true);

      const todayISO = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("assignedTo", user.uid)
        .eq("followUpAt", formattedToday);

      if (error) {
        console.error("Error fetching follow-ups:", error);
      } else {
        setFollowToday(data);
      }

      setLoading(false);
    };

    fetchFollowToday();
  }, [user]);

  return (
    <div className="bg-[#15213c] rounded-lg px-4 py-3 text-white">

      <div
        onClick={() => setShowFollowups(!showFollowups)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h3 className="text-lg font-semibold hover:text-blue-400 transition">
          Follow-ups Today
        </h3>

        {/* Count Badge */}
        <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
          {followToday.length}
        </span>
      </div>

      {showFollowups && (
        <div className="mt-2">
          {loading ? (
            <p>Loading...</p>
          ) : followToday.length > 0 ? (
            <ul className="list-disc pl-5 max-h-40 overflow-y-auto">
              {followToday.map((contact) => (
                <li key={contact.id}>
                  {contact.company}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">
              No follow-ups scheduled for today.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Followups;