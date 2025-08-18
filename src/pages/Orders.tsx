import React, { useState, useEffect } from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import { OrderSummaryCards, OrdersTable, OrderOverviewChart } from 'components/orders';
import { FilterTabs } from 'components/ui';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { escrowAPI } from 'services/api';
import { Order } from 'types';


interface OrdersData {
  active: Order[];
  cancelled: Order[];
  completed: Order[];
  pending: Order[];
}

const Orders: React.FC = () => {
  const ORDER_FILTERS = ['All', 'Pending', 'Active', 'Completed', 'Cancelled'];
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [ordersData, setOrdersData] = useState<OrdersData>({
    active: [],
    cancelled: [],
    completed: [],
    pending: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders data on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await escrowAPI.getAll();
        setOrdersData(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = selectedFilter === 'All'
    ? [...ordersData.pending, ...ordersData.active, ...ordersData.completed, ...ordersData.cancelled]
    : ordersData[selectedFilter.toLowerCase() as keyof OrdersData] || [];

  const summaryCards = [
    // { title: 'Total orders', value: ordersData.active.length + ordersData.pending.length + ordersData.completed.length + ordersData.cancelled.length },
    { title: 'Active orders', value: ordersData.active.length },
    { title: 'Pending orders', value: ordersData.pending.length },
    { title: 'Completed orders', value: ordersData.completed.length },
    { title: 'Cancelled orders', value: ordersData.cancelled.length },
  ];


  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Topbar />
        <div className="flex">
          <SidebarNav />
          <main className="flex-1 p-4 sm:p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading orders...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Topbar />
        <div className="flex">
          <SidebarNav />
          <main className="flex-1 p-4 sm:p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
          <OrderSummaryCards cards={summaryCards} />
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
          <OrdersTable orders={filteredOrders} />
          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No {selectedFilter.toLocaleLowerCase()} orders found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Orders;