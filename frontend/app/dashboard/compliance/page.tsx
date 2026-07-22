"use client";

import React, { useState } from "react";
import { ShieldAlert, CheckCircle2, AlertOctagon, RefreshCw, FileCheck2, ShieldCheck, ArrowUpRight } from "lucide-react";

const initialRegulatoryItems = [
  {
    id: "REG-801",
    requirement: "Annual Fire Safety Statement (AFSS)",
    building: "Meridian Towers (SP88421)",
    dueDate: "15 Aug 2026",
    status: "Action Required",
    details: "Council notification pending signature match on secondary emergency escape valve checks."
  },
  {
    id: "REG-802",
    requirement: "Asbestos Register & Management Plan",
    building: "Meridian Towers (SP88421)",
    dueDate: "22 Dec 2026",
    status: "Compliant",
    details: "Five-year structural review locked and logged into state registry channels seamlessly."
  },
  {
    id: "REG-803",
    requirement: "Combustible Cladding Assessment",
    building: "Construction Scheme Plan 44012",
    dueDate: "Immediate",
    status: "Critical Review",
    details: "Core core material testing layer reports show border safety drift anomalies under Section 11."
  }
];

export default function CompliancePage() {
  const [items, setItems] = useState(initialRegulatoryItems);
  const [activeAudit, setActiveAudit] = useState<typeof initialRegulatoryItems[0] | null>(initialRegulatoryItems[0]);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleRunAIEvaluation = (id: string) => {
    setIsAuditing(true);

    setTimeout(() => {
      setItems(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: "Compliant",
            details: "AI Deep Scan verified updated technical compliance signatures. File now 100% synchronized with council regulations."
          };
        }
        return item;
      }));

      // Sync active view details update
      setActiveAudit(prev => {
        if (prev?.id === id) {
          return {
            ...prev,
            status: "Compliant",
            details: "AI Deep Scan verified updated technical compliance signatures. File now 100% synchronized with council regulations."
          };
        }
        return prev;
      });

      setIsAuditing(false);
      alert("AI Scan Complete: Document remediation verified and compliance status updated to Compliant.");
    }, 1500);
  };

  return (
    <div className="w-full px-6 py-6 space-y-6 max-w-full">
      <header className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          Agent 4 — Compliance Agent
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white mt-3">Regulatory Compliance Monitor</h1>
        <p className="text-gray-400 mt-1">
          Automated tracking of council guidelines, fire safety records, and structural certifications across schemes.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

        {/* Left Side: Compliance Grid Stream (Col span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2 text-white">
            <FileCheck2 size={18} className="text-gray-400" />
            Active Regulatory Requirements
          </h2>

          <div className="space-y-3">
            {items.map((item) => {
              const isSelected = activeAudit?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveAudit(item)}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-left ${
                    isSelected
                      ? "bg-white/[0.04] border-red-500"
                      : "bg-[#0a0a0a] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm text-white">{item.requirement}</h4>
                      <p className="text-xs text-gray-400 mt-1">{item.building}</p>
                    </div>

                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1 font-mono ${
                      item.status === "Compliant" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                      item.status === "Action Required" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                      "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {item.status === "Compliant" && <CheckCircle2 size={10} />}
                      {item.status === "Action Required" && <ShieldAlert size={10} />}
                      {item.status === "Critical Review" && <AlertOctagon size={10} />}
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs text-gray-400">
                    <span>Target Due Date: <strong className="text-gray-200 font-medium">{item.dueDate}</strong></span>
                    <span className="text-gray-400 font-mono text-[11px] bg-black/40 px-2 py-0.5 rounded border border-white/5">{item.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Deep Mini-Audit Details Section (Col span 5) */}
        <div className="lg:col-span-5">
          {activeAudit ? (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-6 sticky top-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-red-400" size={18} />
                  <h3 className="font-semibold text-base text-white">AI Audit Diagnostic</h3>
                </div>
                <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md">{activeAudit.id}</span>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-1">Requirement Framework</span>
                  <div className="text-sm font-medium text-white bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/10">{activeAudit.requirement}</div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-1">Scope Logs Status Details</span>
                  <div className="text-xs text-gray-300 bg-black/40 p-4 rounded-xl border border-white/10 leading-relaxed font-mono">
                    {activeAudit.details}
                  </div>
                </div>
              </div>

              {/* Status Remediate CTA Action */}
              <div className="pt-2">
                <button
                  disabled={isAuditing || activeAudit.status === "Compliant"}
                  onClick={() => handleRunAIEvaluation(activeAudit.id)}
                  className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-white/5 disabled:text-gray-500 font-semibold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      Running Clearance Re-scan...
                    </>
                  ) : activeAudit.status === "Compliant" ? (
                    "Document Framework Verified"
                  ) : (
                    <>
                      Trigger Automated Clearance <ArrowUpRight size={14} />
                    </>
                  )}
                </button>
              </div>

            </div>
          ) : (
            <div className="h-48 flex items-center justify-center border border-dashed border-white/10 rounded-2xl text-sm text-gray-500 bg-[#0a0a0a]">
              Select a policy item to access structural scan controls.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}