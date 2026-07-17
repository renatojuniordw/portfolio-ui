"use client";

import { Download } from "lucide-react";
import { downloadPDF } from "@/lib/utils";

export function PrintButton() {
  const handleDownload = () => downloadPDF("/Profile.pdf", "Renato_Bezerra_Curriculo.pdf");

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center justify-center px-6 py-3 bg-text text-bg rounded-full font-medium text-sm hover:opacity-90 transition-colors print:hidden shadow-sm"
    >
      <Download className="w-4 h-4 mr-2" />
      Baixar Currículo (PDF)
    </button>

  );
}
