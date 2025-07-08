import React from 'react';
import TransactionStatusBadge from './TransactionStatusBadge';
import { IconArrowDownLeft, IconArrowUpRight, IconCurrencyNaira } from '@tabler/icons-react';
import { BanknotesIcon } from '@heroicons/react/24/outline';

interface WalletTransaction {
  id: string;
  type: 'Funding' | 'Withdrawal' | 'Escrow Release' | 'Fee' | 'Bonus' | 'Refund';
  amount: number;
  direction: 'credit' | 'debit';
  description: string;
  date: string;
  status: string;
}

interface WalletTransactionCardProps {
  transaction: WalletTransaction;
  onViewDetails: (txn: WalletTransaction) => void;
  isLast?: boolean;
}

const typeIcon = {
  Funding: IconArrowDownLeft,
  Withdrawal: IconArrowUpRight,
  'Escrow Release': BanknotesIcon,
  Fee: IconArrowUpRight,
  Bonus: IconArrowDownLeft,
  Refund: IconArrowDownLeft,
};

const WalletTransactionCard: React.FC<WalletTransactionCardProps> = ({ transaction, onViewDetails, isLast }) => {
  const Icon = typeIcon[transaction.type] || IconCurrencyNaira;
  const isCredit = transaction.direction === 'credit';
  const amountColor = isCredit ? 'text-green-600' : 'text-red-600';
  const sign = isCredit ? '+' : '-';

  return (
    <div className={`grid grid-cols-[auto_1fr_auto] items-center px-6 py-6 ${!isLast && 'border-b border-gray-300'} gap-6`}> 
      {/* Icon */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${isCredit ? 'bg-green-50' : 'bg-red-50'}`}> 
          <Icon className={`w-7 h-7 ${isCredit ? 'text-green-600' : 'text-red-600'}`} />
        </span>
      </div>
      {/* Main content */}
      <div className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
          <span className="font-semibold text-lg capitalize text-gray-900 block">{transaction.type}</span>
          <span className={`font-bold text-2xl ${amountColor} block sm:hidden`}>{sign}₦{transaction.amount.toLocaleString()}</span>
        </div>
        <div className="text-gray-700 text-base mb-2">{transaction.description}</div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-500">{transaction.date}</span>
          <span className="text-gray-400 font-mono">{transaction.id}</span>
        </div>
      </div>
      {/* Amount and Status Badge */}
      <div className="flex flex-col items-center justify-center gap-1 min-w-[120px]">
        <span className={`font-bold text-lg ${amountColor}`}>{sign}₦{transaction.amount.toLocaleString()}</span>
        <TransactionStatusBadge status={transaction.status} className="px-6 py-2 rounded-full text-base font-semibold capitalize shadow-sm mt-[-0.5rem]" />
      </div>
    </div>
  );
};

export default WalletTransactionCard; 