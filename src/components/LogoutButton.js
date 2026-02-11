"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 w-full h-full hover:cursor-pointer hover:bg-[#15213c] bg-[#0d1528] text-white rounded"
    >
      Logout
    </button>
  );
}
