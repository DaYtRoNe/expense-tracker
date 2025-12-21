import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import AuthLayout from '../components/AuthLayout';
import { loginUser } from '../services/auth.service';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await loginUser({ email, password });

            login(response.user, response.accessToken);

            toast.success('Successfully logged in!');

            navigate('/dashboard');

        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const message = err.response?.data?.message || 'Login failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Master your Finances."
            subtitle="Track expenses, visualize income, and take control of your financial future with our professional dashboard."
        >
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
                <p className="text-slate-500 mt-2">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <div className="relative group">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                    </div>
                    <div className="relative group">
                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <><FiLoader className="animate-spin" /> Signing in...</>
                    ) : (
                        <>Sign In <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">Create account</Link>
            </p>
        </AuthLayout>
    );
};

export default Login;