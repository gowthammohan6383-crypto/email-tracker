import React, { useState } from 'react';

const contactsData = [
  { id: 1, name: 'Priya Sharma',    email: 'priya@example.com',   company: 'TechCorp India', tags: ['VIP','Buyer'], opens: 48, clicks: 22, score: 94, status: 'active',   lastActive: '2h ago' },
  { id: 2, name: 'Raj Kumar',       email: 'raj.k@startup.io',    company: 'Startup.io',     tags: ['Lead'],        opens: 31, clicks: 8,  score: 71, status: 'active',   lastActive: '1d ago' },
  { id: 3, name: 'Emma Johnson',    email: 'emma@retail.com',     company: 'Retail Co.',     tags: ['Subscriber'],  opens: 15, clicks: 2,  score: 42, status: 'at-risk',  lastActive: '12d ago' },
  { id: 4, name: 'Carlos Ruiz',     email: 'carlos@agency.es',    company: 'Agency ES',      tags: ['Partner'],     opens: 62, clicks: 34, score: 98, status: 'active',   lastActive: '30m ago' },
  { id: 5, name: 'Aisha Al-Farsi',  email: 'aisha@globalb.ae',    company: 'Global Brands',  tags: ['VIP','Lead'],  opens: 55, clicks: 28, score: 91, status: 'active',   lastActive: '3h ago' },
  { id: 6, name: 'Tom Williams',    email: 'tom.w@corp.co.uk',    company: 'Corp UK',        tags: ['Cold'],        opens: 4,  clicks: 0,  score: 18, status: 'churned',  lastActive: '45d ago' },
  { id: 7, name: 'Mei Zhang',       email: 'mei@technology.cn',   company: 'Tech CN',        tags: ['Buyer'],       opens: 39, clicks: 15, score: 76, status: 'active',   lastActive: '6h ago' },
  { id: 8, name: 'Ananya Krishnan', email: 'ananya@softlab.in',   company: 'SoftLab',        tags: ['VIP'],         opens: 71, clicks: 45, score: 99, status: 'active',   lastActive: '10m ago' },
];

const scoreColor = (s) => s >= 80 ? '#10b981' : s >= 50 ? '#f59e0b' : '#ef4444';

export default function Contacts() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  const filtered = contactsData
    .filter(c => (filterStatus === 'all' || c.status === filterStatus) && (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
    ))
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'opens') return b.opens - a.opens;
      if (sortBy === 'name')  return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div className="animate-fadeIn" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>Contact <span className="gradient-text">Intelligence</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>AI-scored subscriber profiles & engagement analytics</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" style={{ fontSize: 12 }}>⬆️ Import CSV</button>
          <button className="btn btn-primary" style={{ fontSize: 12 }}>＋ Add Contact</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
        {[
          { label: 'Total Contacts', value: contactsData.length, icon: '👥', color: '#8b5cf6' },
          { label: 'Active',         value: contactsData.filter(c => c.status === 'active').length,  icon: '🟢', color: '#10b981' },
          { label: 'At Risk',        value: contactsData.filter(c => c.status === 'at-risk').length, icon: '⚠️', color: '#f59e0b' },
          { label: 'Churned',        value: contactsData.filter(c => c.status === 'churned').length, icon: '🔴', color: '#ef4444' },
          { label: 'Avg AI Score',   value: Math.round(contactsData.reduce((a, c) => a + c.score, 0) / contactsData.length), icon: '🎯', color: '#06b6d4' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="animate-fadeIn" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <input type="text" placeholder="🔍 Search contacts..." value={search} onChange={e => setSearch(e.target.value)} className="input-field" style={{ maxWidth: 260 }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'active', 'at-risk', 'churned'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)',
              cursor: 'pointer', fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
              background: filterStatus === s ? 'var(--gradient-main)' : 'var(--bg-hover)',
              color: filterStatus === s ? 'white' : 'var(--text-muted)'
            }}>{s}</button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sort by:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
            padding: '6px 12px', background: 'var(--bg-hover)', border: '1px solid var(--border-color)',
            borderRadius: 8, color: 'var(--text-primary)', fontSize: 12, cursor: 'pointer', outline: 'none'
          }}>
            <option value="score">AI Score</option>
            <option value="opens">Opens</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="card animate-fadeIn" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Company</th>
                <th>Tags</th>
                <th>Opens</th>
                <th>Clicks</th>
                <th>AI Score</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34,
                        background: `hsl(${c.id * 47 % 360}, 70%, 45%)`,
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0
                      }}>
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{c.company}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {c.tags.map(t => (
                        <span key={t} className={`badge badge-${t === 'VIP' ? 'purple' : t === 'Buyer' ? 'success' : t === 'Lead' ? 'info' : 'warning'}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{c.opens}</td>
                  <td style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{c.clicks}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 50 }}>
                        <div className="progress-fill" style={{ width: `${c.score}%`, background: scoreColor(c.score) }} />
                      </div>
                      <span style={{ fontWeight: 700, color: scoreColor(c.score), fontSize: 13 }}>{c.score}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${c.status === 'active' ? 'success' : c.status === 'at-risk' ? 'warning' : 'danger'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.lastActive}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: 11 }}>✉</button>
                      <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: 11 }}>👁</button>
                    </div>
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
