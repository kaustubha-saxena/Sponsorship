import ProtectedRoute from "@/components/ProtectedRoute";
import { db } from "@/lib/firebase";
import Data from "@/components/Data";
import Sidebar from "@/components/oc/sidebar/Sidebar";
import Right from "@/components/oc/right/Right";
export default function OCPage() {
  return (
    <ProtectedRoute allowedRole="oc">
      <div className=" flex min-h-screen bg-zinc-50 font-sans dark:bg-black ">
        <Sidebar />
<Right />
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">OC Dashboard</h1>
          <LogoutButton />
        </div>

        <p>Welcome, OC</p> */}
      </div>
    </ProtectedRoute>
  );
}

