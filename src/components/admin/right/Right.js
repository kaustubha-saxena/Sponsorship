"use client";
import React from 'react'

import AddUser from '../AddUser'
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@/app/context/UserContext";
import { Info } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AllotContactsButton from './AllotContactsButton'
import TransferContactsBetweenOCs from './TransferContactsBetweenOCs'
import ResetConfirmation from './ResetConfirmation';
import DbData from './DbData';
const Right = () => {

  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [ocs, setOcs] = useState([]);
  const [Contacts, setContacts] = useState([]);
const [showResetModal, setShowResetModal] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  useEffect(() => {
    if (!user) return;
    const fetchOCs = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "in", ["oc", "cc"])
        );

        const snapshot = await getDocs(q);

        const ocList = snapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data(),
        }));

        setOcs(ocList);


      } catch (error) {
        console.error("Error fetching OCs:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchOCs();
  }, []);



  useEffect(() => {
    const Contacts = async () => {



      setLoading(true);

      const { data, error } = await supabase
        .from("contacts")
        .select("*");
        

      if (error) {
        console.error("Error fetching contacts:", error);
      } else {
        setContacts(data);
      }

      setLoading(false);
    };

    Contacts();

  }, []);


 const resetDatabase = async () => {
  const confirmReset = confirm("Are you sure you want to reset callMade for all contacts?");
  if (!confirmReset) return;

  try {
    const { data, error } = await supabase
      .from("contacts")
      .update({ assignedTo: null })
      .not("id","is",null); // ensures update runs for all rows

    if (error) {
      console.error("Reset failed:", error);
      alert("Failed to reset database");
    } else {
      alert("Database reset successfully");
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className=' relative w-full min-h-full bg-gray-50'>




      <DbData contactslength={Contacts.length} cclength={ocs.filter((oc) => oc.role === "cc").length} oclength={ocs.filter((oc) => oc.role === "oc").length} />



      <div className='px-6 w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>

        <div className="bg-white  rounded-2xl shadow-sm border h-35  flex flex-col justify-between hover:shadow-md transition">
          <AddUser />
        </div>
        <div className="bg-white  rounded-2xl shadow-sm border h-35  flex flex-col justify-between hover:shadow-md transition">
          <AllotContactsButton />
        </div>
        <div className="bg-white rounded-2xl font-semibold text-lg shadow-sm border h-35  flex flex-col justify-between hover:shadow-md transition">
          <button onClick={() => setShowTransfer(!showTransfer)} className='w-full h-full bg-green-300 rounded-2xl hover:cursor-pointer hover:bg-green-500 font-semibold transition'>
            Transfer Contacts between OCs
          </button>
        </div>
        <div className="bg-white rounded-2xl font-semibold text-lg shadow-sm border h-35  flex flex-col justify-between hover:shadow-md transition">
          <button className='w-full h-full bg-pink-300 rounded-2xl hover:cursor-pointer hover:bg-pink-500 font-semibold transition'>
            Manage OCs and CCs
          </button>
        </div>
        <div className="bg-white rounded-2xl font-semibold text-lg shadow-sm border h-35  flex flex-col justify-between hover:shadow-md transition">
          <button  onClick={() => setShowResetModal(true)} className='w-full h-full bg-pink-300 rounded-2xl hover:cursor-pointer hover:bg-pink-500 font-semibold transition'>
            Reset Database
          </button>
        </div>
        <div className="bg-white rounded-2xl font-semibold text-lg shadow-sm border h-35  flex flex-col justify-between hover:shadow-md transition">
          <button className='w-full h-full bg-orange-300 rounded-2xl hover:cursor-pointer hover:bg-orange-500 font-semibold transition'>
            Add Contacts via excel
          </button>
        </div>
       




      </div>


      {/* <AddUser /> */}
{showResetModal && (
        <ResetConfirmation setShowResetModal={setShowResetModal} resetDatabase={resetDatabase} />
)}
      {showTransfer && (
        <TransferContactsBetweenOCs
          setshowTransfer={setShowTransfer}
          showTransfer={showTransfer}
        />
      )}
    </div>
  )
}

export default Right
