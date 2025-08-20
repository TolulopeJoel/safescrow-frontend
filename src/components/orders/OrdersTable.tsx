import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import { Order } from 'types';
import { useNavigate } from "react-router-dom";


const OrdersTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Escrow ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">status</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.public_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{order.public_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{order.receiver?.full_name || order.receiver_email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{order.item_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">₦{parseFloat(order.item_price).toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="px-6 py-4 whitespace-nowrap"><OrderStatusBadge status={order.status} /></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => navigate(`/orders/${order.public_id}`)}
                  className="w-full bg-gray-100 text-primary-700 text-sm font-medium py-2 rounded active:scale-95 transition focus:outline-primary-200 focus:ring-2 focus:ring-primary-400 focus:bg-primary-50 cursor-pointer select-none"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default OrdersTable; 