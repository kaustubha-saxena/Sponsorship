"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import WelcomeDashboard from "./WelcomeDashboard";
import DataBlock from "@/components/oc/DataBlock";
import { supabase } from "@/lib/supabase";

const Right = () => {

  const { user } = useUser();
  const [assignedContacts, setAssignedContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedContacts = async () => {

      if (!user?.uid) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("assignedTo", user.uid);

      if (error) {
        console.error("Error fetching contacts:", error);
      } else {
        setAssignedContacts(data);
      }

      setLoading(false);
    };

    fetchAssignedContacts();

  }, [user]);

  return (
    <div className="bg-gray-50 w-5/6 min-h-full h-full absolute right-0">

      {loading ? (
        <div className="p-10 text-gray-500">Loading...</div>
      ) : (
        <>
          <WelcomeDashboard assignedContacts={assignedContacts} />
          <DataBlock assignedContacts={assignedContacts}/>
        </>
      )}

    </div>
  );
};

export default Right;