import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  {
    group: 'Main',
    items: [
      { path: '/',           icon: '⚡', label: 'Dashboard' },
      { path: '/campaigns',  icon: '📧', label: 'Campaigns' },
      { path: '/analytics',  icon: '📊', label: 'Analytics' },
    ]
  },
  {
    group: 'Intelligence',
    items: [
      { path: '/ai-insights', icon: '🧠', label: 'AI Insights' },
      { path: '/contacts',    icon: '👥', label: 'Contacts' },
    ]
  },
  {
    group: 'System',
    items: [
      { path: '/settings', icon: '⚙️', label: 'Settings' },
    ]
  }
];

export default function Sidebar({ open }) {
  if (!open) return null;

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: 'rgba(9, 14, 29, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <div style={{
          width: 40, height: 40,
          background: 'var(--gradient-main)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          boxShadow: '0 0 20px rgba(139,92,246,0.5)',
          flexShrink: 0
        }}>
          📬
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            MailPulse
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            AI Email Tracker
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {navItems.map(group => (
          <div key={group.group}>
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              color: 'var(--text-muted)',
              padding: '0 8px',
              marginBottom: 8
            }}>
              {group.group}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {group.items.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'white' : 'var(--text-secondary)',
                    background: isActive ? 'var(--gradient-main)' : 'transparent',
                    boxShadow: isActive ? '0 4px 15px rgba(139,92,246,0.3)' : 'none',
                    transition: 'all var(--transition-fast)',
                  })}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}>
        <div style={{
          width: 36, height: 36,
          background: 'var(--gradient-warm)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          flexShrink: 0
        }}>
          👤
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Admin User
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            admin@mailpulse.io
          </div>
        </div>
        <div style={{ width: 8, height: 8, background: 'var(--accent-green)', borderRadius: '50%', flexShrink: 0 }} className="animate-pulse" />
      </div>
    </aside>
  );
}
