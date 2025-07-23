import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FormInput, FormTextarea, ImageDropzone, ProgressBar } from 'components/ui';
import { CalendarIcon, TruckIcon } from 'components/icons/ExternalIcons';

const quickAmounts = [5060, 10000, 15213, 20000, 49780];

const roleLabels = {
    seller: {
        orderDetails: 'What are you selling?',
        orderDetailsPlaceholder: 'e.g. iPhone 16, custom furniture',
        description: 'Delivery note',
        descriptionPlaceholder: 'Clearly describe what the buyer will receive',
        amount: 'How much are you charging?',
        imageDesc: "Add clear images of the item you're selling",
        counterpart: 'Buyer',
    },
    buyer: {
        orderDetails: 'What are you buying?',
        orderDetailsPlaceholder: 'e.g. Laptop, building materials',
        description: 'Order description',
        descriptionPlaceholder: 'Clearly describe what you expect to receive',
        amount: 'How much are you paying?',
        imageDesc: "Add a picture of the item you are buying (optional, but helpful)",
        counterpart: 'Seller',
    },
};

const CreateOrderWizard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const role = (searchParams.get('role') as 'seller' | 'buyer') || 'seller';
    const labels = roleLabels[role];

    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        title: '',
        email: '',
        phone: '',
        description: '',
        amount: '',
        feePayer: '',
        images: [] as File[],
        logisticsService: '',
        deliveryDate: '',
    });
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [orderCreated, setOrderCreated] = useState(false);

    // Simulated balance
    const balance = 30000;

    // Update handleChange to support customLogistics
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleQuickAmount = (amt: number) => {
        setForm({ ...form, amount: amt.toString() });
        setErrors({ ...errors, amount: '' });
    };

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.title) newErrors.title = 'Required';
        if (!form.email) newErrors.email = 'Required';
        if (!form.phone) newErrors.phone = 'Required';
        if (!form.description) newErrors.description = 'Required';
        if (!form.images.length && role === 'seller') newErrors.images = 'Image required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) newErrors.amount = 'Enter a valid amount';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Update validateDeliveryStep for custom logistics
    const validateStep3 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.deliveryDate) newErrors.deliveryDate = 'Delivery date required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        } else if (step === 3 && validateStep3()) {
            setStep(4);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };
    const handleCancel = () => {
        navigate('/');
    };
    const handleFinish = () => {
        // Simulate order creation
        setOrderCreated(true);
    };

    // Progress bar width
    const progress = step === 1 ? '25%' : step === 2 ? '50%' : step === 3 ? '75%' : '100%';

    // confirmation page
    if (orderCreated) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FAFAFF] items-center justify-center">
                <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-10 flex flex-col items-center">
                    <span className="text-3xl mb-4">🎉</span>
                    <h2 className="text-center text-xl font-semibold mb-2">Congratulations on creating your first order!</h2>
                    <p className="text-center text-gray-600 mb-6">An invite link has been sent to<br /><span className="font-medium">{form.email}</span>.</p>
                    <button
                        className="bg-primary-700 text-white rounded-lg px-6 py-2 font-medium hover:bg-primary-800 transition"
                    // onClick={...} // Add navigation to order details if needed
                    >
                        View order details
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <div className="flex items-center justify-between px-8 py-6">
                <div className="flex items-center space-x-2">
                    <button
                        className={`text-sm ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
                        onClick={handleBack}
                        disabled={step === 1}
                    >
                        &larr; Back
                    </button>
                </div>
                <button className="text-red-500 text-sm font-medium" onClick={handleCancel}>
                    Cancel <span className="text-xl font-light ml-1">&times;</span>
                </button>
            </div>

            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white rounded-2xl shadow-sm w-full max-w-xl px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
                    {step < 4 ? (
                        <>
                            <h2 className="text-center text-2xl font-semibold mb-1">Create order</h2>
                            <p className="text-center text-gray-500 text-sm mb-6">Fill in the details to initiate a transaction</p>
                        </>
                    ) : (
                        <>
                        <h2 className="text-center text-2xl font-semibold mb-1">Review order</h2>
                        <p className="text-center text-gray-500 text-sm mb-6">Take another look, confirm all details are correct</p>
                        </>
                    )}

                    <ProgressBar progress={progress} />

                    {/* Step 1: Order Details */}
                    {step === 1 && (
                        <form className="flex flex-col space-y-6">
                            <div>
                                <FormInput
                                    label={labels.orderDetails}
                                    name="title"
                                    placeholder={labels.orderDetailsPlaceholder}
                                    value={form.title}
                                    onChange={handleChange}
                                    error={errors.title}
                                    type="text"
                                />
                            </div>
                            <div>
                                <FormInput
                                    label={`${labels.counterpart}'s email`}
                                    name="email"
                                    placeholder="Enter email address"
                                    value={form.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    type="email"
                                />
                            </div>
                            <div>
                                <FormInput
                                    label={`${labels.counterpart}'s phone number`}
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                    type="tel"
                                />
                            </div>
                            <div>
                                <FormTextarea
                                    label={labels.description}
                                    name="description"
                                    placeholder={labels.descriptionPlaceholder}
                                    value={form.description}
                                    onChange={handleChange}
                                    error={errors.description}
                                    rows={4}
                                />
                            </div>
                            <div>
                                <ImageDropzone
                                    label={labels.imageDesc}
                                    images={form.images}
                                    imagePreviews={imagePreviews}
                                    onChange={(files, previews) => {
                                        setForm({ ...form, images: files });
                                        setImagePreviews(previews);
                                        setErrors({ ...errors, images: '' });
                                    }}
                                    error={errors.images}
                                    maxImages={10}
                                    isRequired={role === 'seller'}
                                />
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-[40%] bg-primary-700 text-white rounded-lg py-2 hover:bg-primary-800 transition"
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 2: Amount/Payment */}
                    {step === 2 && (
                        <form className="flex flex-col space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-1">{labels.amount}</label>
                                <div className="flex items-center mt-2 relative">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-medium pl-1">₦</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="0.00"
                                        value={form.amount}
                                        onChange={handleChange}
                                        className="w-full pl-8 pr-20 bg-transparent border-0 border-b-2 border-gray-200 focus:border-primary-400 rounded-none py-2 text-3xl font-medium focus:outline-none transition placeholder-gray-300 "
                                        style={{ letterSpacing: '1px' }}
                                    />
                                    <select
                                        name="currency"
                                        value="NGN"
                                        onChange={handleChange}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-0 text-gray-500 text-base font-medium pr-2 focus:outline-none cursor-pointer"
                                        style={{ minWidth: '60px' }}
                                    >
                                        <option key="NGN" value={"NGN"}>NGN</option>
                                    </select>
                                </div>
                                {errors.amount && <span className="text-xs text-red-500">{errors.amount}</span>}
                                <div className="mt-2 text-xs text-gray-400 font-medium">
                                    Bal: ₦{balance.toLocaleString()}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 items-center mt-2">
                                {quickAmounts.map((amt) => (
                                    <button
                                        type="button"
                                        key={amt}
                                        className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition focus:outline-none shadow-sm"
                                        onClick={() => handleQuickAmount(amt)}
                                    >
                                        ₦{amt.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 mt-2">Safescrow fee</label>
                                <div className="relative flex items-center mt-2">
                                    <input
                                        type="text"
                                        name="escrowFee"
                                        placeholder="0"
                                        value={`₦ ${form.amount && !isNaN(parseFloat(form.amount)) ? (0.002 * parseFloat(form.amount)).toFixed(2) : ''}`}
                                        readOnly
                                        className="w-full p-4 bg-transparent border border-gray-300 rounded-xl text-md text-gray-500 focus:outline-none focus:border-primary-400 transition placeholder-gray-300 cursor-default"
                                        style={{ letterSpacing: '1px' }}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-[40%] bg-primary-700 text-white rounded-lg py-2 hover:bg-primary-800 transition"
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Delivery Details */}
                    {step === 3 && (
                        <form className="flex flex-col space-y-8">
                            <div className="py-6 md:py-8 flex flex-col gap-6">
                                <div className="flex-1 flex flex-col justify-center">
                                    <label className="block text-sm font-semibold mb-1">Delivery Date</label>
                                    <div className="relative flex items-center mt-2">
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                            <CalendarIcon />
                                        </span>
                                        <input
                                            type="date"
                                            name="deliveryDate"
                                            value={form.deliveryDate}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-4 bg-transparent border-0 border-b-2 border-gray-200 focus:border-primary-400 rounded-none py-3 text-lg font-medium focus:outline-none transition placeholder-gray-300"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-400 mt-1">Expected delivery date</span>
                                    {errors.deliveryDate && <span className="block text-xs text-red-500 mt-1">{errors.deliveryDate}</span>}
                                </div>
                                {role === 'seller' && (
                                    <div className="flex flex-col justify-center">
                                        <label className="block text-sm font-semibold mb-1">Logistics Service <span className="text-xs text-gray-400">(optional)</span></label>
                                        <div className="relative flex items-center mt-2">
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                <TruckIcon />
                                            </span>
                                            <select
                                                name="logisticsService"
                                                value={form.logisticsService}
                                                onChange={handleChange}
                                                className="w-full pl-9 pr-4 bg-transparent border-0 border-b-2 border-gray-200 focus:border-primary-400 rounded-none py-3 text-lg font-medium focus:outline-none transition placeholder-gray-300"
                                            >
                                                <option value="">Select a service</option>
                                                <option value="GIG">GIG Logistics</option>
                                                <option value="DHL">DHL</option>
                                                <option value="FedEx">FedEx</option>
                                                <option value="UPS">UPS</option>
                                            </select>
                                        </div>
                                        <span className="text-xs text-gray-400 mt-1">Choose a delivery service</span>
                                    </div>
                                )}
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-[40%] bg-primary-700 text-white rounded-lg py-2 hover:bg-primary-800 transition"
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 4: Review/Confirm */}
                    {step === 4 && (
                        <div className="flex flex-col items-center">
                            <div className="w-full flex flex-col space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">{labels.orderDetails}</span>
                                    <span className="text-gray-800">{form.title}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">{labels.counterpart}'s email</span>
                                    <span className="text-gray-800">{form.email}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">{labels.counterpart}'s phone number</span>
                                    <span className="text-gray-800">{form.phone}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">{labels.description}</span>
                                    <span className="text-gray-800">{form.description}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Transaction amount</span>
                                    <span className="text-gray-800">₦{Number(form.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                {role === 'seller' && (
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-600">Logistics Service</span>
                                        <span className="text-gray-800">{form.logisticsService || '-'}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Delivery Date</span>
                                    <span className="text-gray-800">{form.deliveryDate || '-'}</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleFinish}
                                className="w-[40%] bg-primary-700 text-white rounded-lg py-2 hover:bg-primary-800 transition"
                            >
                                Confirm
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateOrderWizard; 