import React from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import { OrderSummaryCards, OrdersTable, OrderOverviewChart } from 'components/orders';
import { FilterTabs } from 'components/ui';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { mockOrders } from 'data'


const Orders: React.FC = () => {
  const ORDER_FILTERS = ['All', `Active (${10})`, `Pending (${5})`, `Completed (${30})`];
  const [selectedFilter, setSelectedFilter] = React.useState('All');

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-4 sm:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <DocumentTextIcon className="w-7 h-7 text-primary-600" />
            <h1 className="text-2xl font-semibold">Orders</h1>
          </div>
          <OrderSummaryCards />
          {/* Chart placeholder */}
          <div className="bg-white rounded-lg p-1 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-lg p-4">Order overview</span>
            </div>
            <div className="flex items-center justify-center">
              <OrderOverviewChart />
            </div>
          </div>
          {/* Tabs and search */}
          <div className="flex items-center justify-between mb-4">
            <FilterTabs
              filters={ORDER_FILTERS}
              selected={selectedFilter}
              onSelect={setSelectedFilter}
              className="max-w-xl w-full"
            />
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Search" className="border rounded px-3 py-1 text-sm" />
              <button className="border px-3 py-1 rounded text-sm">=</button>
            </div>
          </div>
          <OrdersTable orders={mockOrders} />
        </main>
      </div>
    </div>
  );
};

export default Orders; 