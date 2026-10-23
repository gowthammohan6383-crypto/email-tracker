"""
MailPulse - AI Email Tracking System
Flask Backend Application Entry Point
"""

import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()


def create_app(config_name=None):
    """Application factory pattern"""
    app = Flask(__name__)

    # ── Configuration ────────────────────────────────────────────────────────
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'mailpulse-secret-key-change-in-production')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'DATABASE_URL',
        'sqlite:///mailpulse.db'  # Default SQLite for development
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = os.getenv('DEBUG', 'false').lower() == 'true'

    # ── Extensions ────────────────────────────────────────────────────────────
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    jwt.init_app(app)

    # ── Register Blueprints ───────────────────────────────────────────────────
    from routes.auth_routes      import auth_bp
    from routes.campaign_routes  import campaign_bp
    from routes.analytics_routes import analytics_bp
    from routes.ai_routes        import ai_bp
    from routes.contact_routes   import contact_bp
    from routes.tracking_routes  import tracking_bp

    app.register_blueprint(auth_bp,      url_prefix='/api/auth')
    app.register_blueprint(campaign_bp,  url_prefix='/api/campaigns')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    app.register_blueprint(ai_bp,        url_prefix='/api/ai')
    app.register_blueprint(contact_bp,   url_prefix='/api/contacts')
    app.register_blueprint(tracking_bp,  url_prefix='/api/track')

    # ── Health Check ──────────────────────────────────────────────────────────
    @app.route('/api/health')
    def health():
        return {'status': 'ok', 'service': 'MailPulse API', 'version': '2.4.0'}

    # ── Create Tables ─────────────────────────────────────────────────────────
    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'true').lower() == 'true'
    print(f"🚀 MailPulse API starting on http://localhost:{port}")
    print(f"   Debug mode: {debug}")
    app.run(host='0.0.0.0', port=port, debug=debug)
