import React, { useState } from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import { WalletTransactionCard, TransactionDetailsModal, StatsOverview } from 'components/transactions';


export type WalletTransaction = {
  id: string;
  type: 'Funding' | 'Withdrawal' | 'Escrow Release' | 'Fee' | 'Bonus' | 'Refund';
  amount: number;
  direction: 'credit' | 'debit';
  description: string;
  date: string;
  status: string;
};

const FILTERS = ['All', 'Credit', 'Debit'];

const walletTransactions: WalletTransaction[] = [
  {
    id: 'WALLET001',
    type: 'Funding',
    amount: 50000,
    direction: 'credit',
    description: 'Funded wallet via Paystack',
    date: '2025-07-01 03:17',
    status: 'Completed',
  },
  {
    id: 'WALLET002',
    type: 'Withdrawal',
    amount: 20000,
    direction: 'debit',
    description: 'Withdrawal to GTBank (****1234)',
    date: '2025-07-02 22:41',
    status: 'Pending',
  },
  {
    id: 'WALLET003',
    type: 'Escrow Release',
    amount: 15000,
    direction: 'credit',
    description: 'Escrow released from Order #123',
    date: '2025-07-03 05:09',
    status: 'Completed',
  },
  {
    id: 'WALLET004',
    type: 'Fee',
    amount: 500,
    direction: 'debit',
    description: 'Transaction fee for Order #123',
    date: '2025-07-03 13:56',
    status: 'Completed',
  },
  {
    id: 'WALLET005',
    type: 'Bonus',
    amount: 1000,
    direction: 'credit',
    description: 'Referral bonus',
    date: '2025-07-04 00:48',
    status: 'Completed',
  },
  {
    id: 'WALLET006',
    type: 'Refund',
    amount: 3000,
    direction: 'credit',
    description: 'Refund for cancelled order',
    date: '2025-07-05 19:22',
    status: 'Completed',
  },
  {
    id: 'WALLET007',
    type: 'Refund',
    amount: 3000,
    direction: 'credit',
    description: 'Refund for cancelled order',
    date: '2025-07-05 07:33',
    status: 'Completed',
  },
];


const Transactions: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedTransaction, setSelectedTransaction] = useState<WalletTransaction | null>(null);
  const [search, setSearch] = useState('');

  const filteredTransactions = (selectedFilter === 'All'
    ? walletTransactions
    : walletTransactions.filter((txn) =>
        selectedFilter === 'Credit'
          ? txn.direction === 'credit'
          : txn.direction === 'debit'
      )
  ).filter(
    (txn) =>
      txn.description.toLowerCase().includes(search.toLowerCase()) ||
      txn.id.toLowerCase().includes(search.toLowerCase()) ||
      txn.date.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-4 sm:p-8">
          <h1 className="text-2xl font-semibold mb-4 text-gray-900">Wallet Transactions</h1>
          <StatsOverview transactions={walletTransactions} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <div className="flex space-x-8 border-b border-gray-200 flex-1">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  className={`pb-2 text-base font-medium focus:outline-none transition-colors duration-200
                    ${selectedFilter === filter
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 border-b-2 border-transparent hover:text-primary-600'}
                  `}
                  onClick={() => setSelectedFilter(filter)}
                  style={{ background: 'none', boxShadow: 'none' }}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-4 sm:mt-0">
              <input
                type="text"
                placeholder="Search by description, ID, or date"
                className="p-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm w-full sm:w-96 placeholder-gray-400 transition-all duration-200 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div>
            {filteredTransactions.length === 0 ? (
              <div className="text-center text-gray-400 py-12">No transactions found.</div>
            ) : (
              filteredTransactions.map((txn, idx) => (
                <div key={txn.id} className="relative">
                  {idx === 0 && (
                    <span className="absolute -top-3 left-4 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">Recent</span>
                  )}
                  <WalletTransactionCard transaction={txn} onViewDetails={setSelectedTransaction} isLast={idx === filteredTransactions.length - 1} />
                </div>
              ))
            )}
          </div>
          <TransactionDetailsModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
        </main>
      </div>
    </div>
  );
};

export default Transactions; 