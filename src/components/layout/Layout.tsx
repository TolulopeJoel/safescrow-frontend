import React from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutProps } from '../../types';
import { useSidebar } from '../../contexts/SidebarContext';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isCollapsed } = useSidebar();
  // Sidebar is 16 (md:w-16) when collapsed, 64 (md:w-64) when expanded
  const marginClass = isCollapsed ? 'md:ml-16' : 'md:ml-64';
  return (
    <div className={`min-h-screen ml-0 ${marginClass} transition-all duration-300`}>
      <main>
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout; 