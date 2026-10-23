"""AI API Routes — exposes NLP/ML endpoints"""
from flask import Blueprint, request, jsonify
from ml.ai_service import (
    analyze_sentiment, calculate_spam_score,
    optimize_subject_line, predict_churn_risk,
    generate_smart_reply, segment_contacts
)

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/sentiment', methods=['POST'])
def sentiment():
    """Analyze sentiment of email text"""
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'text is required'}), 400
    result = analyze_sentiment(text)
    return jsonify({'success': True, 'result': result})

@ai_bp.route('/spam-score', methods=['POST'])
def spam_score():
    """Calculate spam score for subject + body"""
    data = request.get_json()
    subject = data.get('subject', '')
    body    = data.get('body', '')
    if not subject:
        return jsonify({'error': 'subject is required'}), 400
    result = calculate_spam_score(subject, body)
    return jsonify({'success': True, 'result': result})

@ai_bp.route('/optimize-subject', methods=['POST'])
def optimize_subject():
    """Generate subject line optimization suggestions"""
    data = request.get_json()
    subject = data.get('subject', '')
    if not subject:
        return jsonify({'error': 'subject is required'}), 400
    result = optimize_subject_line(subject)
    return jsonify({'success': True, 'result': result})

@ai_bp.route('/churn-prediction', methods=['POST'])
def churn_prediction():
    """Predict churn risk for a contact"""
    data = request.get_json()
    result = predict_churn_risk(data)
    return jsonify({'success': True, 'result': result})

@ai_bp.route('/smart-reply', methods=['POST'])
def smart_reply():
    """Generate smart reply suggestions"""
    data = request.get_json()
    email_body = data.get('email_body', '')
    if not email_body:
        return jsonify({'error': 'email_body is required'}), 400
    result = generate_smart_reply(email_body)
    return jsonify({'success': True, 'result': result})

@ai_bp.route('/segment-contacts', methods=['POST'])
def segment():
    """Segment a list of contacts by AI engagement score"""
    data = request.get_json()
    contacts = data.get('contacts', [])
    if not contacts:
        return jsonify({'error': 'contacts list is required'}), 400
    result = segment_contacts(contacts)
    return jsonify({'success': True, 'result': result})

@ai_bp.route('/analyze-campaign/<int:cid>', methods=['POST'])
def analyze_campaign(cid):
    """Run full AI analysis on a campaign"""
    from models.models import Campaign
    campaign = Campaign.query.get_or_404(cid)
    sentiment_result = analyze_sentiment(campaign.subject + ' ' + (campaign.body or ''))
    spam_result      = calculate_spam_score(campaign.subject, campaign.body or '')
    subject_result   = optimize_subject_line(campaign.subject)

    campaign.ai_sentiment       = sentiment_result['label']
    campaign.ai_sentiment_score = sentiment_result['polarity']
    campaign.ai_spam_score      = spam_result['score']
    campaign.ai_open_prediction = subject_result['predicted_open_rate']

    from app import db
    db.session.commit()

    return jsonify({
        'success': True,
        'campaign_id': cid,
        'sentiment':   sentiment_result,
        'spam':        spam_result,
        'subject_opt': subject_result,
    })
