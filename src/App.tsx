import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StrategyBuilder from './pages/StrategyBuilder';
import SocialTrading from './pages/SocialTrading';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/strategy-builder" element={<StrategyBuilder />} />
            <Route path="/social-trading" element={<SocialTrading />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
