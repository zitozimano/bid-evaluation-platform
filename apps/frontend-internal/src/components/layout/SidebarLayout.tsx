import Link from "next/link";
import { useRouter } from "next/router";
import { getCurrentUser, logout } from "../../lib/auth";
import { useTheme } from "../theme/ThemeProvider";
import { Button } from "../ui/Button";

export function SidebarLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = getCurrentUser();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  const can = (roles: string[]) => roles.includes(user?.role);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="text-lg font-semibold">BidEval Internal</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {user?.email}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Role: {user?.role}
          </div>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 px-4 text-sm">
          {can(["SCM", "ADMIN"]) && (
            <Link
              href="/dashboard/scm"
              className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              SCM Dashboard
            </Link>
          )}

          {can(["CFO", "ADMIN", "AUDIT"]) && (
            <Link
              href="/dashboard/cfo"
              className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              CFO Dashboard
            </Link>
          )}

          {can(["ADMIN"]) && (
            <Link
              href="/dashboard/admin"
              className="rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Admin Dashboard
            </Link>
          )}
        </nav>

        <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <div className="mb-2 flex items-center justify-between">
            <span>Theme</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            >
              {theme === "light" ? "Dark" : "Light"}
            </Button>
          </div>
          <Button
            variant="danger"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 px-8 py-6">
        <h1 className="mb-6 text-xl font-semibold">{title}</h1>
        {children}
      </main>
    </div>
  );
}
