import React from 'react';

const ToggleIcon = () => (
  <svg className="w-3 h-3 ml-1 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /> <path d="M12 16v-4" /> <path d="M12 8h.01" />
  </svg>
);

type CardProps = {
  title: string;
  value: string | number;
  showToggleIcon?: boolean;
};

const cards: CardProps[] = [
  { title: 'Balance in escrow', value: '₦60,000', showToggleIcon: true, },
  { title: 'Pending transactions', value: 3, },
];

const Card: React.FC<CardProps> = ({
  title, value,
  showToggleIcon: showIcon = false,
}) => (
  <div className="bg-primary-100 rounded-lg p-7 flex flex-col justify-between">
    <div className="text-sm flex items-center mb-2 font-normal text-gray-500">
      {title} {showIcon && <ToggleIcon />}
    </div>
    <div className="text-3xl font-medium text-gray-900">{value}</div>
  </div>
);

const DashboardCards: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8 max-w-4xl h-1/3">
      {/* Main Card (Wallet Balance) */}
      <div className="bg-blue-600 rounded-lg p-7 flex flex-col justify-between text-white shadow-sm">
        <div className="text-sm flex items-center mb-2 text-blue-100 font-normal">
          Wallet balance <ToggleIcon />
        </div>
        <div className="text-3xl font-semibold">₦40,000</div>
      </div>
      {/* Other Cards */}
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default DashboardCards;
