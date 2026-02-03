import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";

export default function OCPage() {
  return (
    <ProtectedRoute allowedRole="oc">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">OC Dashboard</h1>
          <LogoutButton />
        </div>

        <p>Welcome, OC</p>
      </div>
    </ProtectedRoute>
  );
}

