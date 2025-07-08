import React from 'react';
import SidebarNav from '../components/dashboard/SidebarNav';
import Topbar from '../components/dashboard/Topbar';
import OrderSummaryCards from '../components/orders/OrderSummaryCards';
import OrdersTable from '../components/orders/OrdersTable';
import OrderOverviewChart from '../components/orders/OrderOverviewChart';
// import OrderStatusBadge from '../components/orders/OrderStatusBadge';

const dummyOrders = [
  { id: '1', user: 'Aubrey', orderId: '453796', refCode: '453796', total: 40300, status: 'Pending' },
  { id: '2', user: 'Debra', orderId: '453796', refCode: '453796', total: 40000, status: 'In progress' },
  { id: '3', user: 'Ronald', orderId: '453796', refCode: '453796', total: 40000, status: 'Pending' },
];

const Orders: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Topbar />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-semibold mb-6">Orders</h1>
          <OrderSummaryCards />
          {/* Chart placeholder */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-lg">Order overview</span>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Month</option>
              </select>
            </div>
            <div className="h-40 flex items-center justify-center">
              <OrderOverviewChart />
            </div>
          </div>
          {/* Tabs and search */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-6 border-b w-full max-w-xl">
              <button className="border-b-2 border-primary-600 text-primary-600 px-2 pb-2 font-medium">All (40)</button>
              <button className="text-gray-500 px-2 pb-2">Active (10)</button>
              <button className="text-gray-500 px-2 pb-2">Pending (5)</button>
              <button className="text-gray-500 px-2 pb-2">Completed (30)</button>
            </div>
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Search" className="border rounded px-3 py-1 text-sm" />
              <button className="border px-3 py-1 rounded text-sm">=</button>
            </div>
          </div>
          <OrdersTable orders={dummyOrders} />
        </main>
      </div>
    </div>
  );
};

export default Orders; 