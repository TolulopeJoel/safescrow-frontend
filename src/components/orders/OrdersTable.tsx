import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import { Order } from 'types';

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => (
  <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref. code</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order status</th>
          <th className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{order.buyer.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{order.orderId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{order.refCode}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">₦{order.total.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap"><OrderStatusBadge status={order.status} /></td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrdersTable; 