import React from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import { DashboardCards, ActionButtons, GetStartedSteps } from 'components/dashboard';
import { PendingOrderCard } from 'components/orders';
import { pendingOrders } from 'data';
import { useAuth } from 'contexts/AuthContext';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <div className="flex">
                <SidebarNav />
                <main className="flex-1 p-4 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold">Welcome, {user && user.full_name.split(' ')[0]}</h1>
                        <div className="flex items-center">
                            <ActionButtons />
                        </div>
                    </div>
                    {user && <DashboardCards profile={user} />}
                    {/* Pending escrow transacions section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Pending Escrows</h2>
                            {pendingOrders.length > 1 && (
                                <a href="#" className="text-sm font-medium text-orange-500 p-2 px-4 rounded hover:bg-orange-100 active:scale-95 transition cursor-pointer select-none">View all</a>
                            )}
                        </div>

                        <div className="flex gap-6">
                            {pendingOrders.map((order) => (
                                <PendingOrderCard key={order.orderId} orderId={order.orderId} initiatorName={order.initiatorName} description={order.description} price={order.price} />
                            ))}
                        </div>
                    </div>
                    <GetStartedSteps />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;