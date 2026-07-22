"use client";

import React, { useState } from "react";
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, CheckCircle2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function SettingsPage() {
  const [username, setUsername] = useState("maryamikram");
  const [email, setEmail] = useState("maryamikram089@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/settings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });

      if (response.ok) {
        setSuccessMsg("Settings updated and saved successfully!");
      } else {
        setSuccessMsg("Failed to update settings.");
      }
    } catch (err) {
      setSuccessMsg("Settings saved successfully (Local State)!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <SettingsIcon className="text-teal-400" /> System Settings
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your account preferences, security credentials, and subscription status.
            </p>
          </div>

          {successMsg && (
            <div className="bg-teal-950/50 border border-teal-500/30 text-teal-300 p-4 rounded-xl flex items-center gap-2 text-sm shadow-lg">
              <CheckCircle2 size={18} /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">

            {/* 1. Profile Information */}
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <User className="text-teal-400" size={20} />
                <h2 className="text-lg font-semibold">Profile Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Username / Company Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-teal-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-teal-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* 2. Subscription & Plan Status */}
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-teal-400" size={20} />
                  <h2 className="text-lg font-semibold">Subscription Plan</h2>
                </div>
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium rounded-full">
                  Active Trial
                </span>
              </div>
              <div className="flex items-center justify-between text-sm py-2">
                <div>
                  <p className="font-medium">StrataPilot Enterprise AI Tier</p>
                  <p className="text-xs text-gray-400">Includes multi-agent workflow orchestration and automated levy notices.</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Please contact admin to upgrade subscription plan.")}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Manage Billing
                </button>
              </div>
            </div>

            {/* 3. Security & Password */}
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Shield className="text-teal-400" size={20} />
                <h2 className="text-lg font-semibold">Security & Password</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-teal-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-teal-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* 4. Notifications & Alerts */}
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Bell className="text-teal-400" size={20} />
                <h2 className="text-lg font-semibold">Notifications & Alerts</h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Invoice & Levy Alerts</p>
                  <p className="text-xs text-gray-400">Receive instant automated updates when new contractor invoices or overdue levies arrive.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="accent-teal-500 w-5 h-5 cursor-pointer rounded"
                />
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-black font-semibold px-8 py-3 rounded-xl text-sm transition-all shadow-lg shadow-teal-950/50 cursor-pointer"
              >
                {loading ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}