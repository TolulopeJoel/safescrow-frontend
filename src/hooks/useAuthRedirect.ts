import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Hook to redirect authenticated users away from auth pages
export const useAuthRedirect = () => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            // Get the intended destination or default to dashboard
            const from = (location.state as any)?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, loading, navigate, location]);

    return { isAuthenticated, loading };
};