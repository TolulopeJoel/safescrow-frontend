const statusStyles: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  active: 'bg-teal-50 text-teal-700 border border-teal-200',
  cancelled: 'bg-rose-50 text-rose-700 border border-rose-200',
  completed: 'bg-lime-50 text-lime-700 border border-lime-200',
  disputed: 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200',
};


const OrderStatusBadge = ({ status, className = '' }: { status: string; className?: string }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-800'} ${className}`}>
    {status}
  </span>
);

export default OrderStatusBadge; 