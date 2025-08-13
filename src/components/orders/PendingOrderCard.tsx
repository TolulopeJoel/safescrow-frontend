import { useNavigate } from 'react-router-dom';
import { PendingOrderCardProps } from 'types';

const PendingOrderCard: React.FC<PendingOrderCardProps> = ({ itemName, initiatorName, description, price, orderId }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/orders/${orderId}`);
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
                    className="text-sm font-medium text-gray-700 p-2 px-4 rounded hover:bg-primary-100 active:scale-95 transition cursor-pointer select-none"
                    onClick={(e) => e.stopPropagation()} // Prevents card click when button is clicked
                >
                    Accept
                </button>
                <button
                    className="text-sm font-medium text-red-500 p-2 px-4 rounded hover:bg-red-200 active:scale-95 transition cursor-pointer select-none"
                    onClick={(e) => e.stopPropagation()} // Prevents card click when button is clicked
                >
                    Decline
                </button>
            </div>
        </div>
    );
};

export default PendingOrderCard;