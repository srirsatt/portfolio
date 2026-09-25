import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Résumé | Sriram Sattiraju",
  description: "Sriram Sattiraju’s résumé.",
};

const resumeUrl = "/pdfs/resume.pdf";

export default function Resume() {
  return (
    <main className="flex h-dvh flex-col">
      <object
        data={resumeUrl}
        type="application/pdf"
        aria-label="Sriram Sattiraju’s résumé"
        className="min-h-0 w-full flex-1"
      >
        <p className="p-6 text-sm">
          <a href={resumeUrl} className="underline underline-offset-4">
            Open the résumé PDF
          </a>
          {" "}to view or download it.
        </p>
      </object>
    </main>
  );
}
