import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import SiteNav from "./components/SiteNav";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Sriram Sattiraju",
  description: "portfolio for sriram sattiraju",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${ibmPlexMono.variable} ${ibmPlexMono.className} antialiased`}
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.dataset.theme =
                  localStorage.getItem("theme") === "light" ? "light" : "dark";
              } catch {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
