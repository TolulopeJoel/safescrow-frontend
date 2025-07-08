import React from 'react';
import { DocumentTextIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { ProfileIcon } from '../icons/ExternalIcons';
import { IconGavel, IconGift, IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarLeftExpandFilled, IconTransfer } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';

const navItems = [
  { name: 'Overview', icon: Squares2X2Icon, path: '/dashboard' },
  { name: 'Transactions', icon: IconTransfer, path: '/transactions' },
  { name: 'Orders', icon: DocumentTextIcon, path: '/orders' },
  { name: 'Dispute resolution', icon: IconGavel, path: '/disputes' },
  { name: 'Referrals', icon: IconGift, path: '/referrals' },
  { name: 'Profile', icon: ProfileIcon, path: '/profile' },
];

const SidebarNav: React.FC = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const location = useLocation();

  // Responsive sidebar: on mobile, collapsed = hidden, expanded = full width
  // On desktop, collapsed = mini, expanded = full width

  return (
    <>
      {/* Floating toggle button for mobile when sidebar is hidden */}
      <button
        className={`fixed top-6 z-50 bg-white p-2 rounded shadow border border-gray-200 md:hidden
          transition-all duration-300 ease-in-out
          ${!isCollapsed ? 'opacity-0 -translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'}
        `}
        style={{ transition: 'opacity 0.3s, transform 0.3s' }}
        onClick={() => setIsCollapsed(false)}
        aria-label="Open sidebar"
      >
        <IconLayoutSidebarLeftExpandFilled className="w-6 h-6 text-gray-700" />
      </button>

      <aside
        className={`
          bg-white h-screen flex flex-col border-r border-gray-100 overflow-hidden py-18
          fixed md:fixed top-0 left-0 z-40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-0 md:w-16 px-0 md:px-1' : 'w-64 px-3'}
          ${isCollapsed ? 'hidden md:flex' : 'flex'}
          md:flex
        `}
        style={{ minHeight: '100vh', transition: 'width 0.3s, left 0.3s, padding 0.3s' }}
      >
        {/* Header with toggle */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}> 
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <IconLayoutSidebarLeftExpandFilled className="mt-3 text-gray-700 transition-all duration-300" />
              ) : (
                <IconLayoutSidebarLeftCollapseFilled className="mt-3 text-gray-700 transition-all duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className={`space-y-8 ${isCollapsed ? 'mx-1 ' : 'mx-6'}`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center ${isCollapsed && 'justify-center'} px-5 py-3 rounded-xl text-sm font-medium transition-colors group ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <div className={`${isActive ? 'text-white' : 'text-gray-400'} transition-all duration-300 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}>
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-900'} transition-all duration-300`} />
                    </div>

                    <span
                      className={`truncate transition-all duration-300 ease-in-out origin-left
                      ${isCollapsed ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0 ml-3'}`}
                      aria-hidden={isCollapsed}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SidebarNav;