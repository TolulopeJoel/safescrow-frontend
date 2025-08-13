import React, { useEffect, useState } from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import { DashboardCards, ActionButtons, GetStartedSteps } from 'components/dashboard';
import { PendingOrderCard } from 'components/orders';
import { useAuth } from 'contexts/AuthContext';
import { escrowAPI } from 'services/api';
import { Order } from 'types';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [pendingOrders, setPendingOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (!user) return;

        const fetchPendingOrders = async () => {
            try {
                const response = await escrowAPI.getPending()
                console.log(response.data);
                setPendingOrders(response.data);
            } catch (err: any) {
                console.error('Error fetching pending orders:', err);
            } finally {
                // setLoading(false);
            }
        };

        fetchPendingOrders();
    }, [user]);

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
                                <a href="/orders" className="text-sm font-medium text-orange-500 p-2 px-4 rounded hover:bg-orange-100 active:scale-95 transition cursor-pointer select-none">View all</a>
                            )}
                        </div>

                        <div className="flex gap-6">
                            {pendingOrders.map((order) => (
                                <PendingOrderCard key={order.public_id} orderId={order.public_id} itemName={order.item_name} initiatorName={order.initiator?.full_name || order.initiator?.email || "Somebody"} description={order.description} price={order.item_price} />
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