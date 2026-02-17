import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import CfoDashboardPage from "../../modules/cfo/CfoDashboardPage";

export default function Page() {
  return (
    <ProtectedRoute allowed={["CFO", "ADMIN", "AUDIT"]}>
      <SidebarLayout title="CFO Analytics Dashboard">
        <CfoDashboardPage />
      </SidebarLayout>
    </ProtectedRoute>
  );
}
