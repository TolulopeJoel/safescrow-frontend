import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FormInput from '../ui/FormInput';
import FormTextarea from '../ui/FormTextarea';

const quickAmounts = [1000, 5000, 10000, 15000, 20000];
const currencies = ['NGN'];

const roleLabels = {
    seller: {
        orderDetails: 'What are you selling?',
        orderDetailsPlaceholder: 'e.g. iPhone 16, custom furniture',
        description: 'Delivery note',
        descriptionPlaceholder: 'Clearly describe what the buyer will receive',
        amount: 'How much are you charging?',
        // buyerWillPay: 'Buyer will pay',
        counterpart: 'Buyer',
    },
    buyer: {
        orderDetails: 'What are you buying?',
        orderDetailsPlaceholder: 'e.g. Laptop, building materials',
        description: 'Order description',
        descriptionPlaceholder: 'Clearly describe what you expect to receive',
        amount: 'How much are you paying?',
        // buyerWillPay: 'You will pay',
        counterpart: 'Seller',
    },
};


const CreateOrderWizard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const role = (searchParams.get('role') as 'seller' | 'buyer') || 'seller';
    const labels = roleLabels[role];

    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        title: '',
        email: '',
        phone: '',
        description: '',
        amount: '',
        currency: 'NGN',
        // buyerWillPay: '',
        feePayer: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [orderCreated, setOrderCreated] = useState(false);

    // Simulated balance
    const balance = 30000;

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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) newErrors.amount = 'Enter a valid amount';
        // if (!form.buyerWillPay || isNaN(Number(form.buyerWillPay))) newErrors.buyerWillPay = 'Enter amount';
        if (!form.feePayer) newErrors.feePayer = 'Select who pays the Escrowly fee';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };
    const handleCancel = () => {
        // Implement navigation or reset logic
    };
    const handleFinish = () => {
        // Simulate order creation
        setOrderCreated(true);
    };

    // Progress bar width
    const progress = step === 1 ? '33%' : step === 2 ? '66%' : '100%';

    // Success/confirmation page
    if (orderCreated) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FAFAFF] items-center justify-center">
                <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-10 flex flex-col items-center">
                    <span className="text-3xl mb-4">🎉</span>
                    <h2 className="text-center text-xl font-semibold mb-2">Congratulations on creating your first order!</h2>
                    <p className="text-center text-gray-600 mb-6">An invite link has been sent to<br /><span className="font-medium">{form.email}</span>.</p>
                    <button
                        className="bg-blue-700 text-white rounded-lg px-6 py-2 font-medium hover:bg-blue-800 transition"
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
                    <button className="text-gray-500 text-sm" onClick={handleBack}>&larr; Back</button>
                </div>
                <button className="text-red-500 text-sm font-medium" onClick={handleCancel}>
                    Cancel <span className="text-xl font-light ml-1">&times;</span>
                </button>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white rounded-2xl shadow-sm w-full max-w-xl p-16">
                    {step < 3 ? (
                        <>
                            <h2 className="text-center text-2xl font-semibold mb-1">Create order</h2>
                            <p className="text-center text-gray-500 text-sm mb-6">Fill in the details to initiate a transaction</p>
                        </>
                    ) : (
                        <h2 className="text-center text-2xl font-semibold mb-6">Review your order details</h2>
                    )}
                    {/* Progress bar */}
                    <div className="mb-6">
                        <div className="h-1 w-full bg-primary-100 rounded">
                            <div className="h-1 bg-primary-400 rounded transition-all duration-300" style={{ width: progress }} />
                        </div>
                    </div>
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
                            <button
                                type="button"
                                onClick={handleNext}
                                className="mt-4 w-full bg-blue-700 text-white rounded-lg py-2 font-medium hover:bg-blue-800 transition"
                            >
                                Next
                            </button>
                        </form>
                    )}
                    {/* Step 2: Amount/Payment */}
                    {step === 2 && (
                        <form className="flex flex-col space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">{labels.amount}</label>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="text-2xl font-bold">₦</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="0.00"
                                        value={form.amount}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary-200"
                                    />
                                    <select
                                        name="currency"
                                        value={form.currency}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none"
                                    >
                                        {currencies.map((cur) => (
                                            <option key={cur} value={cur}>{cur}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.amount && <span className="text-xs text-red-500">{errors.amount}</span>}
                            </div>
                            <div className="flex space-x-2 mt-2">
                                {quickAmounts.map((amt) => (
                                    <button
                                        type="button"
                                        key={amt}
                                        className="bg-gray-100 rounded-lg px-3 py-1 text-sm font-medium hover:bg-primary-100 border border-gray-200"
                                        onClick={() => handleQuickAmount(amt)}
                                    >
                                        ₦{amt.toLocaleString()}
                                    </button>
                                ))}
                                <span className="ml-auto text-xs text-gray-500">Bal: ₦{balance.toLocaleString()}</span>
                            </div>
                            {/* <div>
                                <label className="block text-sm font-semibold mb-1 mt-2">{labels.buyerWillPay}</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        name="buyerWillPay"
                                        placeholder="0"
                                        value={form.buyerWillPay}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                                    />
                                    <select
                                        name="buyerWillPayCurrency"
                                        value={form.buyerWillPayCurrency}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none"
                                    >
                                        {currencies.map((cur) => (
                                            <option key={cur} value={cur}>{cur}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.buyerWillPay && <span className="text-xs text-red-500">{errors.buyerWillPay}</span>}
                            </div> */}
                            <div className="mt-2">
                                <label className="block text-sm font-semibold mb-1">Who will pay the Escrowly fee?</label>
                                <div className="flex flex-col space-y-2 mt-1">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="feePayer"
                                            value="me"
                                            checked={form.feePayer === 'me'}
                                            onChange={handleChange}
                                            className="accent-primary-400"
                                        />
                                        <span className="text-sm">I will pay the Escrowly fee</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="feePayer"
                                            value="buyer"
                                            checked={form.feePayer === 'buyer'}
                                            onChange={handleChange}
                                            className="accent-primary-400"
                                        />
                                        <span className="text-sm">The buyer will pay the Escrowly fee</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="feePayer"
                                            value="split"
                                            checked={form.feePayer === 'split'}
                                            onChange={handleChange}
                                            className="accent-primary-400"
                                        />
                                        <span className="text-sm">The buyer will pay the Escrowly fee</span>
                                    </label>
                                </div>
                                {errors.feePayer && <span className="text-xs text-red-500">{errors.feePayer}</span>}
                            </div>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="mt-4 w-full bg-blue-700 text-white rounded-lg py-2 font-medium hover:bg-blue-800 transition"
                            >
                                Next
                            </button>
                        </form>
                    )}
                    {/* Step 3: Review/Confirm */}
                    {step === 3 && (
                        <div className="flex flex-col items-center">
                            <div className="w-full flex flex-col space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">{labels.orderDetails}</span>
                                    <span className="text-gray-800">{form.title}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Buyer's email</span>
                                    <span className="text-gray-800">{form.email}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Buyer's phone number</span>
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
                                {/* <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-600">Amount to receive</span>
                                    <span className="text-gray-800">₦{Number(form.buyerWillPay).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div> */}
                            </div>
                            <button
                                type="button"
                                onClick={handleFinish}
                                className="mt-4 w-full bg-blue-700 text-white rounded-lg py-2 font-medium hover:bg-blue-800 transition"
                            >
                                Finish
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateOrderWizard; 