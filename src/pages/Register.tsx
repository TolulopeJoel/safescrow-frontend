import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProgressBar, FormInput } from '../components/ui';

const steps = [
    { label: 'Your Name', description: 'Let’s get to know you!' },
    { label: 'Email Address', description: 'Where can we reach you?' },
    { label: 'Create Password', description: 'Secure your account 🙈' },
];

const Register: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [success, setSuccess] = useState(false);

    const validateStep = () => {
        const newErrors: { [key: string]: string } = {};
        if (step === 1) {
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
        } else if (step === 2) {
            if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
            if (form.password2 !== form.password) newErrors.password2 = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
        setApiError('');
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
        setApiError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;
        setLoading(true);
        setApiError('');
        try {
            await register(form);
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 1800);
        } catch (err: any) {
            setApiError(err?.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    // Progress bar width
    const progress = `${((step + (success ? 2 : 1)) / (steps.length)) * 100}%`;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F4FF] relative overflow-hidden px-4">
            {/* Soft Accent SVG Shapes */}
            <svg className="absolute left-0 top-1/4 w-40 h-40 opacity-10 text-primary-400" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="50" /></svg>
            <svg className="absolute right-0 bottom-0 w-32 h-32 opacity-10 text-primary-400" viewBox="0 0 100 100" fill="currentColor"><polygon points="0,100 100,0 100,100" /></svg>
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-10 md:p-12 mt-16 mb-16 relative z-10 flex flex-col items-center">
                {/* Progress Bar */}
                <div className="w-full mx-auto mb-6">
                    <ProgressBar progress={progress} />
                </div>
                {/* Stepper or Success */}
                {!success ? (
                    <>
                        <h2 className="text-2xl md:text-3xl mb-3 text-center">
                            {step === 0 && 'Welcome!'}
                            {step === 1 && `Nice to meet you, ${form.name || 'friend'}!`}
                            {step === 2 && 'Almost there!'}
                        </h2>
                        <p className="text-base md:text-lg text-gray-500 text-center mb-8">
                            {steps[step].description}
                        </p>
                        <form onSubmit={step < 2 ? handleNext : handleSubmit} className="space-y-7 w-full max-w-md mx-auto">
                            {step === 0 && (
                                <FormInput
                                    label="Name"
                                    name="name"
                                    type="text"
                                    required={true}
                                    placeholder="Your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    autoComplete="name"
                                    autoFocus
                                    className="text-base rounded-xl"
                                />
                            )}
                            {step === 1 && (
                                <FormInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    required={true}
                                    placeholder="you@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    autoComplete="email"
                                    autoFocus
                                    className="text-base rounded-xl"
                                />
                            )}
                            {step === 2 && (
                                <>
                                    <FormInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        required={true}
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        autoComplete="new-password"
                                        autoFocus
                                        className="text-base rounded-xl"
                                    />
                                    <FormInput
                                        label="Confirm Password"
                                        name="password2"
                                        type="password"
                                        required={true}
                                        placeholder="••••••••"
                                        value={form.password2}
                                        onChange={handleChange}
                                        error={errors.password2}
                                        className="text-base rounded-xl"
                                    />
                                </>

                            )}
                            {apiError && <div className="text-red-500 text-sm text-center">{apiError}</div>}
                            <div className="flex items-center justify-between gap-2 mt-2">
                                {step > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`w-full py-4 rounded-full text-base font-semibold transition disabled:opacity-60 ${loading ? 'bg-primary-300 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}
                                    disabled={loading}
                                >
                                    {loading
                                        ? 'Processing...'
                                        : step < 2
                                            ? 'Next'
                                            : 'Create Account'}
                                </button>
                            </div>
                        </form>
                        <div className="mt-10 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 hover:underline font-medium">Sign in</Link>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                        <svg className="w-16 h-16 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h2 className="text-2xl font-bold mb-2 text-center">You’re all set, {form.name}!</h2>
                        <p className="text-gray-500 text-center mb-2">Welcome to Safescrow 🎉</p>
                        <p className="text-gray-400 text-center text-sm">Redirecting to your dashboard...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register; 