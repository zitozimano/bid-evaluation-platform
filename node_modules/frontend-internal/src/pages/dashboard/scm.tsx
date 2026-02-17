import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import ScmDashboardPage from "../../modules/scm/ScmDashboardPage";

export default function Page() {
  return (
    <ProtectedRoute allowed={["SCM", "ADMIN"]}>
      <SidebarLayout title="SCM Dashboard">
        <ScmDashboardPage />
      </SidebarLayout>
    </ProtectedRoute>
  );
}
