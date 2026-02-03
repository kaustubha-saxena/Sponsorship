import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRole="admin">
      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <LogoutButton />
        </div>

        {/* CONTENT */}
        <p>Welcome, Admin</p>
      </div>
    </ProtectedRoute>
  );
}
