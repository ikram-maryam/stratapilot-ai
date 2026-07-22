"use client";

import React, { useState } from "react";
import { MessageSquare, Sparkles, Send, Users, Building2, Megaphone, CheckCircle2 } from "lucide-react";

const templates = {
  maintenance: {
    title: "Scheduled Maintenance Notification",
    subject: "Notice of Scheduled Lift Maintenance — Meridian Towers",
    body: "Dear Residents,\n\nPlease be advised that standard preventative maintenance has been scheduled for the main passenger lift on Wednesday between 9:00 AM and 1:00 PM. Technicians will be working on-site to optimize operational stability. We apologize for any temporary inconvenience."
  },
  levy: {
    title: "Quarterly Levy Issuance",
    subject: "Strata Plan Contribution Notice — Urgent Account Reminder",
    body: "Dear Owner,\n\nThis is a standard notification that the quarterly strata scheme levy assessments have been issued to your communication address. Please review your account ledger balance to ensure payments are settled prior to the due date target to prevent system flags."
  },
  general: {
    title: "Community Guidelines Update",
    subject: "Important Notice: New Waste Management Protocols",
    body: "Dear Residents,\n\nTo optimize building aesthetics and safety compliance, new waste sorting frameworks have been finalized for the common property domains. Please ensure all recyclable materials match the highlighted disposal bins starting this coming Monday."
  }
};

export default function CommunicationsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>("maintenance");
  const [buildingTarget, setBuildingTarget] = useState("Meridian Towers (SP88421)");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const currentTemplate = templates[selectedTemplate];

  const handleDispatchBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      alert(`Success: AI Broadcast securely routed to all registered units in ${buildingTarget}.`);

      setTimeout(() => setSendSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="w-full px-6 py-6 space-y-6 max-w-full">
      <header className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Agent 3 — Communications Agent
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white mt-3">AI Community Broadcast Engine</h1>
        <p className="text-gray-400 mt-1">
          Orchestrate automated notices, tenant template messages, and critical building-wide announcements.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

        {/* Left Column: Dispatch Configuration Panel (Col span 5) */}
        <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 h-fit space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-3 text-white">
            <Megaphone size={18} className="text-amber-500" />
            Broadcast Settings
          </h2>

          <form onSubmit={handleDispatchBroadcast} className="space-y-5">
            {/* Target Scope Selection */}
            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-2">
                Target Strata Scheme
              </label>
              <div className="relative">
                <select
                  value={buildingTarget}
                  onChange={(e) => setBuildingTarget(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500 appearance-none cursor-pointer"
                >
                  <option>Meridian Towers (SP88421)</option>
                  <option>Construction Scheme Plan 44012</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Optimization Template Selector */}
            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-2">
                AI Context Intent
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(templates) as Array<keyof typeof templates>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTemplate(key)}
                    className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                      selectedTemplate === key
                        ? "bg-amber-500/10 border-amber-500 text-white font-medium shadow-lg shadow-amber-950/20"
                        : "bg-black/40 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {templates[key].title}
                    {selectedTemplate === key && <Sparkles size={14} className="text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Dispatch Action */}
            <button
              type="submit"
              disabled={isSending || sendSuccess}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-white/5 disabled:text-gray-500 text-black font-semibold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-amber-950/20"
            >
              {isSending ? "Routing Dispatch..." : sendSuccess ? "Broadcast Delivered!" : "Transmit AI Notice"}
              {!isSending && !sendSuccess && <Send size={14} />}
              {sendSuccess && <CheckCircle2 size={14} />}
            </button>
          </form>
        </div>

        {/* Right Column: Live Generated Preview Canvas (Col span 7) */}
        <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6 w-full">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Sparkles className="text-amber-400 animate-pulse" size={18} />
                <h3 className="font-semibold text-base text-white">Live AI Output Generation</h3>
              </div>
              <div className="text-[10px] font-mono text-gray-400 bg-black/40 border border-white/10 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <Users size={12}/> Channels: Email & SMS
              </div>
            </div>

            {/* Simulated Message Preview Box */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-4 font-sans text-sm">
              <div>
                <span className="text-xs font-medium text-gray-400 block">Email Subject Layout Line</span>
                <div className="text-white font-semibold mt-1 text-base">{currentTemplate.subject}</div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-xs font-medium text-gray-400 block mb-2">Message Body Content Context</span>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line bg-black/40 p-4 rounded-xl border border-white/5">
                  {currentTemplate.body}
                </div>
              </div>
            </div>
          </div>

          {/* Simulated Live Metadata */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Building2 size={13} className="text-amber-400" /> Audience Scope: <strong className="text-white">All Associated Proprietors</strong>
            </span>
            <span>Format Generation: <strong className="text-white">Standard Clear Prose</strong></span>
          </div>

        </div>

      </div>
    </div>
  );
}