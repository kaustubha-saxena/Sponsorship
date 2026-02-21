"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/cc/Sidebar/Sidebar";
import { useUser } from "@/app/context/UserContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import Right from "@/components/cc/right/Right";
import MySponsor from "@/components/cc/right/MySponsor/MySponsor";

const page = () => {
  return (
    <ProtectedRoute allowedRole="cc">
      <div className="flex min-h-screen bg-zinc-500 font-sans dark:bg-black">
        <Sidebar   />

        <MySponsor  />

      </div>
    </ProtectedRoute>
  );
}

export default page

