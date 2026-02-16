"use client";

import { useRouter } from "next/navigation";

export default function AddUserButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard/admin/register-user")}
      className="px-4 py-2 bg-amber-600 text-white rounded-md cursor-pointer hover:bg-amber-700 transition"
    >
      Add User
    </button>
  );
}
