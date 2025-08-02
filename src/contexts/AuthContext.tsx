import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';
import { User, LoginCredentials, RegisterData } from 'types';
import { authAPI } from 'services/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    authLoading: boolean; // Separate loading for login/register
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    handleAuthFailure: () => void;
    refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

// Token validation helper
const isTokenValid = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Check if token expires in the next 2 minutes (buffer for refresh)
        return payload.exp * 1000 > Date.now() + (2 * 60 * 1000);
    } catch {
        return false;
    }
};

// Get token expiry time in milliseconds
const getTokenExpiry = (token: string): number | null => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000;
    } catch {
        return null;
    }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Initial app loading
    const [authLoading, setAuthLoading] = useState(false); // Login/register loading
    const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isRefreshingRef = useRef(false);

    // Clear refresh timeout
    const clearRefreshTimeout = useCallback(() => {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
            refreshTimeoutRef.current = null;
        }
    }, []);

    // Handle authentication failures
    const handleAuthFailure = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        clearRefreshTimeout();
    }, [clearRefreshTimeout]);

    // Refresh token function
    const refreshToken = useCallback(async (): Promise<boolean> => {
        if (isRefreshingRef.current) {
            return false;
        }

        isRefreshingRef.current = true;

        try {
            const refreshTokenValue = localStorage.getItem('refresh_token');
            if (!refreshTokenValue) {
                throw new Error('No refresh token available');
            }

            const response = await authAPI.refreshToken();
            const { access_token, refresh_token } = response.data;

            localStorage.setItem('access_token', access_token);
            if (refresh_token) {
                localStorage.setItem('refresh_token', refresh_token);
            }

            return true;
        } catch (error) {
            handleAuthFailure();
            return false;
        } finally {
            isRefreshingRef.current = false;
        }
    }, [handleAuthFailure]);

    // Schedule token refresh based on token expiry
    const scheduleTokenRefresh = useCallback((token: string) => {
        const expiry = getTokenExpiry(token);
        if (!expiry) return;

        // Refresh 5 minutes before expiry
        const refreshTime = expiry - Date.now() - (5 * 60 * 1000);

        if (refreshTime > 0) {
            clearRefreshTimeout();
            refreshTimeoutRef.current = setTimeout(() => {
                refreshToken();
            }, refreshTime);
        }
    }, [clearRefreshTimeout, refreshToken]);

    // Fetch user profile with error handling
    const fetchUserProfile = useCallback(async (): Promise<User | null> => {
        try {
            const response = await authAPI.getProfile();
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            return null;
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            const token = localStorage.getItem('access_token');

            if (token) {
                if (isTokenValid(token)) {
                    const userData = await fetchUserProfile();
                    if (isMounted && userData) {
                        setUser(userData);
                        scheduleTokenRefresh(token);
                    } else if (isMounted) {
                        // Profile fetch failed, try refresh
                        const refreshed = await refreshToken();
                        if (refreshed) {
                            const retryUserData = await fetchUserProfile();
                            if (retryUserData) {
                                setUser(retryUserData);
                                scheduleTokenRefresh(localStorage.getItem('access_token')!);
                            }
                        }
                    }
                } else {
                    // Token is expired, try to refresh
                    if (isMounted) {
                        const refreshed = await refreshToken();
                        if (refreshed) {
                            const userData = await fetchUserProfile();
                            if (userData) {
                                setUser(userData);
                                scheduleTokenRefresh(localStorage.getItem('access_token')!);
                            }
                        }
                    }
                }
            }

            if (isMounted) {
                setLoading(false);
            }
        };

        initializeAuth();

        return () => {
            isMounted = false;
            clearRefreshTimeout();
        };
    }, [refreshToken, scheduleTokenRefresh, fetchUserProfile, clearRefreshTimeout]);

    const login = async (credentials: LoginCredentials) => {
        setAuthLoading(true);
        try {
            const response = await authAPI.login(credentials);
            const { access_token, refresh_token } = response.data;

            localStorage.setItem('access_token', access_token);
            if (refresh_token) {
                localStorage.setItem('refresh_token', refresh_token);
            }

            // Get user profile after storing tokens
            const userData = await fetchUserProfile();
            if (userData) {
                setUser(userData);
                scheduleTokenRefresh(access_token);
            } else {
                // Clean up if profile fetch fails
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                throw new Error('Failed to fetch user profile after login');
            }
        } catch (error) {
            throw error;
        } finally {
            setAuthLoading(false);
        }
    };

    const register = async (userData: RegisterData) => {
        setAuthLoading(true);
        try {
            const response = await authAPI.register(userData);
            const { access_token, refresh_token } = response.data;

            localStorage.setItem('access_token', access_token);
            if (refresh_token) {
                localStorage.setItem('refresh_token', refresh_token);
            }

            // Get user profile after storing tokens
            const userProfile = await fetchUserProfile();
            if (userProfile) {
                setUser(userProfile);
                scheduleTokenRefresh(access_token);
            } else {
                // Clean up if profile fetch fails
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                throw new Error('Failed to fetch user profile after registration');
            }
        } catch (error) {
            throw error;
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        clearRefreshTimeout();
        authAPI.logout().catch(() => {
            // Ignore logout API errors - user is logged out locally anyway
        });
    };

    const value: AuthContextType = {
        user,
        loading,
        authLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        handleAuthFailure,
        refreshToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};