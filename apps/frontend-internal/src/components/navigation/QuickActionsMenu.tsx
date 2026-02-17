import React from 'react';
import {
  getCouncilPackPdfUrl,
  getDepartmentComparisonPdfUrl,
  getCfoGuidePdfUrl,
  getScmGuidePdfUrl,
  getAuditGuidePdfUrl,
} from '../../features/compliance/api';

type QuickActionsProps = {
  role: string;
  darkMode: boolean;
};

export const QuickActionsMenu: React.FC<QuickActionsProps> = ({ role, darkMode }) => {
  const baseButtonStyle: React.CSSProperties = {
    padding: '6px 10px',
    borderRadius: 4,
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: 12,
    background: darkMode ? '#111827' : '#ffffff',
    color: darkMode ? '#e5e7eb' : '#111827',
  };

  const actions: Record<string, JSX.Element[]> = {
    CFO: [
      <a href={getCouncilPackPdfUrl()} target="_blank" rel="noopener noreferrer" key="council">
        <button style={baseButtonStyle}>Council Pack</button>
      </a>,
      <a
        href={getDepartmentComparisonPdfUrl()}
        target="_blank"
        rel="noopener noreferrer"
        key="dept-comp"
      >
        <button style={baseButtonStyle}>Dept Comparison PDF</button>
      </a>,
      <a href={getCfoGuidePdfUrl()} target="_blank" rel="noopener noreferrer" key="cfo-guide">
        <button style={baseButtonStyle}>CFO Guide</button>
      </a>,
    ],
    SCM: [
      <a href={getScmGuidePdfUrl()} target="_blank" rel="noopener noreferrer" key="scm-guide">
        <button style={baseButtonStyle}>SCM Guide</button>
      </a>,
    ],
    Audit: [
      <a href={getAuditGuidePdfUrl()} target="_blank" rel="noopener noreferrer" key="audit-guide">
        <button style={baseButtonStyle}>Audit Guide</button>
      </a>,
      <a href={getCouncilPackPdfUrl()} target="_blank" rel="noopener noreferrer" key="council">
        <button style={baseButtonStyle}>Council Pack</button>
      </a>,
    ],
  };

  return (
    <div
      style={{
        padding: '10px 16px',
        background: darkMode ? '#020617' : '#fff8e1',
        borderBottom: darkMode ? '1px solid #1f2937' : '1px solid #ddd',
      }}
    >
      <h4 style={{ marginBottom: 8, fontSize: 13 }}>Quick Actions</h4>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {actions[role] || <span style={{ fontSize: 12 }}>No quick actions for this role.</span>}
      </div>
    </div>
  );
};
