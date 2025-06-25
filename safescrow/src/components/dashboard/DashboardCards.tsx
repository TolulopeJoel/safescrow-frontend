import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

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
  const [toggles, setToggles] = useState(cards.map(() => true));

  const handleToggle = (idx: number) => {
    setToggles((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  return (
    <div className="grid grid-cols-3 gap-5 mb-8">
      {cards.map((card, index) => {
        const {
          title,
          value,
          active = false,
          showToggle = false,
        } = card;

        const isVisible = showToggle ? toggles[index] : true;
        const displayValue = isVisible ? value : '****';

        return (
          <div
            key={index}
            className={`${active ? 'bg-primary-600 shadow-sm' : 'bg-primary-50'
              } rounded-lg p-7 flex flex-col justify-between space-y-8`}
          >
            <div
              className={`text-sm flex items-center mb-2 font-normal ${active ? 'text-white' : 'text-gray-500'}`}>
              {title}
              {showToggle && (
                <span onClick={() => handleToggle(index)}>
                  {toggles[index] ? (
                    <EyeIcon className="w-4 h-4 ml-1 cursor-pointer" />
                  ) : (
                    <EyeSlashIcon className="w-4 h-4 ml-1 cursor-pointer" />
                  )}
                </span>
              )}
            </div>

            <div className={`text-3xl ${active ? 'font-semibold text-white' : 'font-medium text-gray-900'}`}>
              {displayValue}
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default DashboardCards;
