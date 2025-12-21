import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
                
                <div className="absolute inset-0 bg-linear-to-br from-indigo-600/20 via-slate-900 to-slate-900 z-0" />

                
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20"></div>
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

                
                <div className="relative z-10 max-w-lg text-left">
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                        {title}
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;