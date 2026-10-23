import React, { useState } from 'react';

const campaigns = [
  { id: 1, name: 'Summer Sale 2026',    subject: '🌞 Huge Summer Deals Inside!',       status: 'active',    sent: 12450, opened: 5876, clicked: 2304, bounced: 124, scheduled: '2026-07-01', progress: 100 },
  { id: 2, name: 'Product Launch V3',   subject: '🚀 Introducing MailPulse 3.0',       status: 'active',    sent: 8720,  opened: 3392, clicked: 1073, bounced: 87,  scheduled: '2026-10-15', progress: 100 },
  { id: 3, name: 'Newsletter Oct',      subject: '📰 Monthly digest & tips',           status: 'completed', sent: 5300,  opened: 1542, clicked: 461,  bounced: 53,  scheduled: '2026-10-01', progress: 100 },
  { id: 4, name: 'Re-engagement Drive', subject: '💌 We miss you! Come back',          status: 'paused',    sent: 3200,  opened: 717,  clicked: 166,  bounced: 96,  scheduled: '2026-09-20', progress: 60 },
  { id: 5, name: 'Flash Deal Friday',   subject: '⚡ 48-Hour Flash Sale — Act Fast!',  status: 'active',    sent: 6800,  opened: 3489, clicked: 1639, bounced: 68,  scheduled: '2026-10-18', progress: 100 },
  { id: 6, name: 'Black Friday Teaser', subject: '🎁 Something BIG is coming Nov 29', status: 'draft',     sent: 0,     opened: 0,    clicked: 0,    bounced: 0,   scheduled: '2026-11-25', progress: 0 },
  { id: 7, name: 'Welcome Series 1',    subject: '👋 Welcome to MailPulse!',           status: 'active',    sent: 1250,  opened: 875,  clicked: 563,  bounced: 12,  scheduled: 'Automated',   progress: 100 },
];

function CampaignCard({ c }) {
  const openRate   = c.sent > 0 ? ((c.opened  / c.sent) * 100).toFixed(1) : '0.0';
  const clickRate  = c.sent > 0 ? ((c.clicked / c.sent) * 100).toFixed(1) : '0.0';
  const bounceRate = c.sent > 0 ? ((c.bounced / c.sent) * 100).toFixed(2) : '0.00';

  const statusColors = {
    active: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'rgba(16,185,129,0.3)' },
    completed: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    paused: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    draft: { bg: 'rgba(148,163,184,0.1)', color: '#94a3b8', border: 'rgba(148,163,184,0.3)' },
  };
  const sc = statusColors[c.status] || statusColors.draft;

  return (
    <div className="card animate-fadeIn" style={{ cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 3 }}>{c.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Subject: {c.subject}
          </div>
        </div>
        <span style={{
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          background: sc.bg,
          color: sc.color,
          border: `1px solid ${sc.border}`,
          marginLeft: 10,
          flexShrink: 0
        }}>
          {c.status}
        </span>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 }}>
        {[
          { label: 'Sent',    value: c.sent.toLocaleString(), color: '#8b5cf6' },
          { label: 'Opens',   value: `${openRate}%`,   color: '#3b82f6' },
          { label: 'Clicks',  value: `${clickRate}%`,  color: '#10b981' },
          { label: 'Bounced', value: `${bounceRate}%`, color: '#ef4444' },
        ].map(m => (
          <div key={m.label} style={{
            background: 'var(--bg-secondary)',
            borderRadius: 8,
            padding: '8px 10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {c.status !== 'draft' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11, color: 'var(--text-muted)' }}>
            <span>Delivery Progress</span>
            <span>{c.progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${c.progress}%`, background: 'var(--gradient-main)' }} />
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>📅 {c.scheduled}</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-secondary" style={{ padding: '5px 12px', fontSize: 11 }}>👁 View</button>
          <button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: 11 }}>📊 Analytics</button>
        </div>
      </div>
    </div>
  );
}

export default function Campaigns() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');

  const filters = ['all', 'active', 'completed', 'paused', 'draft'];
  const filtered = campaigns.filter(c =>
    (filter === 'all' || c.status === filter) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div className="animate-fadeIn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>Email <span className="gradient-text">Campaigns</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Manage, track, and optimize all your email campaigns</p>
        </div>
        <button className="btn btn-primary">＋ Create Campaign</button>
      </div>

      {/* Summary Strip */}
      <div className="animate-fadeIn" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Campaigns', value: campaigns.length, icon: '📧', color: '#8b5cf6' },
          { label: 'Active',     value: campaigns.filter(c => c.status === 'active').length,    icon: '🟢', color: '#10b981' },
          { label: 'Completed',  value: campaigns.filter(c => c.status === 'completed').length, icon: '✅', color: '#3b82f6' },
          { label: 'Draft',      value: campaigns.filter(c => c.status === 'draft').length,     icon: '📝', color: '#94a3b8' },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, minWidth: 120,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <span style={{ fontSize: 20 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="animate-fadeIn" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6, background: 'var(--bg-card)', padding: 4, borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              background: filter === f ? 'var(--gradient-main)' : 'transparent',
              color: filter === f ? 'white' : 'var(--text-muted)',
              transition: 'all 0.2s',
              textTransform: 'capitalize'
            }}>
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field"
          style={{ maxWidth: 240 }}
        />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {['grid', 'list'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              fontSize: 14,
              background: view === v ? 'var(--accent-purple)' : 'var(--bg-hover)',
              color: view === v ? 'white' : 'var(--text-muted)'
            }}>
              {v === 'grid' ? '⊞' : '≡'}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      <div style={{
        display: view === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        flexDirection: 'column',
        gap: 16
      }}>
        {filtered.map(c => <CampaignCard key={c.id} c={c} />)}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', gridColumn: '1/-1' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <p>No campaigns found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
