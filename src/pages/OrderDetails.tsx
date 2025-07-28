import React, { useState } from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import OrderStatusBadge from 'components/orders/OrderStatusBadge';
import { useParams, useNavigate } from 'react-router-dom';
import { IconDownload, IconUser, IconMail, IconCalendar, IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import { Timeline } from 'components/ui';
import { Order } from 'types';
import { mockOrders, mockTimelineEvents, getOrderById } from 'data';

const OrderDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(id ? getOrderById(id) || mockOrders[0] : mockOrders[0]);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Topbar />
                <div className="flex">
                    <SidebarNav />
                    <main className="flex-1 p-8">
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <p className="text-red-600 mb-4">Order not found</p>
                                <button 
                                    onClick={() => navigate('/orders')}
                                    className="bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800"
                                >
                                    Back to Orders
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    const today = new Date();
    const deliveryDate = new Date(order.deliveryDate);
    const canRaiseDispute = today >= deliveryDate;
    const isPending = order.status === 'pending';

    const handleAcceptOrder = async () => {
        setIsProcessing(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setOrder((prev) => prev ? { ...prev, status: 'accepted' } : null);
        } catch (error) {
            console.error('Error accepting order:', error);
            // toast notification
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeclineOrder = async () => {
        setIsProcessing(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setOrder((prev) => prev ? { ...prev, status: 'declined' } : null);
        } catch (error) {
            console.error('Error declining order:', error);
            // toast notification
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <div className="flex">
                <SidebarNav />
                <main className="flex-1 flex flex-col lg:flex-row gap-8 p-4 sm:p-8 items-start justify-center">
                    {/* Main receipt content */}
                    <div className="w-full bg-white border border-dashed border-gray-300 rounded-xl shadow p-0 overflow-hidden print:shadow-none print:border print:rounded-none">
                        {/* Receipt Header */}
                        <div className="bg-primary-50 border-b border-dashed border-gray-200 px-8 py-6 flex flex justify-between">
                            <h1 className="text-xl font-bold r-widest text-primary-700 mb-1">Order #{order.orderId} </h1>
                            <div><OrderStatusBadge status={order.status} /></div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 px-8 py-3 border-b border-dashed border-gray-200 print:hidden">
                            <button className="flex items-center gap-2 text-primary-700 hover:underline text-sm font-medium">
                                <IconDownload className="w-5 h-5" /> Download PDF
                            </button>
                        </div>

                        {/* Structured Order Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 px-8 py-6 border-b border-dashed border-gray-200">
                            <div>
                                <div className="font-mono text-lg text-primary-700 font-bold">₦{order.total.toLocaleString()}</div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">Note</div>
                                <div className="text-sm text-gray-900">{order.note}</div>
                            </div>
                        </div>

                        {/* Itemized Section */}
                        <div className="px-8 py-6 border-b border-dashed border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm">Item</span>
                                <span className="font-mono text-gray-900 font-medium">{order.item}</span>
                            </div>
                            <div className="text-gray-600 text-sm mb-4">{order.description}</div>
                        </div>

                        {/* Payment Breakdown */}
                        <section className="px-8 py-6 border-b border-dashed border-gray-200">
                            <h2 className="text-lg font-semibold mb-3">Payment Breakdown</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Item/Service</span>
                                    <span className="font-mono">₦{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Escrow Fee</span>
                                    <span className="font-mono">₦800.00</span>
                                </div>
                                <div className="border-t border-dashed my-2"></div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total Paid</span>
                                    <span className="font-mono text-primary-700">₦{(order.total + 800).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>Amount to Seller</span>
                                    <span className="font-mono">₦{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </section>

                        <div className="flex gap-4 justify-end px-8 py-6 bg-gray-50 border-t border-gray-100">
                            {isPending ? (
                                <>
                                    <button
                                        className="bg-green-600 text-white rounded-lg px-6 py-2 font-medium flex items-center gap-2 transition hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleAcceptOrder}
                                        disabled={isProcessing}
                                    >
                                        <IconCheck className="w-5 h-5" />
                                        {isProcessing ? 'Accepting...' : 'Accept'}
                                    </button>
                                    <button
                                        className="bg-red-600 text-white rounded-lg px-6 py-2 font-medium flex items-center gap-2 transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleDeclineOrder}
                                        disabled={isProcessing}
                                    >
                                        <IconX className="w-5 h-5" />
                                        {isProcessing ? 'Declining...' : 'Decline'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    className={`bg-primary-700 text-white rounded-lg px-6 py-2 font-medium flex items-center gap-2 transition ${!canRaiseDispute ? 'opacity-50 cursor-not-allowed hover:bg-primary-700' : 'hover:bg-primary-800'}`}
                                    disabled={!canRaiseDispute}
                                    title={!canRaiseDispute ? 'You can only raise a dispute after the delivery date.' : ''}
                                >
                                    <IconAlertCircle className="w-5 h-5" /> Raise a dispute
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Sidebar (desktop) or stacked (mobile) */}
                    <aside className="w-full lg:w-2/5 flex flex-col gap-6 mt-8 lg:mt-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2"><IconUser className="w-4 h-4" /> Transaction Parties</h3>
                            <div className="mb-4">
                                <div className="text-xs text-gray-400">Buyer</div>
                                <div className="font-medium text-gray-900">{order.buyer.name}</div>
                                <div className="text-gray-500 text-xs flex items-center gap-1"><IconMail className="w-3 h-3" />{order.buyer.email}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Seller</div>
                                <div className="font-medium text-gray-900">{order.seller.name}</div>
                                <div className="text-gray-500 text-xs flex items-center gap-1"><IconMail className="w-3 h-3" />{order.seller.email}</div>
                            </div>
                        </div>
                        {/* Important Dates */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2"><IconCalendar className="w-4 h-4" /> Important Dates</h3>
                            <div className="flex flex-col gap-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Created</span>
                                    <span className="font-mono">{order.createdAt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Last Updated</span>
                                    <span className="font-mono">{order.updatedAt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Due Date</span>
                                    <span className="font-mono">{order.deliveryDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 `}>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Order Status</h3>
                            <Timeline events={mockTimelineEvents} />
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default OrderDetails; 