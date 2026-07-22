"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export default function ClientOnboardingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [setupFinalized, setSetupFinalized] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setSetupFinalized(true);
    }
  };

  const extractedData = [
    { lot: "Lot 1", name: "TemplateLab Builders", address: "accounts@templatelab.com" },
    { lot: "Lot 2", name: "Alex Mercer", address: "alex.m@strata.com.au" },
    { lot: "Lot 3", name: "Corporate Office Unit", address: "admin@corpunit.com" },
    { lot: "Lot 4", name: "Sydney Property Trust", address: "investments@sydtrust.com.au" },
  ];

  return (
    <div className="w-full px-6 py-4 space-y-6 max-w-full">
      {/* Header */}
      <div>
        <span className="inline-block bg-purple-500/10 text-purple-400 text-xs px-3 py-1 rounded-full font-mono border border-purple-500/20 mb-2">
          AGENT 1 — CLIENT ONBOARDING
        </span>
        <h1 className="text-3xl font-bold tracking-tight">New Strata Scheme Activation</h1>
        <p className="text-gray-400 mt-1">
          Upload legacy corporate manifests, lot registers, or developer spreadsheets to auto-provision building files.
        </p>
      </div>

      {/* Top File Upload Card */}
      <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl w-full">
        <h3 className="text-lg font-medium mb-1">Ingest Strata Roll Document</h3>
        <p className="text-xs text-gray-400 mb-4">Supported formats: PDF formats only</p>

        <div className="flex items-center justify-between bg-black/40 border border-white/10 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {file ? file.name : "Construction-Invoice-Template.pdf"}
              </p>
              <p className="text-xs text-gray-500">319.1 KB • Target Document Loaded</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-xs px-4 py-2 rounded-lg border border-white/10 transition text-white">
              Choose File
              <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
            </label>
            <span className="bg-purple-950/60 text-purple-400 text-xs px-4 py-2 rounded-lg border border-purple-800 font-medium">
              Setup Finalized
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Left Identity Card & Right Extracted Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

        {/* Left Card: Corporate Identity */}
        <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] font-mono text-gray-400 tracking-wider uppercase">
              Onboarded Corporate Identity
            </span>
            <div className="mt-4 p-4 bg-purple-500/10 text-purple-400 rounded-xl w-fit border border-purple-500/20">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-bold mt-4 text-white">Construction Scheme Plan 44012</h2>
            <p className="text-xs text-gray-400 mt-1">102 George Street, Sydney NSW 2000</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-center">
              <span className="text-xs text-gray-400 block mb-1">Registered Roll</span>
              <span className="text-xl font-bold font-mono text-white">4 Lots</span>
            </div>
            <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-center">
              <span className="text-xs text-gray-400 block mb-1">Structure</span>
              <span className="text-sm font-bold text-white">Quarterly</span>
            </div>
          </div>

          <button
            onClick={() => setSaved(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition shadow-lg shadow-purple-900/20"
          >
            {saved ? <CheckCircle2 size={16} /> : null}
            {saved ? "Scheme Saved Successfully!" : "Confirm & Save Scheme"} <ArrowRight size={14} />
          </button>
        </div>

        {/* Right Card: Extracted Ownership Matrix */}
        <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Extracted Ownership & Lot Roll Matrix</h3>
              <span className="text-xs text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800 flex items-center gap-1 font-mono">
                ● 100% Extraction Match
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-mono text-gray-400 uppercase">
                    <th className="py-3 px-4">Lot</th>
                    <th className="py-3 px-4">Proprietor Name</th>
                    <th className="py-3 px-4">Communication Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {extractedData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition">
                      <td className="py-3.5 px-4 font-mono text-xs text-purple-400">{row.lot}</td>
                      <td className="py-3.5 px-4 font-medium text-white">{row.name}</td>
                      <td className="py-3.5 px-4 text-gray-400 font-mono text-xs">{row.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
            <span>Verified via Autonomous AI Parser</span>
            <span>Status: Ready for Activation</span>
          </div>
        </div>

      </div>
    </div>
  );
}