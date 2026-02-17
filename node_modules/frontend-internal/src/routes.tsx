// frontend/src/routes.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { CfoPortfolioDashboard } from './features/cfo/CfoPortfolioDashboard';
// ...other imports

export const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* existing routes... */}

      <Route
        path="/cfo/portfolio"
        element={
          <ProtectedRoute roles={['ADMIN', 'CFO']}>
            <CfoPortfolioDashboard />
          </ProtectedRoute>
        }
      />

      {/* fallback, etc. */}
    </Routes>
  </BrowserRouter>
);
