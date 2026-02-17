import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import AdminDashboardPage from "../../modules/admin/AdminDashboardPage";

export default function Page() {
  return (
    <ProtectedRoute allowed={["ADMIN"]}>
      <SidebarLayout title="Admin Dashboard">
        <AdminDashboardPage />
      </SidebarLayout>
    </ProtectedRoute>
  );
}
