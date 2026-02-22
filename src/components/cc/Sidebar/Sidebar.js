"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LogoutButton from "@/components/LogoutButton";
import OCbox from "./OCbox";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { ChevronDown, Users } from "lucide-react";

export default function Sidebar({  selectedOCid = null,
  setSelectedOCid = null,}) {

  const { user } = useUser();
  const router = useRouter();
  const [ocs, setOcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOcs, setShowOcs] = useState(false)

  useEffect(() => {
     if (!user) return;
    const fetchOCs = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "==", "oc")
        );

        const snapshot = await getDocs(q);

        const ocList = snapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data(),
        }));

        setOcs(ocList);
        if (ocList.length > 0 && !selectedOCid) {
          setSelectedOCid(ocList[0].uid);
        }

      } catch (error) {
        console.error("Error fetching OCs:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchOCs();
  }, [selectedOCid]);


  return (
    <aside className="w-1/6  bg-[#0B1324] fixed top-0 text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Welcome {user?.name || "User"}</h2>


      
      <ul className="flex  gap-3 flex-col w-full ">
       <li className="w-full">
  <div
    onClick={() => {
      router.push("/dashboard/cc");
      setShowOcs(!showOcs);
    }}
    className={`group w-full flex items-center justify-between 
    px-4 py-3 rounded-xl cursor-pointer 
    bg-[#111c33] hover:bg-[#1b2a4d] 
    transition-all duration-200 
    border border-transparent hover:border-blue-500/30 `}
  >
    {/* Left Section */}
    <div className="flex items-center gap-3">
      <Users size={18} className="text-blue-400" />
      <span className="text-sm font-semibold tracking-wide text-gray-200 group-hover:text-white">
        OCs
      </span>
    </div>

    {/* Right Chevron */}
    <ChevronDown
      size={16}
      className={`text-gray-400 transition-transform duration-300 ${
        showOcs ? "rotate-180 text-blue-400" : ""
      }`}
    />
  </div>

  {/* Dropdown */}
  {showOcs && (
    <div className="mt-2  rounded-xl bg-[#0f172a] border border-blue-500/10 shadow-lg transition-all duration-300">
      <OCbox
        loading={loading}
        ocs={ocs}
        setSelectedOCid={setSelectedOCid}
        selectedOCid={selectedOCid}
      />
    </div>
  )}
</li>

        <li>

          <button onClick={() => {
            // setMenu("sponsors");
            router.push("/dashboard/cc/sponsorprogress");
          }} className=" cursor-pointer w-full h-13 flex justify-start items-center text-lg font-semibold   px-4 py-3  bg-[#111c33] hover:bg-[#1b2a4d] 
    transition-all duration-200 
    border border-transparent hover:border-blue-500/30 rounded-lg ">
            Sponsor Progress
          </button>
        </li>

        

      </ul>

      <div className="absolute bottom-0  left-0 right-0  w-full h-12">
        <LogoutButton />
      </div>
    </aside>
  );
}