import React from 'react';
import { WalletTransaction } from 'pages/Transactions';
import { IconArrowDownLeft, IconArrowUpRight } from '@tabler/icons-react';

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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <div className="bg-primary-50 rounded-xl border border-primary-100 shadow-sm p-7 flex items-center min-h-[140px]">
        <IconArrowDownLeft className="w-7 h-7 text-primary-400 mr-3" />
        <div>
          <div className="text-xs text-gray-400">Credited this month</div>
          <div className="font-bold text-lg text-primary-600">₦{totalCredited.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl border border-blue-100 shadow-sm p-7 flex items-center min-h-[140px]">
        <IconArrowUpRight className="w-7 h-7 text-blue-400 mr-3" />
        <div>
          <div className="text-xs text-gray-400">Debited this month</div>
          <div className="font-bold text-lg text-blue-600">₦{totalDebited.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-primary-50 rounded-xl border border-primary-100 shadow-sm p-7 flex items-center min-h-[140px]">
        <div className="w-7 h-7 p-4 rounded-md flex items-center justify-center mr-3 font-bold text-2xl text-gray-600">{count}</div>
        <div>
          <div className="text-xs text-gray-400">Transactions</div>
          <div className="font-bold text-lg text-gray-600">This month</div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview; 