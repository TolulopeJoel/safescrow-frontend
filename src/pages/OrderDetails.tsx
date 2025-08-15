import React, { useEffect, useState } from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import OrderStatusBadge from 'components/orders/OrderStatusBadge';
import { useParams, useNavigate } from 'react-router-dom';
import { IconDownload, IconUser, IconMail, IconPhoneCall, IconCalendar, IconAlertCircle, IconCheck, IconX, IconLoader, IconArrowRight } from '@tabler/icons-react';
import { Timeline } from 'components/ui';
import { Order } from 'types';
import { mockTimelineEvents } from 'data';
import { useAuth } from 'contexts/AuthContext';
import { escrowAPI } from 'services/api';
import PaystackPop from '@paystack/inline-js';

// Helper components
const PartyInfo: React.FC<{
    name: string;
    contact?: string;
    showLabel?: boolean;
    label: string;
}> = ({ name, contact, showLabel = true, label }) => (
    <div className="group">
        {showLabel && (
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">{label}</div>
        )}
        <div className="text-slate-800 font-medium mb-1">{name}</div>
        {contact && (
            <div className="text-slate-500 text-sm flex items-center gap-2 flex-wrap group-hover:text-slate-600 transition-colors break-all">
                {contact.includes("@") ? (
                    <><IconMail className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{contact}</span></>
                ) : (
                    <><IconPhoneCall className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{contact}</span></>
                )}
            </div>
        )}
    </div>
);

