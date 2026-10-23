"""
Database Models for MailPulse Email Tracking System
"""

from datetime import datetime
from app import db


class User(db.Model):
    """Platform user / account"""
    __tablename__ = 'users'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(120), nullable=False)
    email       = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password    = db.Column(db.String(255), nullable=False)
    api_key     = db.Column(db.String(64), unique=True, index=True)
    plan        = db.Column(db.String(30), default='starter')   # starter | pro | enterprise
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)
    is_active   = db.Column(db.Boolean, default=True)

    campaigns   = db.relationship('Campaign', backref='owner', lazy='dynamic')
    contacts    = db.relationship('Contact',  backref='owner', lazy='dynamic')

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'email': self.email, 'plan': self.plan}


class Campaign(db.Model):
    """Email campaign model"""
    __tablename__ = 'campaigns'

    id           = db.Column(db.Integer, primary_key=True)
    user_id      = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name         = db.Column(db.String(200), nullable=False)
    subject      = db.Column(db.String(500), nullable=False)
    body         = db.Column(db.Text)
    status       = db.Column(db.String(30), default='draft')   # draft|scheduled|active|completed|paused
    scheduled_at = db.Column(db.DateTime)
    sent_at      = db.Column(db.DateTime)
    created_at   = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at   = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Stats (cached for performance)
    total_sent   = db.Column(db.Integer, default=0)
    total_opened = db.Column(db.Integer, default=0)
    total_clicked= db.Column(db.Integer, default=0)
    total_bounced= db.Column(db.Integer, default=0)
    total_unsub  = db.Column(db.Integer, default=0)

    # AI fields
    ai_sentiment       = db.Column(db.String(30))    # positive|neutral|negative
    ai_sentiment_score = db.Column(db.Float)
    ai_spam_score      = db.Column(db.Float)
    ai_open_prediction = db.Column(db.Float)

    events = db.relationship('EmailEvent', backref='campaign', lazy='dynamic')

    @property
    def open_rate(self):
        return round((self.total_opened / self.total_sent * 100), 2) if self.total_sent > 0 else 0

    @property
    def click_rate(self):
        return round((self.total_clicked / self.total_sent * 100), 2) if self.total_sent > 0 else 0

    @property
    def bounce_rate(self):
        return round((self.total_bounced / self.total_sent * 100), 2) if self.total_sent > 0 else 0

    def to_dict(self):
        return {
            'id': self.id, 'name': self.name, 'subject': self.subject,
            'status': self.status, 'total_sent': self.total_sent,
            'open_rate': self.open_rate, 'click_rate': self.click_rate,
            'bounce_rate': self.bounce_rate,
            'ai_sentiment': self.ai_sentiment,
            'ai_spam_score': self.ai_spam_score,
            'ai_open_prediction': self.ai_open_prediction,
            'scheduled_at': self.scheduled_at.isoformat() if self.scheduled_at else None,
            'created_at': self.created_at.isoformat(),
        }


class Contact(db.Model):
    """Subscriber / contact model"""
    __tablename__ = 'contacts'

    id            = db.Column(db.Integer, primary_key=True)
    user_id       = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    email         = db.Column(db.String(255), nullable=False, index=True)
    first_name    = db.Column(db.String(100))
    last_name     = db.Column(db.String(100))
    company       = db.Column(db.String(200))
    tags          = db.Column(db.Text)        # JSON array stored as string
    status        = db.Column(db.String(30), default='active')  # active|unsubscribed|bounced|at-risk
    created_at    = db.Column(db.DateTime, default=datetime.utcnow)
    last_opened   = db.Column(db.DateTime)
    last_clicked  = db.Column(db.DateTime)

    # AI scoring
    engagement_score = db.Column(db.Float, default=0.0)   # 0-100
    churn_risk       = db.Column(db.Float, default=0.0)   # 0-1 probability
    segment_label    = db.Column(db.String(50))            # VIP|Warm|Cold|At-Risk

    # Counters
    total_opens   = db.Column(db.Integer, default=0)
    total_clicks  = db.Column(db.Integer, default=0)

    events = db.relationship('EmailEvent', backref='contact', lazy='dynamic')

    @property
    def full_name(self):
        return f"{self.first_name or ''} {self.last_name or ''}".strip() or self.email

    def to_dict(self):
        return {
            'id': self.id, 'email': self.email,
            'name': self.full_name, 'company': self.company,
            'status': self.status, 'engagement_score': self.engagement_score,
            'churn_risk': self.churn_risk, 'segment_label': self.segment_label,
            'total_opens': self.total_opens, 'total_clicks': self.total_clicks,
            'last_opened': self.last_opened.isoformat() if self.last_opened else None,
        }


class EmailEvent(db.Model):
    """Tracks individual email events (open, click, bounce, unsubscribe)"""
    __tablename__ = 'email_events'

    id           = db.Column(db.Integer, primary_key=True)
    campaign_id  = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False, index=True)
    contact_id   = db.Column(db.Integer, db.ForeignKey('contacts.id'), index=True)
    event_type   = db.Column(db.String(30), nullable=False)  # sent|opened|clicked|bounced|unsubscribed
    occurred_at  = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    ip_address   = db.Column(db.String(45))
    user_agent   = db.Column(db.String(500))
    device_type  = db.Column(db.String(30))   # mobile|desktop|tablet
    country      = db.Column(db.String(3))    # ISO country code
    link_url     = db.Column(db.String(2000)) # For click events
    metadata     = db.Column(db.Text)         # JSON for extra data

    def to_dict(self):
        return {
            'id': self.id, 'campaign_id': self.campaign_id,
            'contact_id': self.contact_id, 'event_type': self.event_type,
            'occurred_at': self.occurred_at.isoformat(),
            'device_type': self.device_type, 'country': self.country,
        }


class TrackingPixel(db.Model):
    """1x1 invisible pixel for email open tracking"""
    __tablename__ = 'tracking_pixels'

    id          = db.Column(db.Integer, primary_key=True)
    token       = db.Column(db.String(64), unique=True, index=True, nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)
    contact_id  = db.Column(db.Integer, db.ForeignKey('contacts.id'))
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)
    opened_at   = db.Column(db.DateTime)
    open_count  = db.Column(db.Integer, default=0)


class AIAnalysis(db.Model):
    """Stores AI analysis results for campaigns"""
    __tablename__ = 'ai_analyses'

    id            = db.Column(db.Integer, primary_key=True)
    campaign_id   = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)
    analysis_type = db.Column(db.String(50))   # sentiment|spam|subject_optimize|churn
    result        = db.Column(db.Text)          # JSON result
    confidence    = db.Column(db.Float)
    model_version = db.Column(db.String(20))
    created_at    = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        import json
        return {
            'id': self.id, 'campaign_id': self.campaign_id,
            'analysis_type': self.analysis_type,
            'result': json.loads(self.result) if self.result else {},
            'confidence': self.confidence,
            'created_at': self.created_at.isoformat()
        }
