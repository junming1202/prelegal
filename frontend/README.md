# Prelegal Frontend — Mutual NDA Creator

A prototype web application (Jira **PL-3**) for creating a Mutual Non-Disclosure
Agreement. The user fills in a form, sees a live preview of the completed NDA,
and downloads it as a PDF.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and
**[@react-pdf/renderer](https://react-pdf.org/)** for client-side PDF generation.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

- `app/page.tsx` — holds the form state and lays out the form (left) and live
  preview (right).
- `components/NdaForm.tsx` — controlled form for all cover-page fields.
- `components/NdaPreview.tsx` — live, on-screen rendering of the completed NDA.
- `components/NdaPdfDocument.tsx` — the `@react-pdf/renderer` document used to
  produce the downloadable PDF.
- `components/DownloadButton.tsx` — generates the PDF blob and triggers the
  download (loaded without SSR since `@react-pdf/renderer` is browser-only).
- `lib/ndaContent.ts` — the bundled Common Paper Mutual NDA Standard Terms plus
  helpers that turn form data into display strings. **Both** the preview and the
  PDF use these helpers, so they never diverge.
- `lib/ndaTypes.ts` — the form data type and its defaults.

## Source & license

The NDA text is from the [Common Paper Mutual NDA](https://github.com/CommonPaper/Mutual-NDA)
(Version 1.0), free to use and modify under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
