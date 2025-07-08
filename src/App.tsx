import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { Dashboard, Orders, Transactions } from './pages';

// Placeholder components - these will be implemented when you provide the designs
const LandingPage = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">SafeScrow</h1>
    <p className="text-xl text-gray-600">Secure escrow service coming soon...</p>
  </div>
);

const LoginPage = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Login</h1>
    <p className="text-xl text-gray-600">Login page coming soon...</p>
  </div>
);

const RegisterPage = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Register</h1>
    <p className="text-xl text-gray-600">Register page coming soon...</p>
  </div>
);

const CreateEscrowPage = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Escrow</h1>
    <p className="text-xl text-gray-600">Create escrow page coming soon...</p>
  </div>
);

const EscrowDetailPage = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Escrow Details</h1>
    <p className="text-xl text-gray-600">Escrow detail page coming soon...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />
            <Route path="/register" element={<Layout><RegisterPage /></Layout>} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
            <Route path="/orders" element={<Layout><Orders /></Layout>} />
            <Route path="/escrow/new" element={
              <ProtectedRoute>
                <Layout><CreateEscrowPage /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/escrow/:id" element={
              <ProtectedRoute>
                <Layout><EscrowDetailPage /></Layout>
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
