const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-emerald-100 text-emerald-800',
  declined: 'bg-red-100 text-red-800',
  funded: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  disputed: 'bg-orange-100 text-orange-800',
  cancelled: 'bg-gray-100 text-gray-800',
};


const OrderStatusBadge = ({ status, className = '' }: { status: string; className?: string }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-800'} ${className}`}>
    {status}
  </span>
);

export default OrderStatusBadge; 