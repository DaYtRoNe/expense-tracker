import { FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="bg-white border-b border-slate-200 h-16 px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">

            {/* Logo Area */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-slate-800 tracking-tight">
                    Expense<span className="text-indigo-600">Tracker</span>
                </span>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-6">

                {/* User Info */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                        <FiUser />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-slate-700">{user?.username || 'User'}</p>
                        <p className="text-xs text-slate-400">{user?.email || 'user@example.com'}</p>
                    </div>
                </div>

                {/* Separator */}
                <div className="h-6 w-px bg-slate-200"></div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="text-slate-500 hover:text-red-600 transition-colors"
                    title="Logout"
                >
                    <FiLogOut className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;