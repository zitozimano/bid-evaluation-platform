import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { UserRole } from '../auth/api';

type CardConfig = {
  role: UserRole;
  title: string;
  description: string;
  primaryRoute: string;
};

export const RoleLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { role, loading } = useAuth();

  const cards: CardConfig[] = [
    {
      role: 'CFO',
      title: 'CFO Executive View',
      description: 'See municipality‑wide risk, compliance, and AGSA readiness in one place.',
      primaryRoute: '/dashboard/executive',
    },
    {
      role: 'SCM',
      title: 'SCM Operational View',
      description: 'Track tender timelines, delays, and SCM performance.',
      primaryRoute: '/dashboard/scm',
    },
    {
      role: 'Evaluator',
      title: 'Evaluator Workbench',
      description: 'See your assigned tenders and evaluation performance.',
      primaryRoute: '/dashboard/evaluator',
    },
    {
      role: 'Audit',
      title: 'Internal Audit Risk View',
      description: 'Focus on high‑risk departments and AGSA readiness.',
      primaryRoute: '/departments-risk',
    },
    {
      role: 'AGSA',
      title: 'AGSA Readiness View',
      description: 'Review AGSA readiness and supporting evidence.',
      primaryRoute: '/departments-risk',
    },
    {
      role: 'Council',
      title: 'Council Oversight View',
      description: 'Use Council Pack PDFs to support oversight and decisions.',
      primaryRoute: '/help',
    },
  ];

  if (loading) {
    return <div style={{ padding: 32 }}>Loading your role…</div>;
  }

  const activeCard = cards.find((c) => c.role === role);

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ marginBottom: 8 }}>Welcome</h2>
      <p style={{ marginBottom: 24 }}>
        This landing page routes you to the most relevant dashboard for your role.
      </p>

      {activeCard ? (
        <div
          style={{
            borderRadius: 8,
            border: '1px solid #ddd',
            padding: 24,
            maxWidth: 480,
            marginBottom: 32,
          }}
        >
          <h3 style={{ marginBottom: 8 }}>{activeCard.title}</h3>
          <p style={{ marginBottom: 16 }}>{activeCard.description}</p>
          <button
            onClick={() => navigate(activeCard.primaryRoute)}
            style={{
              padding: '8px 14px',
              borderRadius: 4,
              border: 'none',
              background: '#1a73e8',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Go to {activeCard.title}
          </button>
        </div>
      ) : (
        <div
          style={{
            borderRadius: 8,
            border: '1px solid #ddd',
            padding: 24,
            maxWidth: 480,
            marginBottom: 32,
          }}
        >
          <h3 style={{ marginBottom: 8 }}>No role detected</h3>
          <p style={{ marginBottom: 16 }}>
            We could not detect a specific role for your account. You can still browse the
            platform using the navigation.
          </p>
        </div>
      )}

      <h4 style={{ marginBottom: 12 }}>Available role views</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {cards.map((c) => (
          <div
            key={c.role}
            style={{
              borderRadius: 8,
              border: '1px solid #eee',
              padding: 16,
              width: 260,
            }}
          >
            <strong>{c.title}</strong>
            <p style={{ fontSize: 13, margin: '8px 0 12px' }}>{c.description}</p>
            <button
              onClick={() => navigate(c.primaryRoute)}
              style={{
                padding: '6px 10px',
                borderRadius: 4,
                border: '1px solid #1a73e8',
                background: '#fff',
                color: '#1a73e8',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
