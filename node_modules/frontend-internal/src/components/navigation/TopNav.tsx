import React from 'react';
import { GlobalSearch } from '../../ui/navigation/GlobalSearch';
import { NotificationCenter } from '../../ui/navigation/NotificationCenter';
import { TenantSwitcher } from '../../ui/navigation/TenantSwitcher';
import { UserMenu } from '../../ui/navigation/UserMenu';

const TopNav: React.FC = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left: Tenant Switcher */}
      <div className="flex items-center space-x-4">
        <TenantSwitcher />
      </div>

      {/* Center: Global Search */}
      <div className="flex-1 max-w-xl mx-auto">
        <GlobalSearch />
      </div>

      {/* Right: Notifications + User Menu */}
      <div className="flex items-center space-x-4">
        <NotificationCenter />
        <UserMenu />
      </div>
    </header>
  );
};

export default TopNav;
