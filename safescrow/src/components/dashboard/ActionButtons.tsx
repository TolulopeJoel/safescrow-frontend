import React from 'react';
import { PlusIcon, ArrowUpTrayIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const buttons = [
  { name: 'Create order', icon: PlusIcon },
  { name: 'Fund wallet', icon: ArrowDownTrayIcon },
  { name: 'Withdraw', icon: ArrowUpTrayIcon }
]

const ActionButtons: React.FC = () => (
  <div className="flex space-x-4 mb-8">
    {buttons.map(bt => (
      <button className="border border-primary-600 text-primary-600 px-6 py-2 rounded-lg font-light">
        <div className="flex space-x-2">
          <bt.icon className="w-5" />
          <span>{bt.name}</span>
        </div>
      </button>
    ))}
  </div>
);

export default ActionButtons; 