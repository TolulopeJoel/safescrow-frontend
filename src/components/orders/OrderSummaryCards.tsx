import React from 'react';

const cards = [
  { title: 'Total orders', value: 40 },
  { title: 'Active orders', value: 40 },
  { title: 'Pending orders', value: 40 },
  { title: 'Completed orders', value: 40 },
];

const OrderSummaryCards: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
    {cards.map((card, idx) => (
      <div key={idx} className="bg-white rounded-xl shadow-2xs p-6 flex flex-col items-center">
        <div className="text-xs text-gray-400 mb-2">{card.title}</div>
        <div className="text-2xl font-bold text-gray-800">{card.value}</div>
      </div>
    ))}
  </div>
);

export default OrderSummaryCards; 