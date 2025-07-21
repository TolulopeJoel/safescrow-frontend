import React from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import OrderStatusBadge from 'components/orders/OrderStatusBadge';
import { useParams } from 'react-router-dom';
import { IconDownload, IconUser, IconMail, IconCalendar, IconAlertCircle } from '@tabler/icons-react';
import { Timeline } from 'components/ui';

// Dummy order data
const dummyOrder = {
    id: '1',
    orderId: '453796',
    refCode: '453796',
    status: 'Pending',
    total: 40300,
    buyer: { name: 'Aubrey', email: 'aubrey@email.com' },
    seller: { name: 'Debra', email: 'debra@email.com' },
    item: 'iPhone 16',
    description: 'Brand new iPhone 16, 256GB, Space Black',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    deliveryDate: '2025-08-10',
    note: '2 years manufacturer warranty',
};

// Timeline with icons
const timeline = [
    { date: '2024-06-01', label: 'Order pending', desc: 'Order is waiting to be accepted by the buyer' },
    { date: '2024-06-01', label: 'Order accepted', desc: 'Order has been accepted by the buyer' },
    { date: '2024-06-01', label: 'Payment in escrow', desc: 'Buyer has transferred amount to escrow and is awaiting delivery' },
    { date: '', label: 'Delivery confirmed', desc: 'Delivery has been confirmed by the buyer', current: true },
    { date: '', label: 'Product accepted', desc: 'Delivery has been accepted by the buyer' },
    { date: '', label: 'Release of funds', desc: 'Funds has been successfully transferred to your escrow wallet' }
];


const OrderDetails: React.FC = () => {
    const { id } = useParams();
    const order = dummyOrder;

    const today = new Date();
    const deliveryDate = new Date(order.deliveryDate);
    const canRaiseDispute = today >= deliveryDate;

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <div className="flex">
                <SidebarNav />
                <main className="flex-1 flex flex-col lg:flex-row gap-8 p-4 sm:p-8 items-start justify-center">
                    {/* Main receipt content */}
                    <div className="w-full bg-white border border-dashed border-gray-300 rounded-xl shadow p-0 overflow-hidden print:shadow-none print:border print:rounded-none">
                        {/* Receipt Header */}
                        <div className="bg-primary-50 border-b border-dashed border-gray-200 px-8 py-6 flex flex-col items-center">
                            <h1 className="text-xl font-bold tracking-widest text-primary-700 mb-1">ORDER RECEIPT</h1>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-base text-gray-700">#{order.orderId}</span>
                                <OrderStatusBadge status={order.status} />
                            </div>
                            <span className="text-xs text-gray-400">Ref: <span className="font-mono">{order.refCode}</span></span>
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
                                {/* <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="font-mono">₦3,000.00</span>
                                </div> */}
                                <div className="flex justify-between">
                                    <span>Escrow Fee</span>
                                    <span className="font-mono">₦800.00</span>
                                </div>
                                <div className="border-t border-dashed my-2"></div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total Paid</span>
                                    <span className="font-mono text-primary-700">₦{(order.total + 0 + 800).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>Amount to Seller</span>
                                    <span className="font-mono">₦{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </section>

                        <div className="flex gap-4 justify-end px-8 py-6 bg-gray-50 border-t border-gray-100">
                            <button
                                className={`bg-primary-700 text-white rounded-lg px-6 py-2 font-medium flex items-center gap-2 transition ${!canRaiseDispute ? 'opacity-50 cursor-not-allowed hover:bg-primary-700' : 'hover:bg-primary-800'}`}
                                disabled={!canRaiseDispute}
                                title={!canRaiseDispute ? 'You can only raise a dispute after the delivery date.' : ''}
                            >
                                <IconAlertCircle className="w-5 h-5" /> Raise a dispute
                            </button>
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
                            <Timeline events={timeline} />
                        </div>

                    </aside>
                </main>
            </div>
        </div>
    );
};

export default OrderDetails; 