import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Analytics from './pages/Analytics';
import AIInsights from './pages/AIInsights';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div style={{ display: 'flex', width: '100%', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        {/* Background Glow Orbs */}
        <div className="glow-orb glow-purple" style={{ width: 600, height: 600, top: -200, left: -200 }} />
        <div className="glow-orb glow-blue" style={{ width: 400, height: 400, top: '50%', right: -150 }} />
        <div className="glow-orb glow-cyan" style={{ width: 300, height: 300, bottom: -100, left: '40%' }} />

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div style={{
          flex: 1,
          marginLeft: sidebarOpen ? 'var(--sidebar-width)' : '0',
          transition: 'margin-left var(--transition-base)',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1
        }}>
          <Header onMenuClick={() => setSidebarOpen(o => !o)} />
          <main style={{ flex: 1, padding: '24px', overflow: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
