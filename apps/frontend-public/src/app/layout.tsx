import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Bid Evaluation Platform – Verification",
  description: "Public verification portal for evaluation packs and hashes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="flex min-h-screen flex-col">

          {/* Header */}
          <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-emerald-400">
                  Bid Evaluation Platform
                </span>
                <span className="text-xs text-slate-400">
                  Public Verification Portal
                </span>
              </div>

              <nav className="flex gap-4 text-sm">
                <a
                  href="/verify"
                  className="text-slate-300 transition hover:text-emerald-400"
                >
                  Verify Hash
                </a>
                <a
                  href="/verify/scan"
                  className="text-slate-300 transition hover:text-emerald-400"
                >
                  Scan QR
                </a>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-slate-800 bg-slate-900/80">
            <div className="mx-auto flex max-w-4xl justify-between px-4 py-3 text-xs text-slate-500">
              <span>© {new Date().getFullYear()} Bid Evaluation Platform</span>
              <span>For official verification only</span>
            </div>
          </footer>

        </div>
      </body>
    </html>
  );
}

