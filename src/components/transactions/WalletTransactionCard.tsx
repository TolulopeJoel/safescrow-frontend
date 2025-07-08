import React from 'react';
import TransactionStatusBadge from './TransactionStatusBadge';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline';

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
}

const typeIcon = {
  Funding: ArrowDownCircleIcon,
  Withdrawal: ArrowUpCircleIcon,
  'Escrow Release': BanknotesIcon,
  Fee: ArrowUpCircleIcon,
  Bonus: ArrowDownCircleIcon,
  Refund: ArrowDownCircleIcon,
};

const WalletTransactionCard: React.FC<WalletTransactionCardProps> = ({ transaction, onViewDetails }) => {
  const Icon = typeIcon[transaction.type] || BanknotesIcon;
  const amountColor = transaction.direction === 'credit' ? 'text-green-600' : 'text-red-600';
  const sign = transaction.direction === 'credit' ? '+' : '-';

  return (
    <div className="flex items-center bg-white rounded-xl shadow p-5 mb-4 gap-4">
      <div className="flex-shrink-0">
        <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50`}>
          <Icon className="w-7 h-7 text-blue-500" />
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg capitalize">{transaction.type}</span>
          <span className={`font-bold text-xl ${amountColor}`}>{sign}₦{transaction.amount.toLocaleString()}</span>
        </div>
        <div className="text-gray-500 text-sm mt-1">{transaction.description}</div>
        <div className="flex items-center mt-2 space-x-3">
          <span className="text-xs text-gray-400">{transaction.date}</span>
          <TransactionStatusBadge status={transaction.status} />
          <span className="text-xs text-gray-300 ml-auto font-mono">{transaction.id}</span>
        </div>
      </div>
      <div className="ml-4">
        <button
          onClick={() => onViewDetails(transaction)}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default WalletTransactionCard; 