import React from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutProps } from '../../types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <main>
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout; 