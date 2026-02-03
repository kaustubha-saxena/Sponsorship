import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";

export default function CCPage() {
  return (
    <ProtectedRoute allowedRole="cc">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">CC Dashboard</h1>
          <LogoutButton />
        </div>

        <p>Welcome, CC</p>
      </div>
    </ProtectedRoute>
  );
}
