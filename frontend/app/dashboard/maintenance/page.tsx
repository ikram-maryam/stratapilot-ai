"use client";

import React, { useState } from "react";
import { Wrench, CheckCircle2, Clock, AlertTriangle, User, HardHat, Hammer, SendHorizontal } from "lucide-react";

const initialJobOrders = [
  {
    id: "JOB-991",
    issue: "Main Line Plumbing Leak",
    building: "Meridian Towers (SP88421)",
    urgency: "High",
    status: "Pending Dispatch",
    contractor: "Syd Plumbing Specialists",
    costEstimate: "$850.00"
  },
  {
    id: "JOB-992",
    issue: "Common Area LED Retrofitting",
    building: "Construction Scheme Plan 44012",
    urgency: "Routine",
    status: "Assigned",
    contractor: "A1 Electrical Contracting",
    costEstimate: "$1,200.00"
  },
  {
    id: "JOB-993",
    issue: "Balcony Structural Concrete Spalling",
    building: "Meridian Towers (SP88421)",
    urgency: "Critical",
    status: "Pending Review",
    contractor: "Unassigned",
    costEstimate: "TBD"
  }
];

export default function MaintenancePage() {
  const [jobs, setJobs] = useState(initialJobOrders);
  const [selectedJob, setSelectedJob] = useState<typeof initialJobOrders[0] | null>(initialJobOrders[0]);
  const [isDispatching, setIsDispatching] = useState(false);

  const handleDispatchJob = (id: string) => {
    setIsDispatching(true);

    setTimeout(() => {
      setJobs(prev => prev.map(job => {
        if (job.id === id) {
          return {
            ...job,
            status: "Dispatched",
            contractor: job.contractor === "Unassigned" ? "Apex Structural Engineering" : job.contractor
          };
        }
        return job;
      }));

      setSelectedJob(prev => {
        if (prev?.id === id) {
          return {
            ...prev,
            status: "Dispatched",
            contractor: prev.contractor === "Unassigned" ? "Apex Structural Engineering" : prev.contractor
          };
        }
        return prev;
      });

      setIsDispatching(false);
      alert(`Success: Work order logs securely authorized and dispatched to on-call engineers.`);
    }, 1200);
  };

  return (
    <div className="w-full px-6 py-6 space-y-6 max-w-full">
      <header className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-500 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
          Agent 5 — Maintenance Agent
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white mt-3">Job Order Dispatch Desk</h1>
        <p className="text-gray-400 mt-1">
          Track structural faults, monitor on-site technician tickets, and automate contractor allocations across schemes.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

        {/* Left Side: Job Order Stream (Col span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2 text-white">
            <Hammer size={18} className="text-gray-400" />
            Active Job Orders
          </h2>

          <div className="space-y-3">
            {jobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-left ${
                    isSelected
                      ? "bg-white/[0.04] border-teal-500"
                      : "bg-[#0a0a0a] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm text-white">{job.issue}</h4>
                      <p className="text-xs text-gray-400 mt-1">{job.building}</p>
                    </div>

                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded font-mono ${
                      job.urgency === "Critical" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                      job.urgency === "High" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
                      "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}>
                      {job.urgency}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <HardHat size={12} className="text-teal-400" /> {job.contractor}
                    </span>
                    <span className={`flex items-center gap-1 font-medium ${
                      job.status === "Dispatched" ? "text-green-400" : "text-gray-400"
                    }`}>
                      {job.status === "Dispatched" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {job.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Contractor Allocation Control (Col span 5) */}
        <div className="lg:col-span-5">
          {selectedJob ? (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-6 sticky top-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Wrench className="text-teal-400" size={18} />
                  <h3 className="font-semibold text-base text-white">Dispatch Control Pane</h3>
                </div>
                <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md">{selectedJob.id}</span>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-1">Reported Incident</span>
                  <div className="text-sm font-medium text-white bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/10">{selectedJob.issue}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-1">Cost Allocation</span>
                    <div className="text-sm font-semibold font-mono text-teal-400 bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/10">{selectedJob.costEstimate}</div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-1">Job Priority</span>
                    <div className="text-sm text-white bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/10">{selectedJob.urgency}</div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-1">Assigned Vendor Partner</span>
                  <div className="text-sm text-white bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                    <User size={14} className="text-teal-400" />
                    {selectedJob.contractor}
                  </div>
                </div>
              </div>

              {/* Dispatch Button Execution */}
              <div className="pt-2">
                <button
                  disabled={isDispatching || selectedJob.status === "Dispatched"}
                  onClick={() => handleDispatchJob(selectedJob.id)}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-white/5 disabled:text-gray-500 text-white font-medium text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20"
                >
                  {isDispatching ? (
                    "Transmitting Order Wire..."
                  ) : selectedJob.status === "Dispatched" ? (
                    "Work Order Dispatched"
                  ) : (
                    <>
                      Authorize Contractor Dispatch <SendHorizontal size={14} />
                    </>
                  )}
                </button>
              </div>

            </div>
          ) : (
            <div className="h-48 flex items-center justify-center border border-dashed border-white/10 rounded-2xl text-sm text-gray-500 bg-[#0a0a0a]">
              Select an open issue ticket to authorize dispatch metrics.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}