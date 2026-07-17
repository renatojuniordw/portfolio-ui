"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { downloadPDF } from "@/lib/utils";

export function PrintButton() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);
    downloadPDF("/Profile.pdf", "Renato_Bezerra_Curriculo.pdf");
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex items-center justify-center px-6 py-3 bg-text text-bg rounded-full font-medium text-sm hover:opacity-90 transition-colors print:hidden shadow-sm disabled:opacity-50"
    >
      <Download className="w-4 h-4 mr-2" />
      {downloading ? "Baixando..." : "Baixar Currículo (PDF)"}
    </button>

  );
}
