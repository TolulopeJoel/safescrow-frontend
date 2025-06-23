import React from 'react';

const ToggleIcon = () => (
  <svg className="w-3 h-3 ml-1 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /> <path d="M12 16v-4" /> <path d="M12 8h.01" />
  </svg>
);

type CardProps = {
  title: string;
  value: string | number;
  active?: boolean;
  showToggle?: boolean;
};

const cards: CardProps[] = [
  { title: 'Wallet balance', value: '₦40,000', showToggle: true, active: true },
  { title: 'Balance in escrow', value: '₦60,000', showToggle: true, },
  { title: 'Pending transactions', value: 3, },
];

const DashboardCards: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-5 mb-8">
      {cards.map((card, index) => (
        <div key={index} className={`${card.active ? 'bg-primary-600 shadow-sm' : 'bg-primary-50'} rounded-lg p-7 flex flex-col justify-between space-y-8`}>
          <div className={`text-sm flex items-center mb-2 font-normal ${card.active ? 'text-white' : 'text-gray-500'}`}>
            {card.title} {card.showToggle && <ToggleIcon />}
          </div>
          <div className={`text-3xl ${card.active ? 'font-semibold text-white' : 'font-medium text-gray-900'}`}>{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
