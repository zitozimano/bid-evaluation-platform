import React from 'react';
import {
  getCfoGuidePdfUrl,
  getScmGuidePdfUrl,
  getEvaluatorGuidePdfUrl,
  getAuditGuidePdfUrl,
  getCouncilGuidePdfUrl,
} from '../compliance/api';

export const HelpAndGuidesPage: React.FC = () => {
  return (
    <div style={{ padding: 32 }}>
      <h2>Help & Guides</h2>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Download quick‑reference guides for each role. These PDFs provide
        one‑page summaries of responsibilities, dashboards, workflows, and
        key actions.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <a href={getCfoGuidePdfUrl()} target="_blank" rel="noopener noreferrer">
          <button style={{ width: '100%' }}>📘 CFO Guide (PDF)</button>
        </a>

        <a href={getScmGuidePdfUrl()} target="_blank" rel="noopener noreferrer">
          <button style={{ width: '100%' }}>📗 SCM Guide (PDF)</button>
        </a>

        <a href={getEvaluatorGuidePdfUrl()} target="_blank" rel="noopener noreferrer">
          <button style={{ width: '100%' }}>📙 Evaluator Guide (PDF)</button>
        </a>

        <a href={getAuditGuidePdfUrl()} target="_blank" rel="noopener noreferrer">
          <button style={{ width: '100%' }}>📕 Internal Audit / AGSA Guide (PDF)</button>
        </a>

        <a href={getCouncilGuidePdfUrl()} target="_blank" rel="noopener noreferrer">
          <button style={{ width: '100%' }}>📒 Council Guide (PDF)</button>
        </a>
      </div>
    </div>
  );
};
