"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import NdaPdfDocument from "./NdaPdfDocument";
import type { NdaFormData } from "@/lib/ndaTypes";

interface DownloadButtonProps {
  data: NdaFormData;
}

/** Build a filename like "Mutual-NDA-Acme-Inc.pdf" from the parties' companies. */
function buildFileName(data: NdaFormData): string {
  const slug = (s: string) =>
    s
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const parts = [data.party1.company, data.party2.company]
    .map(slug)
    .filter(Boolean);
  return parts.length ? `Mutual-NDA-${parts.join("-")}.pdf` : "Mutual-NDA.pdf";
}

export default function DownloadButton({ data }: DownloadButtonProps) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const blob = await pdf(<NdaPdfDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = buildFileName(data);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF", err);
      alert("Sorry, something went wrong while generating the PDF.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={generating}
      className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {generating ? "Generating…" : "Download PDF"}
    </button>
  );
}
