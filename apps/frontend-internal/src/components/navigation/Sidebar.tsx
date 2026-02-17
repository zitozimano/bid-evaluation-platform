import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const role = user?.role;

  const isAdmin = role === 'ADMIN';
  const isEvaluator = role === 'EVALUATOR';
  const isViewer = role === 'VIEWER';

  const NavItem = ({ to, label }) => (
    <Link
      to={to}
      className={`block px-3 py-2 rounded hover:bg-gray-800 ${
        location.pathname.startsWith(to)
          ? 'bg-gray-800 text-blue-300'
          : 'text-gray-300'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 space-y-6">
      <h2 className="text-lg font-semibold">Navigation</h2>

      <nav className="space-y-6">

        {/* Evaluation */}
        {(isAdmin || isEvaluator || isViewer) && (
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-1">Evaluation</h3>
            <NavItem to="/evaluation" label="Evaluation Dashboard" />
          </div>
        )}

        {/* Tenders */}
        {(isAdmin || isEvaluator) && (
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-1">Tenders</h3>
            <NavItem to="/tenders" label="Tender Management" />
            <NavItem to="/tenders/:tenderId/health" label="Tender Health Dashboard" />
            <NavItem to="/tenders/:tenderId/agsa-pack" label="AGSA Pack Viewer" />
          </div>
        )}

        {/* SCM Command Center */}
        {(isAdmin || isViewer) && (
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-1">SCM Oversight</h3>
            <NavItem to="/command-center" label="SCM Command Center" />
          </div>
        )}

        {/* Compliance */}
        {(isAdmin || isViewer) && (
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-1">Compliance</h3>
            <NavItem to="/compliance" label="Compliance Dashboard" />
          </div>
        )}

        {/* Exports */}
        {(isAdmin || isViewer) && (
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-1">Exports</h3>
            <NavItem to="/exports" label="Export Center" />
          </div>
        )}

        {/* Departments */}
        {(isAdmin || isViewer) && (
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-1">Departments</h3>
            <NavItem to="/departments" label="Department Overview" />
          </div>
        )}

        {/* Users */}
        {isAdmin && (
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-1">Users</h3>
            <NavItem to="/users" label="User Management" />
          </div>
        )}

        {/* Audit */}
        {isAdmin && (
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-1">Audit</h3>
            <NavItem to="/audit" label="Audit Logs" />
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
