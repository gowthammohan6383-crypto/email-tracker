import React, { useState } from 'react';

const aiInsights = [
  {
    type: 'Sentiment Analysis',
    icon: '😊',
    gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
    summary: 'Overall Positive',
    score: 78,
    detail: 'Your latest campaign "Summer Sale 2026" received overwhelmingly positive responses. Subscribers expressed excitement about discount offers and urgency in subject lines.',
    tags: ['positive', 'excited', 'urgent'],
    tagColors: ['#10b981', '#f59e0b', '#8b5cf6'],
    recommendation: 'Continue using urgency triggers and emotional language — they drive 34% higher open rates for your audience.'
  },
  {
    type: 'Smart Reply Suggestions',
    icon: '💬',
    gradient: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
    summary: '3 Auto-Replies Ready',
    score: null,
    detail: 'AI detected 3 common reply patterns from subscribers. Smart templates have been generated to handle FAQs, unsubscribe requests, and pricing inquiries automatically.',
    tags: ['FAQ response', 'Unsubscribe flow', 'Pricing inquiry'],
    tagColors: ['#3b82f6', '#ef4444', '#f59e0b'],
    recommendation: 'Enable smart auto-replies to save ~4.5 hours/week of manual responses. Expected customer satisfaction: +22%.'
  },
  {
    type: 'Priority Classification',
    icon: '🎯',
    gradient: 'linear-gradient(135deg,#10b981,#3b82f6)',
    summary: 'High-Value Segment Found',
    score: 92,
    detail: 'NLP model classified 1,247 contacts as "High Intent Buyers" based on click patterns, reply content, and engagement history. These contacts have a 4.2x higher conversion likelihood.',
    tags: ['high-intent', 'warm leads', 'purchase-ready'],
    tagColors: ['#10b981', '#f59e0b', '#8b5cf6'],
    recommendation: 'Send a personalized offer to this segment within 24 hours to maximize conversion while intent is high.'
  },
  {
    type: 'Spam Risk Detection',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg,#ef4444,#f59e0b)',
    summary: '2 Emails at Risk',
    score: 23,
    detail: 'AI detected spam trigger words in 2 scheduled emails: "FREE!!!" and "CLICK NOW". These phrases have a 67% chance of landing in spam folders, especially with Gmail and Outlook.',
    tags: ['FREE!!!', 'CLICK NOW', 'spam trigger'],
    tagColors: ['#ef4444', '#ef4444', '#f59e0b'],
    recommendation: 'Replace flagged words with conversational alternatives. "Complimentary" instead of "FREE", "Explore here" instead of "CLICK NOW".'
  },
  {
    type: 'Subject Line Optimizer',
    icon: '✨',
    gradient: 'linear-gradient(135deg,#f59e0b,#ec4899)',
    summary: '+18% Open Rate Potential',
    score: 85,
    detail: 'AI analyzed 500+ subject lines from your top campaigns. Personalized subjects with the recipient\'s first name + a question format perform best for your list.',
    tags: ['personalization', 'question format', 'A/B test'],
    tagColors: ['#8b5cf6', '#3b82f6', '#10b981'],
    recommendation: 'A/B test: "Hey {FirstName}, is this on your list? 🎁" vs current subject. Projected uplift: +18% opens.'
  },
  {
    type: 'Churn Prediction',
    icon: '⚠️',
    gradient: 'linear-gradient(135deg,#8b5cf6,#ef4444)',
    summary: '342 At-Risk Subscribers',
    score: 31,
    detail: 'ML model predicts 342 subscribers are likely to unsubscribe in the next 30 days based on declining engagement trends, longer gap between opens, and reduced click velocity.',
    tags: ['at-risk', 'declining engagement', 're-engage needed'],
    tagColors: ['#ef4444', '#f59e0b', '#3b82f6'],
    recommendation: 'Launch a "Win-Back" campaign with exclusive 25% discount. Historical win-back rate for this segment: 31%.'
  },
];

function ScoreRing({ score, gradient }) {
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  return (
    <svg width={70} height={70} viewBox="0 0 70 70">
      <circle cx={35} cy={35} r={28} fill="none" stroke="var(--bg-hover)" strokeWidth={6} />
      <circle
        cx={35} cy={35} r={28} fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={6}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 35 35)"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <text x={35} y={39} textAnchor="middle" fontSize={13} fontWeight="800" fill="var(--text-primary)">{score}</text>
    </svg>
  );
}

