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
      // Redirect to previous page or dashboard
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err: any) {
      setApiError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden px-4">
      {/* Soft Accent SVG Shapes */}
      <svg className="absolute left-0 top-1/4 w-40 h-40 opacity-10 text-primary-400" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="50" /></svg>
      <svg className="absolute right-0 bottom-0 w-32 h-32 opacity-10 text-primary-400" viewBox="0 0 100 100" fill="currentColor"><polygon points="0,100 100,0 100,100" /></svg>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 z-10">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign in to your account</h2>
        <p className="text-gray-500 text-center mb-8">Welcome back! Please enter your details.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
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
      </div>
    </div>
  );
};

export default Login; 