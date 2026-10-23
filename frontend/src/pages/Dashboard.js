import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// --- Mock Data ---
const areaData = [
  { day: 'Mon', sent: 1200, opened: 580, clicked: 210 },
  { day: 'Tue', sent: 1800, opened: 900, clicked: 340 },
  { day: 'Wed', sent: 1400, opened: 720, clicked: 280 },
  { day: 'Thu', sent: 2200, opened: 1100, clicked: 420 },
  { day: 'Fri', sent: 1900, opened: 950, clicked: 380 },
  { day: 'Sat', sent: 800,  opened: 400, clicked: 145 },
  { day: 'Sun', sent: 600,  opened: 290, clicked: 95 },
];

const hourData = [
  { hour: '6am', opens: 12 }, { hour: '8am', opens: 45 },
  { hour: '10am', opens: 87 }, { hour: '12pm', opens: 62 },
  { hour: '2pm', opens: 94 }, { hour: '4pm', opens: 78 },
  { hour: '6pm', opens: 55 }, { hour: '8pm', opens: 30 },
];

const deviceData = [
  { name: 'Mobile', value: 52, color: '#8b5cf6' },
  { name: 'Desktop', value: 33, color: '#3b82f6' },
  { name: 'Tablet', value: 15, color: '#06b6d4' },
];

const recentCampaigns = [
  { name: 'Summer Sale 2026', sent: 12450, openRate: '47.2%', clickRate: '18.5%', status: 'active',   sentiment: '😊 Positive' },
  { name: 'Product Launch V3', sent: 8720,  openRate: '38.9%', clickRate: '12.3%', status: 'active',   sentiment: '🔥 Very Positive' },
  { name: 'Newsletter Oct',    sent: 5300,  openRate: '29.1%', clickRate: '8.7%',  status: 'completed', sentiment: '😐 Neutral' },
  { name: 'Re-engagement',     sent: 3200,  openRate: '22.4%', clickRate: '5.2%',  status: 'paused',    sentiment: '😟 Negative' },
  { name: 'Flash Deal Friday', sent: 6800,  openRate: '51.3%', clickRate: '24.1%', status: 'active',   sentiment: '🚀 Excellent' },
];

function StatCard({ icon, label, value, change, gradient, delay = 0 }) {
  return (
    <div className="card animate-fadeIn" style={{
      animationDelay: `${delay}ms`,
      background: 'var(--bg-card)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: gradient,
        opacity: 0.05,
        borderRadius: 'var(--radius-lg)'
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--text-muted)', marginBottom: 8 }}>
            {label}
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
            {value}
          </div>
          <div style={{
            marginTop: 8,
            fontSize: 12,
            fontWeight: 600,
            color: change.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)'
          }}>
            {change} vs last week
          </div>
        </div>
        <div style={{
          width: 48, height: 48,
          background: gradient,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ fontSize: 12, color: entry.color, marginBottom: 2 }}>
            {entry.name}: <strong>{entry.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('week');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Title */}
      <div className="animate-fadeIn">
        <h1 style={{ fontSize: 26, marginBottom: 4 }}>
          Dashboard <span className="gradient-text">Overview</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          Real-time insights into your email marketing performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard icon="📧" label="Emails Sent"   value="36,470" change="+12.4%" gradient="var(--gradient-main)" delay={0} />
        <StatCard icon="👁️" label="Open Rate"     value="42.8%"  change="+3.2%"  gradient="var(--gradient-green)" delay={100} />
        <StatCard icon="🖱️" label="Click Rate"    value="16.3%"  change="+1.8%"  gradient="var(--gradient-warm)" delay={200} />
        <StatCard icon="🚫" label="Bounce Rate"   value="2.1%"   change="-0.4%"  gradient="linear-gradient(135deg,#ef4444,#f59e0b)" delay={300} />
        <StatCard icon="📈" label="Conversions"   value="1,247"  change="+22.6%" gradient="var(--gradient-main)" delay={400} />
      </div>

      {/* Main Chart + Device Breakdown */}
      <div className="chart-grid">
        {/* Area Chart */}
        <div className="card animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 16, marginBottom: 4 }}>Email Performance</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>Sent, Opened & Clicked this week</p>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['week', 'month'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    background: activeTab === tab ? 'var(--gradient-main)' : 'var(--bg-hover)',
                    color: activeTab === tab ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorClicked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="sent"    stroke="#8b5cf6" strokeWidth={2} fill="url(#colorSent)"    name="Sent" />
              <Area type="monotone" dataKey="opened"  stroke="#3b82f6" strokeWidth={2} fill="url(#colorOpened)"  name="Opened" />
              <Area type="monotone" dataKey="clicked" stroke="#10b981" strokeWidth={2} fill="url(#colorClicked)" name="Clicked" />
            </AreaChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, marginTop: 12, justifyContent: 'center' }}>
            {[['#8b5cf6','Sent'],['#3b82f6','Opened'],['#10b981','Clicked']].map(([color, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                <span style={{ width: 10, height: 3, background: color, borderRadius: 2, display: 'inline-block' }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Pie chart - device */}
          <div className="card animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <h2 style={{ fontSize: 16, marginBottom: 4 }}>Opens by Device</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 16 }}>Where subscribers read emails</p>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '']} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
              {deviceData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
                  <span style={{ width: 8, height: 8, background: d.color, borderRadius: '50%', display: 'inline-block' }} />
                  {d.name} <strong style={{ color: 'var(--text-primary)' }}>{d.value}%</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Best time to send */}
          <div className="card animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <h2 style={{ fontSize: 16, marginBottom: 4 }}>Best Send Times</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 12 }}>Peak open hours today</p>
            <ResponsiveContainer width="100%" height={110}>
              <BarChart data={hourData} barSize={12}>
                <XAxis dataKey="hour" stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="opens" fill="url(#barGradient)" radius={[3, 3, 0, 0]}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{
              marginTop: 8,
              padding: '8px 12px',
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: 8,
              fontSize: 12,
              color: 'var(--accent-purple)',
              textAlign: 'center',
              fontWeight: 600
            }}>
              🏆 Best time: 2:00 PM (94 opens)
            </div>
          </div>
        </div>
      </div>

      {/* Recent Campaigns Table */}
      <div className="card animate-fadeIn" style={{ animationDelay: '500ms' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 16, marginBottom: 4 }}>Recent Campaigns</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>AI-analyzed campaign performance</p>
          </div>
          <button className="btn btn-secondary" style={{ fontSize: 12 }}>View All →</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Sent</th>
                <th>Open Rate</th>
                <th>Click Rate</th>
                <th>AI Sentiment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCampaigns.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{c.name}</div>
                  </td>
                  <td>{c.sent.toLocaleString()}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{
                          width: c.openRate,
                          background: 'var(--gradient-main)'
                        }} />
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.openRate}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{c.clickRate}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: 12 }}>{c.sentiment}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${c.status === 'active' ? 'success' : c.status === 'paused' ? 'warning' : 'info'}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
