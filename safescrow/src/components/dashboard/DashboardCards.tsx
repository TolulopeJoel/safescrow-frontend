import React from 'react';

const DashboardCards: React.FC = () => (
  <div className="grid grid-cols-3 gap-6 mb-8">
    {/* Wallet balance */}
    <div className="bg-primary-600 rounded-xl p-6 text-white shadow relative">
      <div className="text-sm flex items-center mb-2">Wallet balance <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg></div>
      <div className="text-3xl font-bold">₦0.00</div>
    </div>
    {/* Balance in escrow */}
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="text-sm flex items-center mb-2">Balance in escrow <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg></div>
      <div className="text-3xl font-bold text-gray-900">₦0.00</div>
    </div>
    {/* Pending orders */}
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="text-sm mb-2">Pending orders</div>
      <div className="text-3xl font-bold text-gray-900">0</div>
    </div>
  </div>
);

export default DashboardCards; 