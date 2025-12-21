import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md">

                {/* Icon / Graphic */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center">
                        <FiAlertCircle className="text-indigo-600 text-5xl opacity-80" />
                    </div>
                </div>

                {/* Big 404 Text */}
                <h1 className="text-9xl font-bold text-slate-200 select-none">
                    404
                </h1>

                {/* Message */}
                <div className="relative -mt-12 mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Page not found</h2>
                    <p className="text-slate-500 text-lg">
                        Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
                    </p>
                </div>

                {/* Action Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 group"
                >
                    <FiHome className="text-lg" />
                    <span>Go back home</span>
                </Link>

            </div>

            {/* Footer style text */}
            <div className="mt-12 text-slate-400 text-sm">
                Error Code: 404_NOT_FOUND
            </div>
        </div>
    );
};

export default NotFound;