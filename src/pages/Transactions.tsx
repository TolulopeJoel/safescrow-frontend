import React, { useEffect, useState } from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import { WalletTransactionCard, StatsOverview } from 'components/transactions';
import { FilterTabs } from 'components/ui';
import { IconTransfer } from '@tabler/icons-react';
import { Transaction } from 'types';
import { trnxAPI } from 'services/api';

const FILTERS = ['All', 'Credit', 'Debit'];

const Transactions: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState<string>('');
  const [allTrnx, setAllTrnx] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchTrnxs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await trnxAPI.allTransactions();
        setAllTrnx(response.data);
      } catch (err: any) {
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrnxs();
  }, []);

  const filteredTransactions = (selectedFilter === 'All'
    ? allTrnx
    : allTrnx.filter((txn) =>
      selectedFilter === 'Credit'
        ? txn.direction === 'credit'
        : txn.direction === 'debit'
    )
  ).filter(
    (txn) =>
      txn.description?.toLowerCase().includes(search.toLowerCase()) ||
      txn.id.toLowerCase().includes(search.toLowerCase()) ||
      txn.created_at.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-4 sm:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <IconTransfer className="w-7 h-7 text-primary-600" />
            <h1 className="text-2xl font-semibold">Wallet Transactions</h1>
          </div>
          <StatsOverview transactions={allTrnx} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <FilterTabs
              filters={FILTERS}
              selected={selectedFilter}
              onSelect={setSelectedFilter}
              className="flex-1"
            />

            <div className="mt-4 sm:mt-0">
              <input
                type="text"
                placeholder="Search by description, ID, or date"
                className="p-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:outline-primary-200 text-sm w-full sm:w-96 placeholder-gray-400 transition-all duration-200 bg-white"
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
                  <WalletTransactionCard transaction={txn} isLast={idx === filteredTransactions.length - 1} />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions; 