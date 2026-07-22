"use client";

import { useState } from "react";

export default function InvoiceUploader() {
  const [file, setFile] =useState<File | null>(null);

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 mt-6">

      <h2 className="text-xl font-semibold mb-4">
        Upload Contractor Invoice
      </h2>

      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e)=>{
          if(e.target.files){
            setFile(e.target.files[0]);
          }
        }}
      />

      {file && (
        <div className="mt-4 text-green-400">
          Selected File:
          <br />
          {file.name}
        </div>
      )}

    </div>
  );
}