import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/navigation/Sidebar';
import { TopNav } from './components/navigation/TopNav';
import { Breadcrumbs } from './components/navigation/Breadcrumbs';
import { QuickActionsMenu } from './components/navigation/QuickActionsMenu';
import { useAuth } from './features/auth/AuthContext';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { role, loading } = useAuth();

  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(true);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const bgColor = darkMode ? '#121212' : '#ffffff';
  const textColor = darkMode ? '#f5f5f5' : '#222222';

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: bgColor,
          color: textColor,
        }}
      >
        Loading user…
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        background: bgColor,
        color: textColor,
        minHeight: '100vh',
      }}
    >
      <Sidebar collapsed={sidebarCollapsed} darkMode={darkMode} isMobile={isMobile} />

      <div
        style={{
          flex: 1,
          marginLeft: sidebarCollapsed ? (isMobile ? 0 : 64) : (isMobile ? 0 : 240),
          transition: 'margin-left 0.2s ease',
        }}
      >
        <TopNav
          role={role}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((d) => !d)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
          isMobile={isMobile}
        />

        <Breadcrumbs darkMode={darkMode} />

        <QuickActionsMenu role={role} darkMode={darkMode} />

        <div style={{ padding: isMobile ? 16 : 24 }}>{children}</div>
      </div>
    </div>
  );
};
