import React, { useState } from 'react';
import { DocumentTextIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { ProfileIcon } from '../icons/ExternalIcons';
import { IconGavel, IconGift, IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarLeftExpandFilled, IconTransfer } from '@tabler/icons-react';

const navItems = [
  { name: 'Overview', icon: Squares2X2Icon, active: true },
  { name: 'Transactions', icon: IconTransfer },
  { name: 'Orders', icon: DocumentTextIcon },
  { name: 'Dispute resolution', icon: IconGavel },
  { name: 'Referrals', icon: IconGift },
  { name: 'Profile', icon: ProfileIcon },
];

const SidebarNav: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${isCollapsed ? 'w-16 px-1' : 'w-64 px-3'} bg-white h-screen flex flex-col ${isCollapsed ? 'py-18' : 'py-18'} transition-all duration-300 border-r border-gray-100 overflow-hidden`}>
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            {/* siddebar toggle icon */}
            {isCollapsed ? (
              <IconLayoutSidebarLeftExpandFilled className="mt-3 text-gray-700" />
            ) : (
              <IconLayoutSidebarLeftCollapseFilled className="mt-3 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className={`space-y-8 ${isCollapsed ? 'mx-1 ' : 'mx-6'}`}>
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className={`flex items-center ${isCollapsed && 'justify-center'} px-5 py-3 rounded-xl text-sm font-medium transition-colors group ${item.active
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                title={isCollapsed ? item.name : undefined}
              >
                <div className={`${item.active ? 'text-white' : 'text-gray-400'} transition-all duration-300 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}>
                  <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-gray-900'}`} />
                </div>

                <span
                  className={`truncate transition-all duration-300 ease-in-out origin-left
                    ${isCollapsed ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0 ml-3'}`}
                  aria-hidden={isCollapsed}
                >
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;