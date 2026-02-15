
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/OC/sidebar/Sidebar";
import Right from "@/components/OC/right/Right";
import { useUser } from "@/app/context/UserContext";
import UpdateForm from "@/components/UpdateContact/UpdateForm";
export default function OCPage() {
  const { user } = useUser();
  

  return (
    <ProtectedRoute allowedRole="oc">
      <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <Sidebar />
        
          <Right />
    {/* <UpdateForm /> */}
    
        {/* <div className="flex-1 p-6">
          <p className="text-lg font-medium">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </p>

        </div> */}
      </div>
    </ProtectedRoute>
  );
}




