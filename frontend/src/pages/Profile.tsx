import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { FiUser, FiMail, FiSave, FiLogOut, FiCamera } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, logout } = useAuth();

    // Local state for editing
    const [fullName, setFullName] = useState(user?.username || ''); // අපි backend එකේ username කිව්වට මෙතන Full Name විදියට සලකමු
    const [isLoading, setIsLoading] = useState(false);

    // නමේ මුලකුරු ගන්න Helper (උදා: Eshan Gunasekara -> EG)
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // මෙතනට Backend Update API call එක එන්න ඕනේ.
        // දැනට අපි නිකන් Simulate කරමු.
        setTimeout(() => {
            toast.success("Profile updated successfully");
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your profile information and account preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: User Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold mx-auto mb-4 border-4 border-white shadow-sm">
                                    {getInitials(user?.username || 'U')}
                                </div>
                                <button className="absolute bottom-4 right-0 p-2 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-colors shadow-lg" title="Change Photo">
                                    <FiCamera className="text-sm" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-slate-900">{user?.username}</h2>
                            <p className="text-sm text-slate-500 mb-6">{user?.email}</p>

                            <div className="border-t border-slate-100 pt-6 text-left">
                                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                                    <span>Member since</span>
                                    <span className="font-medium">Dec 2025</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-slate-600">
                                    <span>Status</span>
                                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Edit Form */}
                    <div className="md:col-span-2 space-y-6">

                        {/* General Info Card */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FiUser /> General Information
                            </h3>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">

                                    {/* Full Name */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                        />
                                    </div>

                                    {/* Email (Read Only) */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                                        <div className="relative">
                                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="email"
                                                value={user?.email}
                                                disabled
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed text-sm"
                                            />
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">Email address cannot be changed for security reasons.</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10"
                                    >
                                        <FiSave />
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
                            <p className="text-slate-500 text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>

                            <div className="flex items-center justify-between">
                                <button
                                    onClick={logout}
                                    className="text-slate-600 hover:text-red-600 font-medium text-sm transition-colors flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-lg hover:border-red-200 hover:bg-red-50"
                                >
                                    <FiLogOut /> Sign Out
                                </button>

                                <button className="text-red-600 hover:text-white border border-red-200 hover:bg-red-600 font-medium text-sm transition-all px-4 py-2 rounded-lg">
                                    Delete Account
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default Profile; 