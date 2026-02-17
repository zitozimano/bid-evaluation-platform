import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDepartmentNarrative } from './api';
import { DepartmentNav } from './DepartmentNav';

export const DepartmentNarrativePage: React.FC = () => {
  const { department } = useParams();
  const [narrative, setNarrative] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!department) return;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchDepartmentNarrative(department);
        setNarrative(data.narrative);
      } finally {
        setLoading(false);
      }
    })();
  }, [department]);

  if (loading) return <div style={{ padding: 24 }}>Generating narrative…</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Department Narrative: {department}</h2>
      <DepartmentNav />
      <p style={{ whiteSpace: 'pre-line', marginTop: 16 }}>{narrative}</p>
    </div>
  );
};
