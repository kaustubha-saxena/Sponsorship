"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LogoutButton from "@/components/LogoutButton";


import AddContactBtn from "@/components/AddContact/PushBtn";
import { useUser } from "@/app/context/UserContext";

export default function Sidebar({selectedOCid, setSelectedOCid}) {


const {user}= useUser();
  const [ocs, setOcs] = useState([]);
  const [loading, setLoading] = useState(true);
  


  return (
    <aside className="w-1/6  bg-[#0B1324] fixed top-0 text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">{user?.name || "User"}</h2>


     
      <div className="absolute bottom-0  left-0 right-0  w-full h-12">
            <LogoutButton  />
            </div>
    </aside>
  );
}