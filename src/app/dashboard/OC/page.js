import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";
import Sidebar from "@/components/oc/sidebar/Sidebar";
export default function OCPage() {
  return (
    <ProtectedRoute allowedRole="oc">
      <div className=" flex min-h-screen bg-zinc-50 font-sans dark:bg-black ">
        <Sidebar />
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">OC Dashboard</h1>
          <LogoutButton />
        </div>

        <p>Welcome, OC</p> */}
      </div>
    </ProtectedRoute>
  );
}

