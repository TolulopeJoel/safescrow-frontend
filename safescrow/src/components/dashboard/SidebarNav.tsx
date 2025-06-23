import React from 'react';
import { HomeIcon, WalletIcon, DocumentTextIcon, ClipboardIcon, ExclamationCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Overview', icon: HomeIcon, active: true },
  { name: 'Wallet', icon: WalletIcon },
  { name: 'Transactions', icon: DocumentTextIcon },
  { name: 'Orders', icon: ClipboardIcon },
  { name: 'Dispute resolution', icon: ExclamationCircleIcon },
  { name: 'Referrals', icon: UserGroupIcon },
];

const SidebarNav: React.FC = () => (
  <aside className="w-64 bg-white border-r flex flex-col py-8 px-4">
    <div className="flex items-center mb-12">
      <img src="/favicon.ico" alt="Logo" className="w-8 h-8 mr-2" />
      <span className="font-bold text-2xl">Safescrow</span>
    </div>
    <nav className="flex-1">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href="#"
              className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${item.active ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${item.active ? 'text-white' : 'text-gray-400'}`} />
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default SidebarNav; 