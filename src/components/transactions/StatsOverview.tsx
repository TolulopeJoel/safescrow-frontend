import React from 'react';
import { WalletTransaction } from '../../pages/Transactions';
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline';

interface StatsOverviewProps {
  transactions: WalletTransaction[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ transactions }) => {
  const now = new Date();
  const thisMonth = transactions.filter(txn => {
    const txnDate = new Date(txn.date);
    return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
  });
  const totalCredited = thisMonth.filter(txn => txn.direction === 'credit').reduce((sum, txn) => sum + txn.amount, 0);
  const totalDebited = thisMonth.filter(txn => txn.direction === 'debit').reduce((sum, txn) => sum + txn.amount, 0);
  const count = thisMonth.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow p-4 flex items-center">
        <ArrowDownCircleIcon className="w-7 h-7 text-green-500 mr-3" />
        <div>
          <div className="text-xs text-gray-400">Credited this month</div>
          <div className="font-bold text-lg text-green-600">₦{totalCredited.toLocaleString()}</div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex items-center">
        <ArrowUpCircleIcon className="w-7 h-7 text-red-500 mr-3" />
        <div>
          <div className="text-xs text-gray-400">Debited this month</div>
          <div className="font-bold text-lg text-red-600">₦{totalDebited.toLocaleString()}</div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex items-center">
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mr-3 font-bold text-blue-600">{count}</div>
        <div>
          <div className="text-xs text-gray-400">Transactions</div>
          <div className="font-bold text-lg text-blue-600">This month</div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview; 