export default function AIInsights() {
  const [activeCard, setActiveCard] = useState(null);
  const [running, setRunning] = useState(false);

  const handleRunAnalysis = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div className="animate-fadeIn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>
            🧠 AI & NLP <span className="gradient-text">Insights</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            Machine learning-powered analysis of your email campaigns
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className={`btn btn-primary ${running ? 'animate-pulse' : ''}`}
            onClick={handleRunAnalysis}
            style={{ minWidth: 160 }}
          >
            {running ? (
              <><span className="animate-spin" style={{ display: 'inline-block' }}>⚙️</span> Analyzing...</>
            ) : (
              <><span>🔬</span> Run Full Analysis</>
            )}
          </button>
        </div>
      </div>

      {/* AI Model Status Bar */}
      <div className="card animate-fadeIn" style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05))',
        border: '1px solid rgba(139,92,246,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40,
            background: 'var(--gradient-main)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18
          }} className="animate-float">
            🤖
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>MailPulse AI Engine v2.4</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>NLP • Sentiment • Prediction Models Active</div>
          </div>
        </div>
        <div style={{ height: 1, background: 'var(--border-color)', flex: '0 0 1px', alignSelf: 'stretch' }} />
        {[
          { label: 'Emails Analyzed', value: '36,470' },
          { label: 'Model Accuracy', value: '94.2%' },
          { label: 'Last Updated', value: '2 min ago' },
          { label: 'Active Models', value: '6' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-purple)' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Insight Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {aiInsights.map((insight, i) => (
          <div
            key={i}
            className="card animate-fadeIn"
            style={{
              animationDelay: `${i * 80}ms`,
              cursor: 'pointer',
              border: activeCard === i ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
              boxShadow: activeCard === i ? 'var(--shadow-purple)' : 'none',
              transition: 'all 0.25s'
            }}
            onClick={() => setActiveCard(activeCard === i ? null : i)}
          >
            {/* Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40,
                  background: insight.gradient,
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18
                }}>
                  {insight.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{insight.type}</div>
                  <div style={{ fontSize: 12, color: 'var(--accent-cyan)', fontWeight: 600 }}>{insight.summary}</div>
                </div>
              </div>
              {insight.score !== null && <ScoreRing score={insight.score} gradient={insight.gradient} />}
            </div>

            {/* Detail */}
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
              {insight.detail}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {insight.tags.map((tag, j) => (
                <span key={j} style={{
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 11,
                  fontWeight: 600,
                  background: `${insight.tagColors[j]}20`,
                  color: insight.tagColors[j],
                  border: `1px solid ${insight.tagColors[j]}40`
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Recommendation */}
            {activeCard === i && (
              <div style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: 8,
                padding: '10px 12px',
                marginBottom: 10
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--accent-purple)', marginBottom: 4 }}>
                  🎯 AI Recommendation
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{insight.recommendation}</p>
              </div>
            )}

            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}>
              {activeCard === i ? '▲ Less Details' : '▼ View Recommendation'}
            </button>
          </div>
        ))}
      </div>

      {/* NLP Live Demo */}
      <div className="card animate-fadeIn">
        <h2 style={{ fontSize: 16, marginBottom: 4 }}>🔬 Live Sentiment Analyzer</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
          Paste any email subject or body to analyze sentiment in real-time
        </p>
        <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
          <textarea
            placeholder="Paste your email subject line or preview text here..."
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'var(--bg-hover)',
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              color: 'var(--text-primary)',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              resize: 'vertical',
              minHeight: 80,
              outline: 'none'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-purple)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
          />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ fontSize: 13 }}>
              🧠 Analyze Sentiment
            </button>
            <button className="btn btn-secondary" style={{ fontSize: 13 }}>
              ✨ Optimize Subject Line
            </button>
            <button className="btn btn-secondary" style={{ fontSize: 13 }}>
              🛡️ Check Spam Score
            </button>
          </div>
          {/* Demo result */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 12,
            marginTop: 4
          }}>
            {[
              { label: 'Sentiment', value: '😊 Positive', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
              { label: 'Tone', value: 'Excited', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
              { label: 'Spam Score', value: '12/100', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
              { label: 'Open Prediction', value: '~48%', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
            ].map(m => (
              <div key={m.label} style={{
                background: m.bg,
                border: `1px solid ${m.color}40`,
                borderRadius: 10,
                padding: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
