"use client";

import { useState, useEffect } from "react";
import { UserPlus, Shield, Trash2, Key, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface Client {
  id: number;
  email: string;
  username: string;
  role: string;
  status: string;
  trial_ends: string;
  last_paid: string;
}

export default function ClientsManagementPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // New client form state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const fetchClients = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/clients");
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/clients/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      if (res.ok) {
        setShowModal(false);
        setEmail("");
        setUsername("");
        setPassword("");
        fetchClients();
      } else {
        const errData = await res.json();
        alert(errData.detail || "Error adding client");
      }
    } catch (err) {
      alert("Server connection failed");
    }
  };

  const markPaid = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/api/admin/clients/mark-paid/${id}`, { method: "POST" });
    fetchClients();
  };

  const deleteClient = async (id: number) => {
    if (confirm("Are you sure you want to delete this client?")) {
      await fetch(`http://127.0.0.1:8000/api/admin/clients/${id}`, { method: "DELETE" });
      fetchClients();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients Management</h1>
          <p className="text-sm text-gray-400 mt-1">Create and manage client accounts, trials, and monthly access.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition shadow-lg shadow-emerald-900/30"
        >
          <UserPlus size={16} /> New Client
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 bg-white/[0.02]">
              <th className="py-4 px-6 font-medium">Email</th>
              <th className="py-4 px-6 font-medium">Username</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium">Trial Ends</th>
              <th className="py-4 px-6 font-medium">Last Paid</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.01] transition">
                <td className="py-4 px-6 text-gray-200 font-medium">{c.email}</td>
                <td className="py-4 px-6 text-gray-400">{c.username || "—"}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    c.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    c.status === "Trial" ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" :
                    "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-400">{c.trial_ends || "—"}</td>
                <td className="py-4 px-6 text-gray-400">{c.last_paid}</td>
                <td className="py-4 px-6 text-right space-x-2">
                  <button
                    onClick={() => markPaid(c.id)}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition inline-flex items-center gap-1"
                  >
                    <CheckCircle size={12} /> Mark Paid
                  </button>
                  <button
                    onClick={() => deleteClient(c.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition inline-flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for New Client */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-bold mb-4">Add New Client Account</h2>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Client Email</label>
                <input
                  type="email"
                  required
                  placeholder="client@company.com.au"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Username</label>
                <input
                  type="text"
                  required
                  placeholder="clientname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-teal-500 outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-xl text-xs font-medium transition shadow-lg shadow-teal-900/30"
                >
                  Create Account (3-Day Trial)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}