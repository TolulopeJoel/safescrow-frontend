import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { Dashboard, Orders, Transactions, CreateOrderPage, Disputes, OrderDetails, Register, Login } from './pages';

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            {/* Public routes: login and register routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
            <Route path="/orders" element={<Layout><Orders /></Layout>} />
            <Route path="/orders/:id" element={<Layout><OrderDetails /></Layout>} />
            <Route path="/escrow/new" element={<Layout><CreateOrderPage /></Layout>} />
            <Route path="/disputes" element={<Layout><Disputes /></Layout>} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
