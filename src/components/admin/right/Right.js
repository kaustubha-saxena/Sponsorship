"use client";
import React from 'react'

import AddUser from '../AddUser'
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@/app/context/UserContext";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AllotContactsButton from './AllotContactsButton'
import TransferContactsBetweenOCs from './TransferContactsBetweenOCs'
import ResetConfirmation from './ResetConfirmation';
import ManageUsers from './ManageUsers';
import DbData from './DbData';

const Right = () => {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [Contacts, setContacts] = useState([]);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showManageUser, setShowManageUser] = useState(false)
  useEffect(() => {
    if (!user) return;
    const fetchOCs = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "in", ["oc", "cc"])
        );

        const snapshot = await getDocs(q);

        const userList = snapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data(),
        }));

        setUsers(userList);


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
        .update({
          assignedTo: null,
          callMade: false,
          callDate: null,
          emailDate: null,
          emailSent: false,
          followUpAt: null,
          note: null,
          interested: null
        })
        .not("id", "is", null);

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
    <div className="bg-gray-50 w-5/6 min-h-full h-full absolute right-0">




      <DbData contactslength={Contacts.length} cclength={users.filter((user) => user.role === "cc").length} oclength={users.filter((user) => user.role === "oc").length} />



      <div className='px-6 w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>

        <button
            onClick={() => router.push("/dashboard/admin/register-user")}
            className="bg-white  hover:bg-blue-50 rounded-2xl font-semibold text-cyan-950 border-none hover:cursor-pointer text-lg shadow-sm  border h-35  flex  justify-center items-center hover:shadow-md transition  "
          >
            Add User
          </button>
        <div className="bg-white hover:cursor-pointer hover:bg-blue-50  rounded-2xl shadow-sm border h-35 font-semibold   hover:shadow-md transition">
          <AllotContactsButton />
        </div>

        <button onClick={() => setShowTransfer(!showTransfer)} className='bg-white  hover:bg-blue-50 rounded-2xl font-semibold text-cyan-950 border-none hover:cursor-pointer text-lg shadow-sm  border h-35  flex  justify-center items-center hover:shadow-md transition  '>
          Transfer Contacts between OCs
        </button>
        <button onClick={() => setShowManageUser(!showManageUser)} className='bg-white  hover:bg-blue-50 rounded-2xl font-semibold text-cyan-950 border-none hover:cursor-pointer text-lg shadow-sm  border h-35  flex  justify-center items-center hover:shadow-md transition  '>
          Manage OCs and CCs
        </button>
        <button onClick={() => setShowResetModal(true)} className='bg-white  hover:bg-blue-50 rounded-2xl font-semibold text-cyan-950 border-none hover:cursor-pointer text-lg shadow-sm  border h-35  flex  justify-center items-center hover:shadow-md transition  '>


          Reset Database

        </button>
        <button onClick={() => router.push("/dashboard/admin/addcontacts")} className='bg-white  hover:bg-blue-50 rounded-2xl font-semibold text-cyan-950 border-none hover:cursor-pointer text-lg shadow-sm  border h-35  flex  justify-center items-center hover:shadow-md transition  '>


          Add Contacts via excel

        </button>





      </div>


      {/* <AddUser /> */}
      {showResetModal && (
        <ResetConfirmation setShowResetModal={setShowResetModal} resetDatabase={resetDatabase} />
      )}
      {showManageUser && (
        <ManageUsers showManageUser={showManageUser} setShowManageUser={setShowManageUser} ocs={users.filter((user) => user.role === "oc")} ccs={users.filter((user) => user.role === "cc")} />
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
