import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserRole } from './types/auth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import Dashboard from './pages/Dashboard';
import StrategyBuilder from './pages/StrategyBuilder';
import SocialTrading from './pages/SocialTrading';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';
import SuperAdmin from './pages/SuperAdmin';
import BrokerPanel from './pages/BrokerPanel';
import ApiKeys from './pages/ApiKeys';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredPermission="viewDashboard">
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/strategy-builder" 
            element={
              <ProtectedRoute requiredPermission="selectStrategies">
                <StrategyBuilder />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/social-trading" 
            element={
              <ProtectedRoute requiredPermission="selectStrategies">
                <SocialTrading />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/portfolio" 
            element={
              <ProtectedRoute requiredPermission="viewDashboard">
                <Portfolio />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute requiredPermission="viewAnalytics">
                <Analytics />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole={UserRole.ADMIN}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/super-admin" 
            element={
              <ProtectedRoute requiredRole={UserRole.SUPER_ADMIN}>
                <SuperAdmin />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/broker-panel" 
            element={
              <ProtectedRoute requiredPermission="createUsers">
                <BrokerPanel />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/api-keys" 
            element={
              <ProtectedRoute requiredPermission="addApiKeys">
                <ApiKeys />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute requiredPermission="viewDashboard">
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
