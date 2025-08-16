import { useNavigate } from 'react-router-dom';
import { PendingOrderCardProps } from 'types';
import { useState } from 'react';
import { escrowAPI } from 'services/api';
import PaystackPop from '@paystack/inline-js';

const PendingOrderCard: React.FC<PendingOrderCardProps> = ({
    itemName,
    initiatorName,
    description,
    price,
    orderId,
    onStatusChange // optional prop to notify parent
}) => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState<'accept' | 'decline' | null>(null);

    const handleCardClick = () => {
        navigate(`/orders/${orderId}`);
    };

    const handleAccept = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            setIsProcessing('accept');
            const response = await escrowAPI.accept(orderId);

            if (response.data && response.data.access_code) {
                const popup = new PaystackPop();
                popup.resumeTransaction(response.data.access_code, {
                    onSuccess: () => {
                        onStatusChange?.(orderId, 'active');
                    },
                    onCancel: () => {
                        console.log('Payment cancelled');
                    }
                });
            } else {
                onStatusChange?.(orderId, 'active');
            }
        } catch (err: any) {
            console.error('Error accepting order:', err);
        } finally {
            setIsProcessing(null);
        }
    };

    const handleDecline = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            setIsProcessing('decline');
            await escrowAPI.decline(orderId);
            onStatusChange?.(orderId, 'cancelled');
        } finally {
            setIsProcessing(null);
        }
    };

    return (
        <div
            className="bg-[#eceff0] rounded-lg shadow-sm p-6 flex flex-col justify-between min-w-[320px] max-w-xs w-full h-56 cursor-pointer hover:shadow-xs hover:scale-[0.98] active:scale-95 transition-all duration-150"
            onClick={handleCardClick}
        >
            <div className="flex items-start gap-3 mb-4">
                <div className="p-2 flex items-center justify-center">
                    ⏳
                </div>
                <div>
                    <h3 className="font-semibold text-base text-gray-800 mb-1">{itemName}</h3>
                    <p className="text-sm text-gray-500 mb-1">From {initiatorName}</p>
                    <p className="text-sm text-gray-400 mb-1 line-clamp-2">{description}</p>
                    <p className="text-base font-semibold text-gray-800 mt-2">₦{Number(price || 0).toLocaleString()}</p>
                </div>
            </div>

            <div className="flex justify-between items-center mt-auto pt-4">
                <button
                    className="text-sm font-medium text-gray-700 p-2 px-4 rounded hover:bg-primary-100 active:scale-95 transition cursor-pointer select-none disabled:opacity-50"
                    onClick={handleAccept}
                    disabled={isProcessing === 'accept'}
                >
                    {isProcessing === 'accept' ? 'Accepting...' : 'Accept'}
                </button>
                <button
                    className="text-sm font-medium text-red-500 p-2 px-4 rounded hover:bg-red-200 active:scale-95 transition cursor-pointer select-none disabled:opacity-50"
                    onClick={handleDecline}
                    disabled={isProcessing === 'decline'}
                >
                    {isProcessing === 'decline' ? 'Declining...' : 'Decline'}
                </button>
            </div>
        </div>
    );
};

export default PendingOrderCard;
