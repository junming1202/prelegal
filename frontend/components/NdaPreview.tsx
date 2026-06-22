"use client";

import type { NdaFormData } from "@/lib/ndaTypes";
import {
  STANDARD_TERMS,
  LICENSE_NOTICE,
  buildCoverPageFields,
  buildSignatureRows,
} from "@/lib/ndaContent";

interface NdaPreviewProps {
  data: NdaFormData;
}

/**
 * On-screen rendering of the completed Mutual NDA. Uses the same content
 * helpers as the PDF so the two stay in sync.
 */
export default function NdaPreview({ data }: NdaPreviewProps) {
  const coverFields = buildCoverPageFields(data);
  const signatureRows = buildSignatureRows(data);

  return (
    <article className="prose-sm mx-auto max-w-none text-slate-800">
      <h1 className="mb-1 text-xl font-bold text-brand">
        Mutual Non-Disclosure Agreement
      </h1>
      <p className="mb-6 text-xs text-slate-500">
        Common Paper Mutual NDA Standard Terms, Version 1.0
      </p>

      {/* Cover page */}
      <section className="mb-8">
        <h2 className="mb-3 border-b border-slate-200 pb-1 text-sm font-semibold uppercase tracking-wide text-slate-600">
          Cover Page
        </h2>
        <dl className="space-y-3">
          {coverFields.map((field) => (
            <div key={field.label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {field.label}
              </dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-sm text-slate-800">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Signature block */}
        <div className="mt-6 overflow-hidden rounded-md border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2 font-semibold"> </th>
                <th className="px-3 py-2 font-semibold">Party 1</th>
                <th className="px-3 py-2 font-semibold">Party 2</th>
              </tr>
            </thead>
            <tbody>
              {signatureRows.map((row) => (
                <tr key={row.label} className="border-t border-slate-100">
                  <td className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {row.label}
                  </td>
                  <td className="whitespace-pre-wrap px-3 py-2">{row.party1}</td>
                  <td className="whitespace-pre-wrap px-3 py-2">{row.party2}</td>
                </tr>
              ))}
              <tr className="border-t border-slate-100">
                <td className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Signature
                </td>
                <td className="px-3 py-6"> </td>
                <td className="px-3 py-6"> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Standard terms */}
      <section>
        <h2 className="mb-3 border-b border-slate-200 pb-1 text-sm font-semibold uppercase tracking-wide text-slate-600">
          Standard Terms
        </h2>
        <ol className="list-decimal space-y-3 pl-5">
          {STANDARD_TERMS.map((clause) => (
            <li key={clause.heading} className="text-sm leading-relaxed">
              <span className="font-semibold">{clause.heading}. </span>
              {clause.body}
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-6 text-xs text-slate-400">{LICENSE_NOTICE}</p>
    </article>
  );
}
