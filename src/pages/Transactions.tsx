import React, { useState } from 'react';
import WalletTransactionCard from '../components/transactions/WalletTransactionCard';
import TransactionDetailsModal from '../components/transactions/TransactionDetailsModal';
import StatsOverview from '../components/transactions/StatsOverview';
import SidebarNav from '../components/dashboard/SidebarNav';
import Topbar from '../components/dashboard/Topbar';

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
    date: '2024-06-01 09:30',
    status: 'Completed',
  },
  {
    id: 'WALLET002',
    type: 'Withdrawal',
    amount: 20000,
    direction: 'debit',
    description: 'Withdrawal to GTBank (****1234)',
    date: '2024-06-02 14:10',
    status: 'Pending',
  },
  {
    id: 'WALLET003',
    type: 'Escrow Release',
    amount: 15000,
    direction: 'credit',
    description: 'Escrow released from Order #123',
    date: '2024-06-03 11:45',
    status: 'Completed',
  },
  {
    id: 'WALLET004',
    type: 'Fee',
    amount: 500,
    direction: 'debit',
    description: 'Transaction fee for Order #123',
    date: '2024-06-03 11:45',
    status: 'Completed',
  },
  {
    id: 'WALLET005',
    type: 'Bonus',
    amount: 1000,
    direction: 'credit',
    description: 'Referral bonus',
    date: '2024-06-04 08:00',
    status: 'Completed',
  },
  {
    id: 'WALLET006',
    type: 'Refund',
    amount: 3000,
    direction: 'credit',
    description: 'Refund for cancelled order',
    date: '2024-06-05 16:20',
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Topbar />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-semibold mb-4 text-gray-900">Wallet Transactions</h1>
          <StatsOverview transactions={walletTransactions} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <div className="flex space-x-2 mb-2 sm:mb-0">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    selectedFilter === filter
                      ? 'bg-blue-600 text-white border-blue-600 shadow'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search by description, ID, or date"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm w-full sm:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
                  <WalletTransactionCard transaction={txn} onViewDetails={setSelectedTransaction} />
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