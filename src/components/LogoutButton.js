"use client";
import { LogOut } from "lucide-react";
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
      className="px-4 flex justify-center gap-4 items-center  transition-all duration-200     border border-transparent hover:border-blue-500/30   py-2 w-full h-full hover:cursor-pointer bg-[#111c33] hover:bg-[#1b2a4d]  text-white rounded"
    >
      Logout
      <LogOut size={20} />
    </button>
  );
}
