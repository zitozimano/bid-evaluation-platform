import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { InternalSidebar } from "@/components/layout/InternalSidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex min-h-screen">
            <InternalSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
