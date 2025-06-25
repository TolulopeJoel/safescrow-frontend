import React from 'react';
import logo from '../../logo.svg';

const Topbar: React.FC = () => (
  <header className="flex items-center justify-between bg-white px-8 py-4 border-b">
    <div className="flex items-center space-x-3">
      <img src={logo} alt="Safescrow Logo" className="w-10 h-10" />
      <span className="text-xl font-bold text-gray-800">Safescrow</span>
    </div>
    <div className="flex items-center space-x-4">
      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="sr-only">Notifications</span>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
      </button>
      <div className="flex items-center">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full mr-2" />
        <span className="font-medium">Akinkanju Ebere</span>
      </div>
    </div>
  </header>
);

export default Topbar; 