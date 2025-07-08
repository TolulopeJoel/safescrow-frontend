import React from 'react';

const statusStyles: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const TransactionStatusBadge = ({ status, className = '' }: { status: string; className?: string }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-800'} ${className}`}>
    {status}
  </span>
);

export default TransactionStatusBadge; 