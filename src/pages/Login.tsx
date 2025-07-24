import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FormInput } from '../components/ui';

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.email) newErrors.email = 'Email is required';
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
        if (!form.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
        setApiError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setApiError('');
        try {
            await login(form);
            setSuccess(true);
            setTimeout(() => {
                const from = (location.state as any)?.from?.pathname || '/dashboard';
                navigate(from, { replace: true });
            }, 1200);
        } catch (err: any) {
            setApiError(err?.response?.data?.message || 'We couldn\'t sign you in. Please check your details and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden px-4">
            {/* Soft Accent SVG Shapes */}
            <svg className="absolute left-0 top-1/4 w-40 h-40 opacity-10 text-primary-400" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="50" /></svg>
            <svg className="absolute right-0 bottom-0 w-32 h-32 opacity-10 text-primary-400" viewBox="0 0 100 100" fill="currentColor"><polygon points="0,100 100,0 100,100" /></svg>
            <div className="w-full max-w-2xl rounded-2xl shadow-sm py-10 md:p-12 mt-16 mb-16 relative z-10 flex flex-col items-center">
                {success ? (
                    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                        <svg className="w-16 h-16 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h2 className="text-2xl font-bold mb-2 text-center">Welcome back! 🎉</h2>
                        <p className="text-gray-500 text-center mb-2">You're being signed in...</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl md:text-3xl mb-3 text-center">Sign in to your account</h2>
                        <p className="text-base md:text-lg text-gray-500 text-center mb-8">Welcome back! Please enter your details.</p>
                        <form onSubmit={handleSubmit} className="space-y-7 w-full max-w-lg mx-auto">
                            <FormInput
                                name="email"
                                type="email"
                                required={true}
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleChange}
                                error={errors.email}
                                autoComplete="email"
                                autoFocus
                                className="text-base rounded-xl"
                            />
                            <FormInput
                                name="password"
                                type="password"
                                required={true}
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                error={errors.password}
                                autoComplete="current-password"
                                className="text-base rounded-xl"
                            />
                            {apiError && <div className="text-red-500 text-sm">{apiError}</div>}
                            <div className="flex justify-end">
                                <Link to="/forgot-password" className="text-primary-600 hover:underline text-sm font-medium">Forgot password?</Link>
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-3 rounded-lg text-base font-semibold transition disabled:opacity-60 ${loading ? 'bg-primary-300 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}
                                disabled={loading}
                            >
                                {loading ? 'Signing you in...' : 'Sign In'}
                            </button>
                        </form>
                        <div className="mt-8 text-center text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link to="/register" className="text-primary-600 hover:underline font-medium">Create one</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login; 