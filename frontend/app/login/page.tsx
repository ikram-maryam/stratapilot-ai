"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        // Yahan path change kar ke wo page de diya hai jo aapke paas already bani hui hai
        router.push("/dashboard/invoices");
      } else {
        setError(data.detail || "Login failed!");
      }
    } catch (err) {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">StrataPilot AI</h1>
          <p className="text-sm text-gray-400 mt-1">Autonomous Strata Management Portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Manager Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                required
                placeholder="manager@meridian.com.au"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:border-teal-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:border-teal-500 outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition shadow-lg shadow-teal-900/30"
          >
            {loading ? "Signing in..." : "Access Dashboard"} <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          Demo Credentials: <span className="text-gray-300">manager@meridian.com.au</span> / <span className="text-gray-300">stratapilot123</span>
        </div>
      </div>
    </div>
  );
}