import "./globals.css";
import Sidebar from "../components/sidebar/Sidebar";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 bg-slate-50">{children}</main>
        </div>
      </body>
    </html>
  );
}
