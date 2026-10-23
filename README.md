# MailPulse — AI Email Tracking System

<div align="center">
  <h1>📬 MailPulse</h1>
  <p><strong>AI-Powered Marketing Email Tracking & Analytics Platform</strong></p>
  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" />
    <img src="https://img.shields.io/badge/Python-Flask-3776AB?logo=python&logoColor=white" />
    <img src="https://img.shields.io/badge/AI-NLP%20Engine-8B5CF6" />
    <img src="https://img.shields.io/badge/Database-SQLite%2FPostgres-4169E1?logo=postgresql" />
  </p>
</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Dashboard** | Real-time stats: open rates, click rates, conversions |
| 📧 **Campaign Manager** | Create, schedule, pause, and track email campaigns |
| 📈 **Deep Analytics** | Radar benchmarks, geo data, device breakdown, time-of-day analysis |
| 🧠 **AI/NLP Engine** | Sentiment analysis, spam scoring, subject line optimizer, churn prediction |
| 👥 **Contact Intelligence** | AI-scored subscriber profiles, segmentation, churn risk |
| ⚙️ **Settings** | SMTP config, API keys, AI model toggles, Slack integration |
| 🔍 **Pixel Tracking** | Invisible 1×1 GIF email open tracking |
| 🖱️ **Click Tracking** | Redirect-based link click tracking with geo + device info |

---

## 🏗️ Tech Stack

```
frontend/          ← React 18 + Recharts + React Router
backend/           ← Python Flask + SQLAlchemy + JWT
  ml/              ← TextBlob + scikit-learn + NLP models
  models/          ← SQLAlchemy ORM models
  routes/          ← REST API blueprints
```

---

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm start
# Opens http://localhost:3000
```

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
cp .env.example .env
python app.py
# API runs on http://localhost:5000
```

### Python NLTK Setup (first run)
```python
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
```

---

## 📡 API Endpoints

### Campaigns
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/campaigns/` | List all campaigns |
| POST   | `/api/campaigns/` | Create campaign |
| GET    | `/api/campaigns/{id}` | Get campaign |
| PUT    | `/api/campaigns/{id}` | Update campaign |
| DELETE | `/api/campaigns/{id}` | Delete campaign |
| GET    | `/api/campaigns/{id}/stats` | Campaign stats |

### AI/NLP
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/ai/sentiment` | Analyze email sentiment |
| POST   | `/api/ai/spam-score` | Calculate spam score |
| POST   | `/api/ai/optimize-subject` | Subject line suggestions |
| POST   | `/api/ai/churn-prediction` | Predict contact churn |
| POST   | `/api/ai/smart-reply` | Generate reply suggestions |
| POST   | `/api/ai/segment-contacts` | Segment contacts by AI score |

### Tracking
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/track/open/{token}` | 1×1 pixel open tracking |
| GET    | `/api/track/click/{token}` | Click redirect tracking |
| GET    | `/api/track/unsubscribe/{token}` | Unsubscribe handler |

---

## 🗄️ Database Schema

```
users          → Platform accounts
campaigns      → Email campaigns with AI fields
contacts       → Subscribers with AI scores
email_events   → Open/Click/Bounce event log
tracking_pixels→ Unique tokens per email
ai_analyses    → Stored AI analysis results
```

---

## 🤖 AI Models

- **Sentiment Analysis** — TextBlob polarity scoring (positive/neutral/negative)
- **Spam Detection** — Rule-based + TF-IDF keyword scoring
- **Subject Optimizer** — NLP heuristic + personalization rules
- **Churn Prediction** — Engagement decay model (recency + frequency)
- **Smart Replies** — Intent classification → template generation
- **Contact Segmentation** — Scoring-based: VIP / Active / At-Risk / Cold

---

## 📁 Project Structure

```
email-tracker/
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   └── Header.js
│   │   └── pages/
│   │       ├── Dashboard.js
│   │       ├── Campaigns.js
│   │       ├── Analytics.js
│   │       ├── AIInsights.js
│   │       ├── Contacts.js
│   │       └── Settings.js
│   └── package.json
└── backend/
    ├── app.py
    ├── requirements.txt
    ├── .env.example
    ├── models/models.py
    ├── routes/
    │   ├── auth_routes.py
    │   ├── campaign_routes.py
    │   ├── analytics_routes.py
    │   ├── ai_routes.py
    │   ├── contact_routes.py
    │   └── tracking_routes.py
    └── ml/ai_service.py
```

---

## 📄 License
MIT License — Free to use, modify, and distribute.
