import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCurrentUser, requireRole } from "../../lib/auth";

type Props = {
  allowed: string[];
  children: React.ReactNode;
};

export function ProtectedRoute({ allowed, children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (!requireRole(allowed)) {
      router.replace("/auth/login");
      return;
    }

    setAuthorized(true);
  }, [router, allowed]);

  if (!authorized) {
    return (
      <div className="p-6 text-center text-slate-500">
        Checking permissions…
      </div>
    );
  }

  return <>{children}</>;
}
