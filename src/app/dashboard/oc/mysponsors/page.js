"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/oc/sidebar/Sidebar";

import MySponosr from "@/components/oc/right/MySponsor/MySponsor";
import { useUser } from "@/app/context/UserContext";
import { useState } from "react";

export default function OCPage() {
  const { user } = useUser();
  const [menu, setMenu] = useState("contacts");
 
  return (
    <ProtectedRoute allowedRole="oc">
      <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <Sidebar setMenu={setMenu} />
        <MySponosr/>
      </div>
    </ProtectedRoute>
  );
}


