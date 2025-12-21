import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    // Log වී නැත්නම්, Login එකට හරවා යවන්න
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Log වී ඇත්නම්, අදාළ පිටුව (Dashboard) පෙන්වන්න
    return <Outlet />;
};

export default ProtectedRoute;