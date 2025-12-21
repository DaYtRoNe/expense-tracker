import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AuthLayout from '../components/AuthLayout';
import { registerUser } from '../services/auth.service';
import { AxiosError } from 'axios';

const Register = () => {
    const navigate = useNavigate();

    // States
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await registerUser({
                username, 
                email,
                password
            });

            toast.success('Account created successfully!');

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error(error);

            const err = error as AxiosError<{ message: string }>;

            const message = err.response?.data?.message || 'Registration failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Join the Community."
            subtitle="Start managing your personal finances with a platform designed for clarity, speed, and growth."
        >
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Create account</h2>
                <p className="text-slate-500 mt-2">Get started with your free account today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Username</label>
                    <div className="relative group">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="eshangunasekara"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            required
                        />
                    </div>
                </div>

                {/* Email Input */}
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

                {/* Password Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <div className="relative group">
                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a strong password"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button with Loading State */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full  bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <FiLoader className="animate-spin" /> Processing...
                        </>
                    ) : (
                        <>
                            Create Account
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">Sign in</Link>
            </p>
        </AuthLayout>
    );
};

export default Register;