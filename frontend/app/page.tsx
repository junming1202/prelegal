"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import { defaultFormData, type NdaFormData } from "@/lib/ndaTypes";

// @react-pdf/renderer is browser-only, so load the download button without SSR.
const DownloadButton = dynamic(() => import("@/components/DownloadButton"), {
  ssr: false,
  loading: () => (
    <button
      type="button"
      disabled
      className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white opacity-60"
    >
      Loading…
    </button>
  ),
});

export default function Home() {
  const [data, setData] = useState<NdaFormData>(defaultFormData);

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-brand">Prelegal</h1>
            <p className="text-sm text-slate-500">Mutual NDA Creator</p>
          </div>
          <DownloadButton data={data} />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
        {/* Form */}
        <section aria-label="NDA details form">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Enter your details
          </h2>
          <NdaForm data={data} onChange={setData} />
        </section>

        {/* Live preview */}
        <section aria-label="NDA preview" className="lg:sticky lg:top-8 lg:self-start">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Live preview
          </h2>
          <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <NdaPreview data={data} />
          </div>
        </section>
      </div>
    </main>
  );
}
