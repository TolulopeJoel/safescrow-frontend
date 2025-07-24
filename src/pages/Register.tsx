import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProgressBar, FormInput } from '../components/ui';

const steps = [
    { label: 'Your Name', description: 'Let’s get to know you!' },
    { label: 'Email Address', description: 'Where can we reach you?' },
    { label: 'Verify your identity', description: 'NIN verification is required to confirm your identity and complete your account setup.' },
    { label: 'Create Password', description: 'Set a strong password 🙈' },
];

const Register: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        nin: '',
        phone: '',
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
        if (step === 0) {
            const nameParts = form.name.trim().split(/\s+/);
            if (nameParts.length < 2 || nameParts.some(word => word.length < 2)) {
                newErrors.name = 'Please enter your full name (first and last)';
            }
        } else if (step === 1) {
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
            if (!form.phone) newErrors.phone = 'Phone number is required';
            if (!/^\d{10,15}$/.test(form.phone)) newErrors.phone = 'Enter a valid phone number';

        } else if (step === 2) {
            if (!form.nin) newErrors.nin = 'NIN is required';
            if (!/^[0-9]{11}$/.test(form.nin)) newErrors.nin = 'NIN must be 11 digits';

        } else if (step === 3) {
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden px-4">
            {/* Soft Accent SVG Shapes */}
            <svg className="absolute left-0 top-1/4 w-40 h-40 opacity-10 text-primary-400" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="50" /></svg>
            <svg className="absolute right-0 bottom-0 w-32 h-32 opacity-10 text-primary-400" viewBox="0 0 100 100" fill="currentColor"><polygon points="0,100 100,0 100,100" /></svg>
            <div className="w-full max-w-2xl rounded-2xl shadow-sm py-10 md:p-12 mt-16 mb-16 relative z-10 flex flex-col items-center">
                {/* Progress Bar */}
                <div className="w-full mx-auto mb-6">
                    <ProgressBar progress={progress} broken={true} segments={steps.length} />
                </div>
                {/* Stepper or Success */}
                {!success ? (
                    <>
                        <h2 className="text-2xl md:text-3xl mb-3 text-center">
                            {step === 0 && 'Welcome!'}
                            {step === 1 && `Nice to meet you, ${form.name.split(" ")[0] || 'friend'}!`}
                            {step === 2 && 'Let’s confirm it’s really you'}
                            {step === 3 && 'Your security matters to us'}
                        </h2>
                        <p className="text-base md:text-lg text-gray-500 text-center mb-8">
                            {steps[step].description}
                        </p>
                        <form onSubmit={step < (steps.length - 1) ? handleNext : handleSubmit} className="space-y-7 w-full max-w-lg mx-auto">
                            {step === 0 && (
                                <FormInput
                                    name="name"
                                    type="text"
                                    required={true}
                                    placeholder="Full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    autoComplete="name"
                                    autoFocus
                                    className="text-base rounded-xl"
                                />
                            )}

                            {/* Email & Phone Step */}
                            {step === 1 && (
                                <>
                                    <FormInput
                                        name="email"
                                        type="email"
                                        required={true}
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        autoComplete="email"
                                        autoFocus
                                        className="text-base rounded-xl"
                                    />
                                    <div className="flex items-end gap-2">
                                        <div className="rounded- py-4 px-0 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white h-14 ">NG</div>
                                        <FormInput
                                            name="phone"
                                            type="tel"
                                            required={true}
                                            placeholder="Phone number"
                                            value={form.phone}
                                            onChange={handleChange}
                                            error={errors.phone}
                                            className="flex-1 text-base rounded-xl"
                                        />
                                    </div>
                                </>
                            )}

                            {/* NIN Step */}
                            {step === 2 && (
                                <FormInput
                                    name="nin"
                                    type="text"
                                    required={true}
                                    placeholder="NIN"
                                    value={form.nin}
                                    onChange={handleChange}
                                    error={errors.nin}
                                    className="text-base rounded-xl"
                                />

                            )}

                            {/* Password Step */}
                            {step === 3 && (
                                <>
                                    <FormInput
                                        name="password"
                                        type="password"
                                        required={true}
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        autoComplete="new-password"
                                        autoFocus
                                        className="text-base rounded-xl"
                                    />
                                    <FormInput
                                        name="password2"
                                        type="password"
                                        required={true}
                                        placeholder="Confirm Password"
                                        value={form.password2}
                                        onChange={handleChange}
                                        error={errors.password2}
                                        className="text-base rounded-xl"
                                    />
                                </>

                            )}
                            {apiError && <div className="text-red-500 text-sm">{apiError}</div>}

                            <div className={`flex items-center ${step == 0 ? "justify-end" : "justify-between"} gap-2 mt-2`}>
                                {step > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`${step == 0 ? "w-1/3" : "w-full"}  py-3 rounded-lg text-base font-semibold transition disabled:opacity-60 ${loading ? 'bg-primary-300 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}
                                    disabled={loading}
                                >
                                    {loading
                                        ? 'Processing...'
                                        : step < (steps.length - 1)
                                            ? 'Next'
                                            : 'Create Account'
                                    }
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