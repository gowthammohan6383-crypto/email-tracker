import React, { useState } from 'react';

export default function Settings() {
  const [apiKey, setApiKey] = useState('mp_live_••••••••••••••••••••••••••••••');
  const [smtpHost, setSmtpHost] = useState('smtp.mailpulse.io');
  const [smtpPort, setSmtpPort] = useState('587');
  const [fromName, setFromName] = useState('MailPulse Marketing');
  const [fromEmail, setFromEmail] = useState('noreply@mailpulse.io');
  const [aiEnabled, setAiEnabled] = useState(true);
  const [spamCheck, setSpamCheck] = useState(true);
  const [sentimentAnalysis, setSentimentAnalysis] = useState(true);
  const [smartReplies, setSmartReplies] = useState(false);
  const [churnPrediction, setChurnPrediction] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [slackNotifs, setSlackNotifs] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange, label, description }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border-color)' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2 }}>{label}</div>
        {description && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{description}</div>}
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 48, height: 26,
          background: value ? 'var(--gradient-main)' : 'var(--bg-hover)',
          border: '1px solid var(--border-color)',
          borderRadius: 13,
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.25s',
          flexShrink: 0
        }}
      >
        <span style={{
          position: 'absolute',
          top: 3, left: value ? 24 : 3,
          width: 18, height: 18,
          background: 'white',
          borderRadius: '50%',
          transition: 'left 0.25s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
        }} />
      </button>
    </div>
  );

  const Section = ({ icon, title, children }) => (
    <div className="card animate-fadeIn" style={{ marginBottom: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{
          width: 36, height: 36,
          background: 'var(--gradient-main)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16
        }}>{icon}</div>
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
      {/* Header */}
      <div className="animate-fadeIn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>System <span className="gradient-text">Settings</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Configure API, SMTP, AI models, and notifications</p>
        </div>
        <button className={`btn btn-primary`} onClick={handleSave} style={{ minWidth: 120 }}>
          {saved ? '✅ Saved!' : '💾 Save All'}
        </button>
      </div>

      {/* API Keys */}
      <Section icon="🔑" title="API Configuration">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="input-group">
            <label className="input-label">MailPulse API Key</label>
            <div style={{ position: 'relative' }}>
              <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className="input-field" style={{ width: '100%', fontFamily: 'monospace', paddingRight: 80 }} />
              <button style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: 'var(--text-muted)', cursor: 'pointer' }}>
                Reveal
              </button>
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Webhook URL (for real-time events)</label>
            <input type="url" value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} placeholder="https://your-server.com/webhook" className="input-field" />
          </div>
          <button className="btn btn-secondary" style={{ alignSelf: 'flex-start', fontSize: 12 }}>🔄 Regenerate API Key</button>
        </div>
      </Section>

      {/* SMTP */}
      <Section icon="📮" title="SMTP / Email Delivery">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 12, marginBottom: 14 }}>
          <div className="input-group">
            <label className="input-label">SMTP Host</label>
            <input type="text" value={smtpHost} onChange={e => setSmtpHost(e.target.value)} className="input-field" />
          </div>
          <div className="input-group">
            <label className="input-label">Port</label>
            <input type="number" value={smtpPort} onChange={e => setSmtpPort(e.target.value)} className="input-field" />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="input-group">
            <label className="input-label">From Name</label>
            <input type="text" value={fromName} onChange={e => setFromName(e.target.value)} className="input-field" />
          </div>
          <div className="input-group">
            <label className="input-label">From Email</label>
            <input type="email" value={fromEmail} onChange={e => setFromEmail(e.target.value)} className="input-field" />
          </div>
        </div>
        <button className="btn btn-secondary" style={{ marginTop: 14, fontSize: 12 }}>🧪 Send Test Email</button>
      </Section>

      {/* AI / NLP */}
      <Section icon="🧠" title="AI & NLP Engine">
        <Toggle value={aiEnabled} onChange={setAiEnabled} label="AI Engine" description="Enable all AI-powered analytics and predictions" />
        <Toggle value={spamCheck} onChange={setSpamCheck} label="Spam Score Checker" description="Automatically scan emails for spam trigger words before sending" />
        <Toggle value={sentimentAnalysis} onChange={setSentimentAnalysis} label="Sentiment Analysis" description="Analyze subscriber replies and feedback sentiment in real-time" />
        <Toggle value={smartReplies} onChange={setSmartReplies} label="Smart Auto-Replies" description="AI-generated reply suggestions for common subscriber messages" />
        <Toggle value={churnPrediction} onChange={setChurnPrediction} label="Churn Prediction" description="Predict which subscribers are likely to unsubscribe in the next 30 days" />
        <div style={{ marginTop: 14, padding: '12px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: 'var(--accent-purple)', fontWeight: 700, marginBottom: 4 }}>🤖 AI Model: MailPulse NLP v2.4</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Powered by TextBlob + scikit-learn + Transformers (BERT-base). Last retrained: 2026-10-20</div>
        </div>
      </Section>

      {/* Notifications */}
      <Section icon="🔔" title="Notifications">
        <Toggle value={emailNotifs} onChange={setEmailNotifs} label="Email Notifications" description="Receive campaign reports and alerts via email" />
        <Toggle value={slackNotifs} onChange={setSlackNotifs} label="Slack Integration" description="Post campaign results and alerts to a Slack channel" />
        {slackNotifs && (
          <div className="input-group" style={{ marginTop: 10 }}>
            <label className="input-label">Slack Webhook URL</label>
            <input type="url" placeholder="https://hooks.slack.com/services/..." className="input-field" />
          </div>
        )}
      </Section>

      {/* Danger Zone */}
      <div className="card animate-fadeIn" style={{ border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, background: 'rgba(239,68,68,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚠️</div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-red)' }}>Danger Zone</h2>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-danger" style={{ fontSize: 12 }}>🗑️ Clear All Analytics Data</button>
          <button className="btn btn-danger" style={{ fontSize: 12 }}>💀 Delete All Campaigns</button>
          <button className="btn btn-danger" style={{ fontSize: 12 }}>🔥 Reset to Factory Defaults</button>
        </div>
      </div>
    </div>
  );
}
