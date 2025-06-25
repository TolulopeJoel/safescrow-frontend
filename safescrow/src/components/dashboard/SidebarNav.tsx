import React, { useState } from 'react';
import { DocumentTextIcon, ArrowsRightLeftIcon, UserIcon, Squares2X2Icon, ExclamationCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Overview', icon: Squares2X2Icon, active: true },
  { name: 'Transactions', icon: ArrowsRightLeftIcon },
  { name: 'Orders', icon: DocumentTextIcon },
  { name: 'Dispute resolution', icon: ExclamationCircleIcon },
  { name: 'Referrals', icon: UserGroupIcon },
  { name: 'Profile', icon: UserIcon },
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
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mt-3 text-gray-700"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 3a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h12zm-3 2h-9a1 1 0 0 0 -.993 .883l-.007 .117v12a1 1 0 0 0 .883 .993l.117 .007h9v-14zm-5.387 4.21l.094 .083l2 2a1 1 0 0 1 .083 1.32l-.083 .094l-2 2a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.292 -1.293l-1.292 -1.293a1 1 0 0 1 -.083 -1.32l.083 -.094a1 1 0 0 1 1.32 -.083z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mt-3 text-gray-700"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 3a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h12zm0 2h-9v14h9a1 1 0 0 0 .993 -.883l.007 -.117v-12a1 1 0 0 0 -.883 -.993l-.117 -.007zm-2.293 4.293a1 1 0 0 1 .083 1.32l-.083 .094l-1.292 1.293l1.292 1.293a1 1 0 0 1 .083 1.32l-.083 .094a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 -.083 -1.32l.083 -.094l2 -2a1 1 0 0 1 1.414 0z" /></svg>
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