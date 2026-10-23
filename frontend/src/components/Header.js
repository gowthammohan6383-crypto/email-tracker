import React, { useState } from 'react';

export default function Header({ onMenuClick }) {
  const [searchVal, setSearchVal] = useState('');
  const now = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'rgba(9, 14, 29, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      {/* Menu Toggle */}
      <button
        onClick={onMenuClick}
        style={{
          background: 'var(--bg-hover)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)',
          width: 38, height: 38,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 16,
          flexShrink: 0,
          transition: 'all var(--transition-fast)'
        }}
        title="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Date */}
      <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap', display: 'none', display: window.innerWidth > 768 ? 'block' : 'none' }}>
        {now}
      </span>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 400 }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--text-muted)' }}>🔍</span>
          <input
            type="text"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Search campaigns, contacts..."
            style={{
              width: '100%',
              padding: '9px 14px 9px 36px',
              background: 'var(--bg-hover)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              fontSize: 13,
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-purple)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* AI Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: 'var(--radius-full)',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--accent-purple)'
        }}>
          <span className="animate-pulse" style={{ width: 6, height: 6, background: 'var(--accent-purple)', borderRadius: '50%', display: 'inline-block' }} />
          AI Active
        </div>

        {/* Notifications */}
        <button style={{
          background: 'var(--bg-hover)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)',
          width: 38, height: 38,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 16,
          position: 'relative'
        }}>
          🔔
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 8, height: 8,
            background: 'var(--accent-pink)',
            borderRadius: '50%',
            border: '2px solid var(--bg-primary)'
          }} />
        </button>

        {/* New Campaign Button */}
        <button
          className="btn btn-primary"
          style={{ fontSize: 13 }}
          onClick={() => alert('New Campaign modal would open here!')}
        >
          ＋ New Campaign
        </button>
      </div>
    </header>
  );
}
