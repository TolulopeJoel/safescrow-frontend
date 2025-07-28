import React, { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { DashboardCard } from 'types';

const balance = 66450;
const cards: DashboardCard[] = [
  { title: 'Wallet balance', value: `₦${balance.toLocaleString()}`, showToggle: true, active: true, },
  { title: 'Balance in escrow', value: `₦${(balance + 13910).toLocaleString()}`, showToggle: true, },
  { title: 'Pending orders', value: 3, },
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
            className={`${active ? 'bg-primary-600' : 'bg-primary-50'
              } shadow-sm rounded-lg p-7 flex flex-col justify-between space-y-8`}
          >
            <div
              className={`text-sm flex items-center mb-2 font-normal ${active ? 'text-white' : 'text-gray-500'}`}>
              {title}
              {showToggle && (
                <span onClick={() => handleToggle(index)}>
                  {toggles[index] ? (
                    <IconEye className="w-4 h-4 ml-1 cursor-pointer" />
                  ) : (
                    <IconEyeOff className="w-4 h-4 ml-1 cursor-pointer" />
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
