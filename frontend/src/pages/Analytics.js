import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const weeklyMetrics = [
  { week: 'W1', openRate: 38, clickRate: 12, bounceRate: 2.8, unsubRate: 0.4 },
  { week: 'W2', openRate: 41, clickRate: 14, bounceRate: 2.2, unsubRate: 0.3 },
  { week: 'W3', openRate: 36, clickRate: 11, bounceRate: 3.1, unsubRate: 0.5 },
  { week: 'W4', openRate: 45, clickRate: 18, bounceRate: 1.9, unsubRate: 0.2 },
  { week: 'W5', openRate: 43, clickRate: 16, bounceRate: 2.0, unsubRate: 0.3 },
  { week: 'W6', openRate: 48, clickRate: 21, bounceRate: 1.7, unsubRate: 0.2 },
];

const geoData = [
  { country: '🇮🇳 India', sent: 15200, opened: 7300, rate: '48.0%' },
  { country: '🇺🇸 USA',   sent: 9800,  opened: 4100, rate: '41.8%' },
  { country: '🇬🇧 UK',    sent: 5400,  opened: 2200, rate: '40.7%' },
  { country: '🇩🇪 Germany', sent: 3200, opened: 1500, rate: '46.9%' },
  { country: '🇦🇺 Australia', sent: 2800, opened: 1200, rate: '42.9%' },
];

const radarData = [
  { metric: 'Open Rate', current: 85, industry: 60 },
  { metric: 'Click Rate', current: 78, industry: 55 },
  { metric: 'Deliverability', current: 96, industry: 80 },
  { metric: 'Conversion', current: 70, industry: 45 },
  { metric: 'List Growth', current: 65, industry: 50 },
  { metric: 'Engagement', current: 88, industry: 65 },
];

const subjectData = [
  { subject: 'Emoji subjects', rate: 52 },
  { subject: 'Question format', rate: 48 },
  { subject: 'Urgency/FOMO', rate: 61 },
  { subject: 'Personalized', rate: 67 },
  { subject: 'Short (<30 chars)', rate: 44 },
  { subject: 'Number-led', rate: 55 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((e, i) => <p key={i} style={{ fontSize: 12, color: e.color }}>{e.name}: <strong>{e.value}{typeof e.value === 'number' && e.value < 100 ? '%' : ''}</strong></p>)}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [range, setRange] = useState('6w');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div className="animate-fadeIn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>Deep <span className="gradient-text">Analytics</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Advanced metrics and performance benchmarking</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['2w','6w','3m','1y'].map(r => (
            <button key={r} onClick={() => setRange(r)} style={{
              padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)',
              cursor: 'pointer', fontSize: 12, fontWeight: 600,
              background: range === r ? 'var(--gradient-main)' : 'var(--bg-hover)',
              color: range === r ? 'white' : 'var(--text-muted)'
            }}>{r}</button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
        {[
          { label: 'Avg Open Rate',   value: '43.5%', delta: '+5.2%',  icon: '📬', gradient: 'linear-gradient(135deg,#8b5cf6,#3b82f6)' },
          { label: 'Avg Click Rate',  value: '15.3%', delta: '+2.1%',  icon: '🖱️', gradient: 'linear-gradient(135deg,#3b82f6,#06b6d4)' },
          { label: 'Deliverability',  value: '98.2%', delta: '+0.3%',  icon: '✅', gradient: 'linear-gradient(135deg,#10b981,#06b6d4)' },
          { label: 'Unsubscribe',     value: '0.31%', delta: '-0.09%', icon: '🚫', gradient: 'linear-gradient(135deg,#ef4444,#f59e0b)' },
          { label: 'Revenue/Email',   value: '$0.87', delta: '+14.2%', icon: '💰', gradient: 'linear-gradient(135deg,#f59e0b,#10b981)' },
          { label: 'List Health',     value: '94.7%', delta: '+1.1%',  icon: '❤️', gradient: 'linear-gradient(135deg,#ec4899,#8b5cf6)' },
        ].map(k => (
          <div key={k.label} className="card" style={{ textAlign: 'center', padding: 16 }}>
            <div style={{
              width: 36, height: 36,
              background: k.gradient,
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
              margin: '0 auto 10px'
            }}>{k.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{k.value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{k.label}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: k.delta.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)' }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Weekly Trend */}
        <div className="card animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h2 style={{ fontSize: 15, marginBottom: 4 }}>Weekly Rate Trends</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Open & Click rates over time</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="week" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="openRate"   stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: '#8b5cf6', r: 4 }} name="Open Rate" />
              <Line type="monotone" dataKey="clickRate"  stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 4 }} name="Click Rate" />
              <Line type="monotone" dataKey="bounceRate" stroke="#ef4444" strokeWidth={2}   dot={{ fill: '#ef4444', r: 3 }} name="Bounce Rate" strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div className="card animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h2 style={{ fontSize: 15, marginBottom: 4 }}>Performance vs Industry</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Your scores vs industry benchmarks</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(148,163,184,0.1)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="You" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Industry" dataKey="industry" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 4 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
              <span style={{ width: 10, height: 3, background: '#8b5cf6', borderRadius: 2, display: 'inline-block' }} /> You
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
              <span style={{ width: 10, height: 3, background: '#3b82f6', borderRadius: 2, display: 'inline-block' }} /> Industry Avg
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Subject line performance */}
        <div className="card animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <h2 style={{ fontSize: 15, marginBottom: 4 }}>Subject Line Open Rates</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>AI analysis of subject line styles</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subjectData} layout="vertical" barSize={14}>
              <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} unit="%" />
              <YAxis type="category" dataKey="subject" stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} width={120} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="rate" fill="url(#barsGrad)" radius={[0, 4, 4, 0]} name="Open Rate">
                <defs>
                  <linearGradient id="barsGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geo table */}
        <div className="card animate-fadeIn" style={{ animationDelay: '400ms' }}>
          <h2 style={{ fontSize: 15, marginBottom: 4 }}>Geographic Performance</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Top countries by email engagement</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Country','Sent','Opened','Rate'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {geoData.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{r.country}</td>
                  <td style={{ padding: '10px', fontSize: 13, color: 'var(--text-secondary)' }}>{r.sent.toLocaleString()}</td>
                  <td style={{ padding: '10px', fontSize: 13, color: 'var(--text-secondary)' }}>{r.opened.toLocaleString()}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: 13 }}>{r.rate}</span>
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
