import React from 'react';

const ActionButtons: React.FC = () => (
  <div className="flex space-x-4 mb-8">
    <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium">+ Create order</button>
    <button className="bg-white border border-primary-600 text-primary-600 px-6 py-2 rounded-lg font-medium">Fund wallet</button>
    <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium">Withdraw</button>
  </div>
);

export default ActionButtons; 