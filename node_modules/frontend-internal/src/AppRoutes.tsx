// src/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import EvaluationPackPage from "./pages/EvaluationPackPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* other routes */}
      <Route path="/tenders/:tenderId/evaluation-pack" element={<EvaluationPackPage />} />
    </Routes>
  );
}
