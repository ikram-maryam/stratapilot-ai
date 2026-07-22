"use client";

import { useState } from "react";
import { FileText, DollarSign, Users, Activity, Upload } from "lucide-react";

export default function OverviewPage() {
  const [metrics, setMetrics] = useState<any>({
    totalPendingAmount: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    activeClients: 0,
    efficiency: 99.8,
  });

  // CSV File upload handle karne ka function
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      // CSV parsing logic (Man-made simple row/column reader)
      const rows = text.split("\n").map((row) => row.split(","));
      // Assume CSV format header: totalPendingAmount, totalInvoices, totalRevenue, activeClients
      // Example row 1 values: 1500.50, 5, 12000.00, 12
      if (rows.length > 1) {
        const dataRow = rows[1]; // First data row after headers
        setMetrics({
          totalPendingAmount: parseFloat(dataRow[0]) || 0,
          totalInvoices: parseInt(dataRow[1]) || 0,
          totalRevenue: parseFloat(dataRow[2]) || 0,
          activeClients: parseInt(dataRow[3]) || 0,
          efficiency: 99.8,
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Upload a CSV summary file to instantly populate metrics.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* CSV File Upload Input Button */}
          <label className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-lg">
            <Upload size={14} />
            Upload CSV Data
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>

          <span className="text-sm text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800">
            ● Live System Active
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1 */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">Total Pending Amount</span>
            <FileText className="text-teal-400" size={20} />
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            ${(metrics?.totalPendingAmount ?? 0).toFixed(2)}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {metrics?.totalInvoices ?? 0} Bills Awaiting Reconciliation
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">Total Revenue</span>
            <DollarSign className="text-emerald-400" size={20} />
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            ${(metrics?.totalRevenue ?? 0).toFixed(2)}
          </div>
          <p className="text-xs text-gray-500 mt-2">Successfully Processed</p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">Active Clients</span>
            <Users className="text-blue-400" size={20} />
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            {metrics?.activeClients ?? 0}
          </div>
          <p className="text-xs text-gray-500 mt-2">Connected Portfolios</p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">System Efficiency</span>
            <Activity className="text-purple-400" size={20} />
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            {(metrics?.efficiency ?? 99.8).toFixed(1)}%
          </div>
          <p className="text-xs text-gray-500 mt-2">AI Optimization Rate</p>
        </div>

      </div>
    </div>
  );
}