const ActionButton: React.FC<{
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant: 'accept' | 'decline' | 'dispute';
    title?: string;
    children: React.ReactNode;
}> = ({ onClick, disabled, loading, variant, title, children }) => {
    const baseClasses = "relative overflow-hidden rounded-md px-6 py-3 font-medium flex items-center gap-2.5 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]";

    const variantClasses = {
        accept: "bg-gradient-to-r from-emerald-700 to-emerald-800 text-white",
        decline: "bg-gradient-to-r from-red-700 to-red-800 text-white",
        dispute: "bg-gradient-to-r from-slate-800 to-slate-900 text-white"
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]}`}
            onClick={onClick}
            disabled={disabled || loading}
            title={title}
        >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            {loading && <IconLoader className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
};

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
            <div className="relative mb-8">
                <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-slate-600 font-medium">Loading order details...</p>
        </div>
    </div>
);

const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <IconAlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">Something went wrong</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">{error}</p>
            <div className="flex gap-3 justify-center">
                <button
                    onClick={onRetry}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                    Try Again
                </button>
                <button
                    onClick={() => window.history.back()}
                    className="bg-slate-100 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                >
                    Go Back
                </button>
            </div>
        </div>
    </div>
);

const OrderDetails: React.FC = () => {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    // State management
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState<Order | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orderAccepted, setOrderAccpted] = useState<boolean>(false);

    const loadOrder = async () => {
        if (!id) {
            setError('No order ID provided');
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await escrowAPI.getById(id);
            setOrder(response.data);
        } catch (err: any) {
            console.error('Error fetching order:', err);
            if (err?.response?.status === 404) {
                setError('Escrow not found');
            } else {
                setError(err?.response?.data?.detail || 'Failed to load order details');
            }
            setOrder(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadOrder();
    }, [id]);

    // Helper functions
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleAccept = async () => {
        try {
            const response = await escrowAPI.acceptEscrow(order?.public_id || "latest");
            if (response.data && response.data.access_code) {
                const popup = new PaystackPop();
                popup.resumeTransaction(response.data.access_code,
                    {
                        onSuccess: () => {
                            setOrderAccpted(true);
                        }
                    }
                );
            } else {
                setOrderAccpted(true);
            }
        } catch (err: any) {
            console.error('Error creating order:', err);
            // setErrors({ ...errors, api: err?.response?.data?.detail || 'An error occurred while creating the order.' });
        }
    };

    const handleOrderAction = async (action: 'accepted' | 'declined') => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        setIsProcessing(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setOrder((prev) => prev ? { ...prev, status: action } : null);
        } catch (error) {
            console.error(`Error ${action} order:`, error);
        } finally {
            setIsProcessing(false);
        }
    };

    const getPartyInfo = (role: 'buyer' | 'seller') => {
        const isInitiator = order?.initiator_role === role;
        const shouldShowLabel = !isAuthenticated && order?.initiator_role !== role || isAuthenticated;

        if (isInitiator) {
            return {
                name: order?.initiator?.full_name || '',
                contact: shouldShowLabel ? order?.initiator?.email : '',
                showLabel: shouldShowLabel
            };
        } else {
            return {
                name: order?.receiver?.full_name || order?.receiver_email || '',
                contact: order?.receiver?.email || order?.receiver_phone,
                showLabel: shouldShowLabel
            };
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
                <Topbar />
                <div className="flex">
                    <SidebarNav />
                    <main className="flex-1 p-8">
                        <LoadingSpinner />
                    </main>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !order) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
                <Topbar />
                <div className="flex">
                    <SidebarNav />
                    <main className="flex-1 p-8">
                        <ErrorState error={error || 'Escrow not found'} onRetry={loadOrder} />
                    </main>
                </div>
            </div>
        );
    }

    const today = new Date();
    const deliveryDate = new Date(order.expected_delivery_date);
    const canRaiseDispute = today >= deliveryDate;
    const isPending = order.status === 'pending';

    const buyerInfo = getPartyInfo('buyer');
    const sellerInfo = getPartyInfo('seller');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
            <Topbar />
            <div className="flex">
                <SidebarNav />
                <main className="flex-1 px-0 py-8 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header with breadcrumb-like navigation */}
                        <div className="flex flex-wrap items-center gap-3 mb-8 text-sm">
                            <span className="text-slate-400 truncate">Orders</span>
                            <IconArrowRight className="w-4 h-4 text-slate-300" />
                            <span className="text-slate-600 font-medium break-all">#{order.public_id}</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Main content - 8 columns on desktop */}
                            <div className="lg:col-span-8">
                                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl overflow-hidden">
                                    {/* Hero section with order amount */}
                                    <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
                                        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width={60} height={60}viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div> */}
                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Escrow #{order.public_id}</h1>
                                                    <div className="text-primary-100 text-sm">Transaction Details</div>
                                                </div>
                                                <OrderStatusBadge status={order.status} />
                                            </div>

                                            <div className="text-center py-6">
                                                <div className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">
                                                    ₦{Number(order?.item_price || 0).toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })}
                                                </div>
                                                <div className="text-primary-200 font-medium">Total Transaction Amount</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick actions */}
                                    <div className="flex justify-end p-6 border-b border-slate-100">
                                        <button className="flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium transition-colors group">
                                            <IconDownload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            Download Receipt
                                        </button>
                                    </div>

                                    {/* Item details card */}
                                    <div className="p-6 border-b border-slate-100">
                                        <div className="bg-slate-50 rounded-lg p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-2">Item</div>
                                                    <h3 className="text-xl font-semibold text-slate-800">{order.item_name}</h3>
                                                </div>
                                            </div>
                                            {order.description && (
                                                <p className="text-slate-600 leading-relaxed">{order.description}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Financial breakdown - more visual */}
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-slate-800 mb-6">Payment Breakdown</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                                    <span className="font-medium text-slate-700">Item/Service</span>
                                                </div>
                                                <span className="font-semibold text-slate-800 text-lg">
                                                    ₦{Number(order?.item_price || 0).toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                                    <span className="font-medium text-slate-700">Escrow Fee</span>
                                                </div>
                                                <span className="font-semibold text-slate-800 text-lg">
                                                    ₦{Number(order?.fee_amount || 0).toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })}
                                                </span>
                                            </div>

                                            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6"></div>

                                            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg">
                                                <span className="font-semibold text-slate-800">Total Paid</span>
                                                <span className="font-bold text-primary-700 text-xl">
                                                    ₦{(Number(order?.item_price || 0) + Number(order?.fee_amount || 0))
                                                        .toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                                                <span className="font-semibold text-slate-800">Amount to Seller</span>
                                                <span className="font-bold text-emerald-700 text-xl">
                                                    ₦{(Number(order?.item_price || 0) - Number(order?.fee_amount || 0))
                                                        .toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action buttons with better styling */}
                                    <div className="p-6 bg-slate-50 border-t border-slate-100">
                                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                            {isPending ? (
                                                <>
                                                    <ActionButton
                                                        variant="accept"
                                                        onClick={handleAccept}
                                                        loading={isProcessing}
                                                    >
                                                        <IconCheck className="w-4 h-4" />
                                                        {isProcessing ? 'Processing...' : 'Accept Order'}
                                                    </ActionButton>
                                                    <ActionButton
                                                        variant="decline"
                                                        onClick={() => handleOrderAction('declined')}
                                                        loading={isProcessing}
                                                    >
                                                        <IconX className="w-4 h-4" />
                                                        {isProcessing ? 'Processing...' : 'Decline Order'}
                                                    </ActionButton>
                                                </>
                                            ) : (
                                                <ActionButton
                                                    variant="dispute"
                                                    disabled={!canRaiseDispute}
                                                    title={!canRaiseDispute ? 'Disputes can only be raised after the delivery date.' : ''}
                                                    onClick={() => { }}
                                                >
                                                    <IconAlertCircle className="w-4 h-4" />
                                                    Raise Dispute
                                                </ActionButton>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar - 4 columns on desktop */}
                            <div className="lg:col-span-4 space-y-6">
                                {/* Transaction parties with better visual hierarchy */}
                                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 sm:rounded-2xl p-6 ">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <IconUser className="w-4 h-4 text-primary-600" />
                                        </div>
                                        Parties
                                    </h3>
                                    <div className="space-y-6">
                                        <PartyInfo
                                            label="Buyer"
                                            name={buyerInfo.name}
                                            contact={buyerInfo.contact}
                                            showLabel={buyerInfo.showLabel}
                                        />
                                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                                        <PartyInfo
                                            label="Seller"
                                            name={sellerInfo.name}
                                            contact={sellerInfo.contact}
                                            showLabel={sellerInfo.showLabel}
                                        />
                                    </div>
                                </div>

                                {/* Timeline with more visual appeal */}
                                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 sm:rounded-2xl p-6 shadow-sm shadow-slate-900/5">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <IconCalendar className="w-4 h-4 text-primary-600" />
                                        </div>
                                        Timeline
                                    </h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-slate-600 font-medium">Due Date</span>
                                            <span className="text-slate-800 font-semibold">{formatDate(order.expected_delivery_date)}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-slate-600 font-medium">Created</span>
                                            <span className="text-slate-800 font-semibold">{formatDateTime(order.created_at)}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-slate-600 font-medium">Updated</span>
                                            <span className="text-slate-800 font-semibold">{formatDateTime(order.updated_at)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order status */}
                                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 sm:rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Order Status</h3>
                                    {isAuthenticated ? (
                                        <Timeline events={mockTimelineEvents} />
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <IconUser className="w-8 h-8 text-primary-500" />
                                            </div>
                                            <p className="text-slate-600 mb-6 leading-relaxed">
                                                Sign in to view detailed order progress and timeline
                                            </p>
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 font-medium transition-all duration-300 transform hover:scale-105"
                                            >
                                                Sign In to Continue
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default OrderDetails;