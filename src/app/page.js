import Navbar from "@/components/Navbar";
import Link from "next/link";   
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-[#0B1324]">
          Sponsorship & Marketing
        </h1>

        <Link
          href="/login"
          className="px-5 py-2 bg-[#0B1324] text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6">
        <h2 className="text-5xl font-bold text-[#0B1324] mb-6">
          Manage Your Sponsors Effortlessly
        </h2>

        <p className="text-gray-600 max-w-2xl mb-8 text-lg">
          Track sponsor progress, manage deals, monitor cash & in-kind
          contributions, and stay organized with a clean dashboard built for
          organizing committees.
        </p>

        <Link
          href="/login"
          className="px-8 py-3 bg-[#0B1324] text-white rounded-xl font-semibold text-lg hover:scale-105 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Sponsorship & Marketing. All rights reserved.
      </footer>
    </div>
  );
}