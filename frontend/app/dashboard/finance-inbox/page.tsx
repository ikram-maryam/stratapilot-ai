"use client";

import React, { useEffect, useState } from "react";
import { RefreshCw, Upload, Building2 } from "lucide-react";

export default function FinanceInboxPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/finance-inbox");
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      await fetch("http://127.0.0.1:8000/api/process-invoice", {
        method: "POST",
        body: formData,
      });
      fetchInvoices();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to process invoice securely.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

  return (
    <div className="w-full px-6 py-6 space-y-6 max-w-full">
      <header className="flex items-center justify-between">
        <div>
          <span className="inline-block bg-teal-500/10 text-teal-400 text-xs px-3 py-1 rounded-full font-mono border border-teal-500/20 mb-2">
            AGENT — FINANCE & BANKING
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white">Strata Finance Inbox</h1>
          <p className="text-gray-400 mt-1">Autonomous Back-Office Invoice Reconciliation Engine</p>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition shadow-lg shadow-teal-900/20 text-white">
            <Upload size={14} /> {uploading ? "AI Agent Parsing..." : "Ingest Invoice"}
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          <button
            onClick={fetchInvoices}
            className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs transition text-white flex items-center justify-center"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      {loading ? (
        <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl text-gray-400 text-sm">
          Synchronizing ledger data from backend...
        </div>
      ) : invoices.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl text-gray-400 text-sm text-center">
          No invoices found in the finance inbox.
        </div>
      ) : (
        <div className="space-y-4 w-full">
          {invoices.map((item: any) => (
            <div key={item.id} className="bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:border-teal-500/50 transition w-full">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-teal-500/10 text-teal-400 text-xs px-2.5 py-1 rounded-full font-mono flex items-center gap-1 border border-teal-500/20">
                    <Building2 size={12} /> {item.extractedData?.strataPlan || "SP-GENERAL"}
                  </span>
                  <span className="bg-white/5 text-gray-300 text-xs px-2.5 py-1 rounded-full font-mono">
                    {item.category}
                  </span>
                </div>
                <h4 className="font-medium text-base pt-1 text-white">{item.sender}</h4>
                <p className="text-xs text-gray-400">{item.subject}</p>
              </div>
              <div className="text-right">
                <div className="text-base font-bold font-mono text-white">
                  ${typeof item.amount === 'number' ? item.amount.toFixed(2) : item.amount}
                </div>
                <div className="text-[11px] text-teal-400 font-medium uppercase tracking-wider pt-1">
                  ● {item.status}
                </div>
                <div className="text-[10px] text-gray-500 font-mono mt-1">
                  Due: {item.extractedData?.dueDate || "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}