// Type definitions and defaults for the Mutual NDA cover-page form.
// These mirror the fillable fields of the Common Paper Mutual NDA Cover Page
// (see templates/Mutual-NDA-coverpage.md).

/** Details for a single party to the agreement. */
export interface PartyInfo {
  printName: string;
  title: string;
  company: string;
  noticeAddress: string;
}

/** How long the MNDA itself remains in effect. */
export type MndaTermType = "expires" | "untilTerminated";

/** How long Confidential Information stays protected after the MNDA ends. */
export type ConfidentialityTermType = "years" | "perpetuity";

/** All user-supplied values needed to render a completed Mutual NDA. */
export interface NdaFormData {
  purpose: string;
  effectiveDate: string;

  mndaTermType: MndaTermType;
  mndaTermYears: string;

  confidentialityTermType: ConfidentialityTermType;
  confidentialityTermYears: string;

  governingLaw: string;
  jurisdiction: string;
  modifications: string;

  party1: PartyInfo;
  party2: PartyInfo;
}

const emptyParty = (): PartyInfo => ({
  printName: "",
  title: "",
  company: "",
  noticeAddress: "",
});

/**
 * Sensible defaults that mirror the checked boxes in the source template,
 * so the live preview looks complete the moment the page loads.
 */
export const defaultFormData = (): NdaFormData => ({
  purpose:
    "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: "",

  mndaTermType: "expires",
  mndaTermYears: "1",

  confidentialityTermType: "years",
  confidentialityTermYears: "1",

  governingLaw: "",
  jurisdiction: "",
  modifications: "",

  party1: emptyParty(),
  party2: emptyParty(),
});
