import React, { useState, useRef, useEffect } from 'react';
import { IconSquareRoundedArrowDownFilled, IconSquareRoundedArrowUpFilled, IconSquareRoundedPlusFilled, IconBuildingStore, IconPaperBag } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const buttons = [
  { name: 'Create order', icon: IconSquareRoundedPlusFilled },
  { name: 'Fund wallet', icon: IconSquareRoundedArrowUpFilled },
  { name: 'Withdraw', icon: IconSquareRoundedArrowDownFilled }
];

const ActionButtons: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleCreateOrder = (role: 'seller' | 'buyer') => {
    setMenuOpen(false);
    navigate('/escrow/new');
  };

  return (
    <div className="flex space-x-4 mb-8 relative">
      {buttons.map((bt, idx) => (
        <div key={bt.name} className="relative">
          <button
            className="border border-primary-600 text-primary-600 px-6 py-2 rounded-lg font-light focus:outline-none"
            onClick={bt.name === 'Create order' ? () => setMenuOpen((open) => !open) : undefined}
          >
            <div className="flex space-x-2">
              <bt.icon className="w-5" />
              <span>{bt.name}</span>
            </div>
          </button>
          {bt.name === 'Create order' && menuOpen && (
            <div
              ref={menuRef}
              className="absolute left-0 z-10 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none p-4 flex flex-col space-y-4"
            >
              <button
                className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
                onClick={() => handleCreateOrder('seller')}
              >
                <IconBuildingStore className="w-6 h-6 text-gray-600" />
                <span className="text-gray-800">As a seller</span>
              </button>
              <button
                className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
                onClick={() => handleCreateOrder('buyer')}
              >
                <IconPaperBag className="w-6 h-6 text-gray-600" />
                <span className="text-gray-800">As a buyer</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActionButtons; 