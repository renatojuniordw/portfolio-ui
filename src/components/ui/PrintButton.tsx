"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Profile.pdf";
    link.download = "Renato_Bezerra_Curriculo.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
