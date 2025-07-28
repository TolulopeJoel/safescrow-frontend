import React from 'react';
import { Transaction } from 'types';

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ transaction, onClose }) => {
  if (!transaction) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">&times;</button>
        <h2 className="text-lg font-bold mb-4">Transaction Details</h2>
        <div className="space-y-2">
          <div><span className="font-semibold">Transaction ID:</span> {transaction.id}</div>
          <div><span className="font-semibold">Date/Time:</span> {transaction.date}</div>
          <div><span className="font-semibold">Counterpart:</span> {transaction.counterpart} ({transaction.type})</div>
          <div><span className="font-semibold">Amount:</span> ₦{transaction.amount.toLocaleString()}</div>
          <div><span className="font-semibold">Status:</span> {transaction.status}</div>
        </div>
        <div className="mt-6 text-right">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal; 