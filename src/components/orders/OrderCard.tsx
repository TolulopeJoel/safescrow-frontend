import { ProfileIcon } from '../icons/ExternalIcons';

interface OrderCardProps {
    initiatorName: string;
    description: string;
    price: number;

}

const OrderCard: React.FC<OrderCardProps> = ({ initiatorName, description, price }) => {
    return (
        <div className="bg-[#eceff0] rounded-lg shadow-sm p-6 flex flex-col justify-between min-w-[320px] max-w-xs w-full h-56">
            <div className="flex items-start gap-3 mb-4">
                <div className="p-2 flex items-center justify-center">
                    ⏳
                </div>
                <div>
                    <h3 className="font-semibold text-base text-gray-800 mb-1">From {initiatorName}</h3>
                    <p className="text-sm text-gray-400 mb-1">{description}</p>
                    <p className="text-base font-semibold text-gray-800 mt-2">₦{price.toLocaleString()}</p>
                </div>
            </div>

            <div className="flex justify-between items-center mt-auto pt-4">
                <button className="text-sm font-medium text-gray-700 p-2 px-4 rounded hover:bg-primary-100 active:scale-95 transition cursor-pointer select-none">Accept</button>
                <button className="text-sm font-medium text-red-500 p-2 px-4 rounded hover:bg-red-200 active:scale-95 transition cursor-pointer select-none">Decline</button>
            </div>
        </div>
    );
};

export default OrderCard;