"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LogoutButton from "@/components/LogoutButton";
import Followups from "./Followups";
import { useUser } from "@/app/context/UserContext";

export default function Sidebar({setMenu}) {
  
  const {user } = useUser();

  const selectMenu = (menuName) => {
    setMenu(menuName);
  };
  return (
    <aside className="w-1/6  bg-[#0B1324] fixed top-0 text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Welcome {user ? user.name : "Guest"}</h2>

      <nav className="space-y-4 ">
        
      </nav>
<ul className="flex  gap-5 flex-col w-full ">
  <li>
    <button onClick={() => selectMenu("contacts")} className="w-full h-10  bg-[#15213c] rounded-lg ">
   
<Followups/>  
    </button>
  </li>
  <li>
    <button onClick={() => setMenu("sponsors")} className=" cursor-pointer w-full h-13 flex justify-start items-center text-lg font-semibold hover:text-blue-400 transition px-4 py-3 bg-[#15213c] rounded-lg ">
      My Sponsors
    </button>
  </li>
</ul>
      <div className="absolute bottom-0 left-0 right-0  w-full h-12">
      <LogoutButton  />
      </div>
    </aside>
  );
}
