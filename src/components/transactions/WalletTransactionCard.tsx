import React from 'react';
import TransactionStatusBadge from './TransactionStatusBadge';
import { IconArrowDownLeft, IconArrowUpRight, IconCurrencyNaira } from '@tabler/icons-react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { Transaction } from 'types';

interface WalletTransactionCardProps {
  transaction: Transaction;
  isLast?: boolean;
}

const typeIcon = {
  funding: IconArrowDownLeft,
  withdrawal: IconArrowUpRight,
  'escrow release': BanknotesIcon,
  fee: IconArrowUpRight,
  bonus: IconArrowDownLeft,
  refund: IconArrowDownLeft,
  transfer: IconCurrencyNaira,
};

const WalletTransactionCard: React.FC<WalletTransactionCardProps> = ({ transaction, isLast }) => {
  const Icon = typeIcon[transaction.type] || IconCurrencyNaira;
  const isCredit = transaction.direction === 'credit';
  const amountColor = isCredit ? 'text-green-600' : 'text-red-600';
  const sign = isCredit ? '+' : '-';

  return (
    <div className={`grid grid-cols-[auto_1fr_auto] items-center px-2 sm:px-8 py-4 sm:py-6 ${!isLast && 'border-b border-gray-300'} gap-3 sm:gap-6`}>
      {/* Icon */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <span className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${isCredit ? 'bg-green-50' : 'bg-red-50'}`}>
          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${isCredit ? 'text-primary-600' : 'text-blue-600'}`} />
        </span>
      </div>
      {/* Main content */}
      <div className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2 gap-1 sm:gap-2">
          <span className="font-semibold text-base sm:text-lg capitalize text-gray-900 block">{transaction.type}</span>
        </div>
        <div className="text-gray-700 text-sm sm:text-base mb-1 sm:mb-2">{transaction.description}</div>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs">
          <span className="text-gray-500">{transaction.date}</span>
          <span className="text-gray-400 font-mono">{transaction.id}</span>
        </div>
      </div>
      {/* Amount and Status Badge */}
      <div className="flex flex-col items-center justify-center gap-1 min-w-[80px] sm:min-w-[120px]">
        <span className={`font-bold text-base sm:text-lg ${amountColor}`}>{sign}₦{transaction.amount.toLocaleString()}</span>
        <TransactionStatusBadge status={transaction.status} className="px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-base font-semibold capitalize shadow-sm mt-[0.15rem] sm:mt-[0.25rem]" />
      </div>
    </div>
  );
};

export default WalletTransactionCard; 