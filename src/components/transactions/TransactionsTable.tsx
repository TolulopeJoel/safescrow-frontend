import React from 'react';
import TransactionStatusBadge from './TransactionStatusBadge';

interface Transaction {
  id: string;
  date: string;
  counterpart: string;
  type: string;
  amount: number;
  status: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onViewDetails: (txn: Transaction) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onViewDetails }) => (
  <div className="overflow-x-auto rounded-lg shadow bg-white">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counterpart</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {transactions.map((txn) => (
          <tr key={txn.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{txn.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{txn.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{txn.counterpart} <span className="text-xs text-gray-400">({txn.type})</span></td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">₦{txn.amount.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap"><TransactionStatusBadge status={txn.status} /></td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => onViewDetails(txn)} className="text-blue-600 hover:underline text-sm font-medium">View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TransactionsTable; 