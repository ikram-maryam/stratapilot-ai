"use client";

import React, { useState } from "react";
import { FileText, Upload, CheckCircle2, AlertCircle, FileCheck, Image as ImageIcon } from "lucide-react";

export default function InvoicesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
    }
  };

  const handleUploadProcess = () => {
    if (!selectedFile) return;
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 2000);
  };

  return (
    <div className="w-full space-y-8 p-4 md:p-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Finance & Autonomous Notice Engine
          </span>
          <h1 className="text-3xl font-bold tracking-tight mt-3 text-white">Revenue & Levy Follow-up</h1>
          <p className="text-gray-400 text-sm mt-1">
            Upload invoices, statement PDFs, or payment receipts for AI-driven optical extraction and tracking.
          </p>
        </div>

        {/* Upload Widget Control */}
        <div className="bg-[#0a0a0a] border border-white/10 p-3 rounded-2xl flex items-center gap-3">
          <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all">
            <Upload size={14} className="text-teal-400" />
            {selectedFile ? "Change File" : "Select Document"}
            <input
              type="file"
              accept=".csv, .pdf, .png, .jpg, .jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <button
            onClick={handleUploadProcess}
            disabled={!selectedFile || isUploading}
            className="bg-teal-500 hover:bg-teal-600 disabled:bg-white/5 disabled:text-gray-600 text-black px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-teal-950/25"
          >
            {isUploading ? "Scanning AI..." : uploadSuccess ? "Processed!" : "Upload & Parse"}
          </button>
        </div>
      </header>

      {/* Selected File Preview Box */}
      {selectedFile && (
        <div className="bg-[#0a0a0a] border border-teal-500/30 p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedFile.type.includes("image") ? (
              <ImageIcon className="text-teal-400" size={24} />
            ) : (
              <FileCheck className="text-teal-400" size={24} />
            )}
            <div>
              <p className="text-sm font-medium text-white">{selectedFile.name}</p>
              <p className="text-xs text-gray-400">
                Size: {(selectedFile.size / 1024).toFixed(1)} KB • Type: {selectedFile.type || "Document"}
              </p>
            </div>
          </div>

          {uploadSuccess && (
            <span className="text-xs text-teal-400 bg-teal-500/10 px-3 py-1.5 rounded-lg border border-teal-500/20 flex items-center gap-1.5">
              <CheckCircle2 size={14} /> AI Parsed & Reconciled Successfully
            </span>
          )}
        </div>
      )}

      {/* Invoices List Grid */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-teal-400 border border-white/10">SP-88421</span>
              <span className="text-xs text-gray-400">Lot 14</span>
            </div>
            <h3 className="font-semibold text-base text-white">Arthur Pendelton</h3>
            <p className="text-xs text-gray-400">Due Date: 2026-07-30</p>
          </div>

          <div className="text-right space-y-2">
            <div className="text-lg font-bold font-mono text-white">$1450.00</div>
            <span className="text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Overdue
            </span>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-teal-400 border border-white/10">SP-88421</span>
              <span className="text-xs text-gray-400">Lot 22</span>
            </div>
            <h3 className="font-semibold text-base text-white">Elena Rostova</h3>
            <p className="text-xs text-gray-400">Due Date: 2026-07-30</p>
          </div>

          <div className="text-right space-y-2">
            <div className="text-lg font-bold font-mono text-white">$890.00</div>
            <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}