"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCred.user.uid;
      const userSnap = await getDoc(doc(db, "users", uid));

      if (!userSnap.exists()) {
        setError("User role not found. Contact admin.");
        setLoading(false);
        return;
      }

      const { role } = userSnap.data();
      router.push(`/dashboard/${role}`);
    } catch (err) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 text-black">
      
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Login
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Access your dashboard
        </p>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition 
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
              }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}
