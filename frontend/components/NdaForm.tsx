"use client";

import type { NdaFormData, PartyInfo } from "@/lib/ndaTypes";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent";
const labelClass = "block text-sm font-medium text-slate-700 mb-1";
const sectionClass = "rounded-lg border border-slate-200 bg-white p-5 shadow-sm";
const legendClass = "text-base font-semibold text-brand mb-4";

export default function NdaForm({ data, onChange }: NdaFormProps) {
  // Update a single top-level field.
  const set = <K extends keyof NdaFormData>(key: K, value: NdaFormData[K]) =>
    onChange({ ...data, [key]: value });

  // Update a single field of one of the two parties.
  const setParty = (
    party: "party1" | "party2",
    key: keyof PartyInfo,
    value: string,
  ) => onChange({ ...data, [party]: { ...data[party], [key]: value } });

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* Agreement terms */}
      <fieldset className={sectionClass}>
        <legend className={legendClass}>Agreement Details</legend>

        <div className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="purpose">
              Purpose
            </label>
            <textarea
              id="purpose"
              className={inputClass}
              rows={2}
              value={data.purpose}
              onChange={(e) => set("purpose", e.target.value)}
              placeholder="How Confidential Information may be used"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="effectiveDate">
              Effective Date
            </label>
            <input
              id="effectiveDate"
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => set("effectiveDate", e.target.value)}
            />
          </div>

          {/* MNDA Term */}
          <fieldset>
            <legend className={labelClass}>MNDA Term</legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={data.mndaTermType === "expires"}
                  onChange={() => set("mndaTermType", "expires")}
                />
                Expires
                <input
                  type="number"
                  min="1"
                  className="w-20 rounded-md border border-slate-300 px-2 py-1 text-sm disabled:bg-slate-100"
                  value={data.mndaTermYears}
                  disabled={data.mndaTermType !== "expires"}
                  onChange={(e) => set("mndaTermYears", e.target.value)}
                />
                year(s) from the Effective Date
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={data.mndaTermType === "untilTerminated"}
                  onChange={() => set("mndaTermType", "untilTerminated")}
                />
                Continues until terminated
              </label>
            </div>
          </fieldset>

          {/* Term of Confidentiality */}
          <fieldset>
            <legend className={labelClass}>Term of Confidentiality</legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={data.confidentialityTermType === "years"}
                  onChange={() => set("confidentialityTermType", "years")}
                />
                <input
                  type="number"
                  min="1"
                  className="w-20 rounded-md border border-slate-300 px-2 py-1 text-sm disabled:bg-slate-100"
                  value={data.confidentialityTermYears}
                  disabled={data.confidentialityTermType !== "years"}
                  onChange={(e) =>
                    set("confidentialityTermYears", e.target.value)
                  }
                />
                year(s) from the Effective Date
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={data.confidentialityTermType === "perpetuity"}
                  onChange={() => set("confidentialityTermType", "perpetuity")}
                />
                In perpetuity
              </label>
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="governingLaw">
                Governing Law (State)
              </label>
              <input
                id="governingLaw"
                className={inputClass}
                value={data.governingLaw}
                onChange={(e) => set("governingLaw", e.target.value)}
                placeholder="e.g. Delaware"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="jurisdiction">
                Jurisdiction
              </label>
              <input
                id="jurisdiction"
                className={inputClass}
                value={data.jurisdiction}
                onChange={(e) => set("jurisdiction", e.target.value)}
                placeholder="e.g. New Castle, DE"
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="modifications">
              MNDA Modifications (optional)
            </label>
            <textarea
              id="modifications"
              className={inputClass}
              rows={2}
              value={data.modifications}
              onChange={(e) => set("modifications", e.target.value)}
              placeholder="List any modifications to the standard MNDA"
            />
          </div>
        </div>
      </fieldset>

      {/* Parties */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {(["party1", "party2"] as const).map((party, idx) => (
          <fieldset key={party} className={sectionClass}>
            <legend className={legendClass}>Party {idx + 1}</legend>
            <div className="space-y-4">
              <div>
                <label className={labelClass} htmlFor={`${party}-name`}>
                  Print Name
                </label>
                <input
                  id={`${party}-name`}
                  className={inputClass}
                  value={data[party].printName}
                  onChange={(e) => setParty(party, "printName", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${party}-title`}>
                  Title
                </label>
                <input
                  id={`${party}-title`}
                  className={inputClass}
                  value={data[party].title}
                  onChange={(e) => setParty(party, "title", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${party}-company`}>
                  Company
                </label>
                <input
                  id={`${party}-company`}
                  className={inputClass}
                  value={data[party].company}
                  onChange={(e) => setParty(party, "company", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${party}-address`}>
                  Notice Address
                </label>
                <input
                  id={`${party}-address`}
                  className={inputClass}
                  value={data[party].noticeAddress}
                  onChange={(e) =>
                    setParty(party, "noticeAddress", e.target.value)
                  }
                  placeholder="Email or postal address"
                />
              </div>
            </div>
          </fieldset>
        ))}
      </div>
    </form>
  );
}
