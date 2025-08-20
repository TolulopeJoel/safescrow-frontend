import { statusStyles } from "utils";

const OrderStatusBadge = ({ status, className = '' }: { status: string; className?: string }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-800'} ${className}`}>
    {status}
  </span>
);

export default OrderStatusBadge; 