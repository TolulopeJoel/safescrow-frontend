import React from 'react';
import logo from '../../logo.svg';
import { IconBell } from '@tabler/icons-react';

const Topbar: React.FC = () => (
  <header className="flex items-center justify-between bg-white px-8 py-4 border-b">
    <div className="flex items-center space-x-3">
      <img src={logo} alt="Safescrow Logo" className="w-10 h-10" />
      <span className="text-xl font-bold text-gray-800">Safescrow</span>
    </div>
    <div className="flex items-center space-x-4">
      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="sr-only">Notifications</span>
        <IconBell className="w-6 h-6 text-gray-600"/>
      </button>
      <div className="flex items-center">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full mr-2" />
        <span className="font-medium">Akinkanju Ebere</span>
      </div>
    </div>
  </header>
);

export default Topbar; 