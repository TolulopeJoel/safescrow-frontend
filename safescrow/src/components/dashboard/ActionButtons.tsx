import React from 'react';

const ActionButtons: React.FC = () => (
  <div className="flex space-x-4 mb-8">
    <button className="border border-primary-600 text-primary-600 px-6 py-2 rounded-lg font-light">+ Create order</button>
    <button className="border border-primary-600 text-primary-600 px-6 py-2 rounded-lg font-light">Fund wallet</button>
    <button className="border border-primary-600 text-primary-600 px-6 py-2 rounded-lg font-light">Withdraw</button>
  </div>
);

export default ActionButtons; 