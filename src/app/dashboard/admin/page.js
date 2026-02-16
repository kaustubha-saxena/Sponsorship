import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";
import Sidebar from "@/components/admin/sidebar";
import Right from "@/components/admin/right/Right";
export default function AdminPage() {
  return (
    <ProtectedRoute allowedRole="admin">
      
 <div className="flex min-h-screen bg-zinc-500 font-sans dark:bg-black">

    <Sidebar/>
    <Right/>

 </div>

    </ProtectedRoute>
  );
}
