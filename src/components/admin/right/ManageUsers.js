import React from 'react'
import { useState } from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";
import { Trash2 } from "lucide-react";
import DeleteUserConfirmation from './DeleteUserConfirmation';
const ManageUsers = ({ showManageUser, setShowManageUser, ocs , ccs }) => {
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const deleteUser = async (uid) => {
  try {

    // 1️⃣ set assignedTo = null in Supabase contacts
    const { error: updateError } = await supabase
      .from("contacts")
      .update({ assignedTo: null })
      .eq("assignedTo", uid);

    if (updateError) {
      console.error("Error updating contacts:", updateError);
      return;
    }

    // 2️⃣ delete user from Firestore
    await deleteDoc(doc(db, "users", uid));

    console.log("User deleted and contacts unassigned");

  } catch (error) {
    console.error("Delete error:", error);
  }
};

  return (
    <div className=" absolute top-0  flex justify-center items-center w-full h-full bg-black/40">

      <div className=" text-black fixed  bg-white flex  flex-col rounded-2xl shadow-md max-h-[500px]   w-[400px]">
        <div className="flex justify-between rounded-t-2xl items-center bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
          <h2 className="text-white text-lg font-semibold">Manage Users</h2>
          <button onClick={() => setShowManageUser(false)} className="text-white hover:cursor-pointer" >X</button>
        </div>
        <div className="p-6 overflow-scroll   no-scrollbar">

<h3 className='font-semibold text-md mb-2'>CCs</h3>
<ul className='mb-4'>
  {ccs.map((cc) => (
    <li key={cc.uid} className='mb-2 flex justify-between items-center'>
      <span>{cc.name}</span>

      <button
  onClick={() => {
    setSelectedUser(cc);
    setShowDeleteModal(true);
  }}
  className="p-1 rounded hover:bg-red-100 text-red-500"
>
  <Trash2 size={18} />
</button>

    </li>
  ))}
</ul>
        <h3 className='font-semibold text-md mb-2'>OCs</h3>
<ul className='mb-4'>
  {ocs.map((oc) => (
    <li key={oc.uid} className='mb-2 flex justify-between items-center'>
      <span>{oc.name}</span>

      <button
  onClick={() => {
    setSelectedUser(oc);
    setShowDeleteModal(true);
  }}
  className="p-1 rounded hover:bg-red-100 text-red-500"
>
  <Trash2 size={18} />
</button>      

    </li>
  ))}
</ul>

        </div>
      </div> 
      {showDeleteModal && (
  <DeleteUserConfirmation
    setShowDeleteModal={setShowDeleteModal}
    deleteUser={deleteUser}
    user={selectedUser}
  />
)}
      </div>
      
  )
}

export default ManageUsers
