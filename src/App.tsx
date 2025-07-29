import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from 'contexts/AuthContext';
import { SidebarProvider } from 'contexts/SidebarContext';

import Layout from 'components/layout/Layout';
import ProtectedRoute from 'components/layout/ProtectedRoute';
import { setAuthFailureHandler, setTokenRefreshHandler } from 'services/api';

import {
    Disputes, OrderDetails, Register, Login,
    Dashboard, Orders, Transactions, CreateOrderPage,
} from 'pages';


// Component to connect auth context with API
const AuthConnector: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { handleAuthFailure, refreshToken } = useAuth();

    useEffect(() => {
        // Connect the API service with the auth context
        setAuthFailureHandler(handleAuthFailure);
        setTokenRefreshHandler(refreshToken);
    }, [handleAuthFailure, refreshToken]);

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <AuthConnector>
                    <SidebarProvider>
                        <Routes>
                            {/* Public routes: login and register routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected routes */}
                            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/transactions" element={<Transactions />} />
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/orders/:id" element={<OrderDetails />} />
                                <Route path="/escrow/new" element={<CreateOrderPage />} />
                                <Route path="/disputes" element={<Disputes />} />
                            </Route>

                            {/* Catch all route */}
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </SidebarProvider>
                </AuthConnector>
            </AuthProvider>
        </Router>
    );
};

export default App;