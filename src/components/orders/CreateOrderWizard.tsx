import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FormInput, FormTextarea, ImageDropzone, ProgressBar } from 'components/ui';
import { CalendarIcon, TruckIcon } from 'components/icons/ExternalIcons';
import PaystackPop from '@paystack/inline-js';
import { escrowAPI } from 'services/api';

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
        name: '',
        price: '',
        description: '',
        delivery_date: '',

        receiver_email: '',
        receiver_phone: '',

        role: role,
        logistic_service: '',
        images: [] as File[],
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
        setForm({ ...form, price: amt.toString() });
        setErrors({ ...errors, price: '' });
    };

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.name) newErrors.name = 'Required';
        if (!form.receiver_email) newErrors.receiver_email = 'Required';
        if (!form.receiver_phone) newErrors.receiver_phone = 'Required';
        if (!form.description) newErrors.description = 'Required';
        if (!form.images.length && role === 'seller') newErrors.images = 'Image required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) newErrors.price = 'Enter a valid amount';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Update validateDeliveryStep for custom logistics
    const validateStep3 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.delivery_date) newErrors.delivery_date = 'Delivery date required';
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

    const handleFinish = async () => {
        try {
            const response = await escrowAPI.create(form);
            if (response.data && response.data.access_code) {
                const popup = new PaystackPop();
                popup.resumeTransaction(response.data.access_code,
                    {
                        onSuccess: () => {
                            setOrderCreated(true);
                        }
                    }
                );
            } else {
                setOrderCreated(true);
            }
        } catch (err: any) {
            console.error('Error creating order:', err);
            setErrors({ ...errors, api: err?.response?.data?.detail || 'An error occurred while creating the order.' });
        }
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
                    <p className="text-center text-gray-600 mb-6">An invite link has been sent to<br /><span className="font-medium">{form.receiver_email}</span>.</p>
                    <button
                        className="bg-primary-700 text-white rounded-lg px-6 py-2 font-medium hover:bg-primary-800 transition"
                        onClick={() => navigate(`/orders/1`)}
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
                                    name="name"
                                    placeholder={labels.orderDetailsPlaceholder}
                                    value={form.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    type="text"
                                />
                            </div>
                            <div>
                                <FormInput
                                    label={`${labels.counterpart}'s email`}
                                    name="receiver_email"
                                    placeholder="Enter email address"
                                    value={form.receiver_email}
                                    onChange={handleChange}
                                    error={errors.receiver_email}
                                    type="email"
                                />
                            </div>
                            <div>
                                <FormInput
                                    label={`${labels.counterpart}'s phone number`}
                                    name="receiver_phone"
                                    placeholder="Enter phone number"
                                    value={form.receiver_phone}
                                    onChange={handleChange}
                                    error={errors.receiver_phone}
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
                                        name="price"
                                        placeholder="0.00"
                                        value={form.price}
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
                                {errors.price && <span className="text-xs text-red-500">{errors.price}</span>}
                                <div className="mt-2 text-xs text-gray-400 font-medium">
                                    Bal: ₦{balance.toLocaleString()}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 items-center mt-2">
                                {quickAmounts.map((amt) => (
                                    <button
                                        type="button"
                                        key={amt}
                                        className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition focus:outline-primary-200 shadow-sm"
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
                                        value={`₦ ${form.price && !isNaN(parseFloat(form.price)) ? (0.002 * parseFloat(form.price)).toFixed(2) : ''}`}
                                        readOnly
                                        className="w-full p-4 bg-transparent border border-gray-300 rounded-xl text-md text-gray-500 focus:outline-none focus:border-primary-400 transition placeholder-gray-300 cursor-default"
                                        style={{ letterSpacing: '1px' }}
                                    />
                                </div>
                                {form.price && !isNaN(parseFloat(form.price)) && (
                                    <>
                                        <div className="mt-2 text-xs text-gray-500">
                                            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                                                <div className="flex-1 text-center">
                                                    <div className="font-medium text-gray-700">You pay</div>
                                                    <div className="text-gray-600">₦{((0.002 * parseFloat(form.price)) / 2).toFixed(2)}</div>
                                                </div>
                                                <div className="w-px h-8 bg-gray-300 mx-2"></div>
                                                <div className="flex-1 text-center">
                                                    <div className="font-medium text-gray-700">{labels.counterpart} pays</div>
                                                    <div className="text-gray-600">₦{((0.002 * parseFloat(form.price)) / 2).toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="mt-4 p-3 bg-primary-50 border border-primary-100 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-semibold text-primary-800">{role === 'seller' ? "You'll receive" : "Total payment"}</span>
                                                <span className="text-lg font-bold text-primary-800">
                                                    ₦{parseFloat(
                                                        (
                                                            parseFloat(form.price) +
                                                            (role === "seller" ? -1 : 1) * (0.002 * parseFloat(form.price) / 2)
                                                        ).toFixed(2)
                                                    ).toLocaleString()}

                                                </span>
                                            </div>
                                            <div className="text-xs text-primary-600 mt-1">
                                                Transaction amount {role === "seller" ? "-" : "+"} Safescrow fee
                                            </div>
                                        </div>
                                    </>
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
                                            name="delivery_date"
                                            value={form.delivery_date}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-4 bg-transparent border-0 border-b-2 border-gray-200 focus:border-primary-400 rounded-none py-3 text-lg font-medium focus:outline-none transition placeholder-gray-300"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-400 mt-1">Expected delivery date</span>
                                    {errors.delivery_date && <span className="block text-xs text-red-500 mt-1">{errors.deliveryDate}</span>}
                                </div>
                                {role === 'seller' && (
                                    <div className="flex flex-col justify-center">
                                        <label className="block text-sm font-semibold mb-1">Logistics Service <span className="text-xs text-gray-400">(optional)</span></label>
                                        <div className="relative flex items-center mt-2">
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                <TruckIcon />
                                            </span>
                                            <select
                                                name="logistic_service"
                                                value={form.logistic_service}
                                                onChange={handleChange}
                                                className="w-full pl-9 pr-4 bg-transparent border-0 border-b-2 border-gray-200 focus:border-primary-400 rounded-none py-3 text-lg font-medium focus:outline-none transition placeholder-gray-300"
                                            >
                                                <option value="">[---]</option>
                                                <option value="gig">GIG Logistics</option>
                                                <option value="dhl">DHL</option>
                                                <option value="okada_express">Okada Express</option>
                                                <option value="kwik">Kwik</option>
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
                                    <span className="text-gray-800">{form.name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">{labels.counterpart}'s email</span>
                                    <span className="text-gray-800">{form.receiver_email}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">{labels.counterpart}'s phone number</span>
                                    <span className="text-gray-800">{form.receiver_phone}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">{labels.description}</span>
                                    <span className="text-gray-800">{form.description}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Transaction amount</span>
                                    <span className="text-gray-800">₦{Number(form.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                {role === 'seller' && (
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-600">Logistics Service</span>
                                        <span className="text-gray-800">{form.logistic_service || '-'}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Delivery Date</span>
                                    <span className="text-gray-800">{form.delivery_date || '-'}</span>
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