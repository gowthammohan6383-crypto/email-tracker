"""Analytics API Routes"""
from flask import Blueprint, request, jsonify
from models.models import Campaign, EmailEvent, Contact, db
from sqlalchemy import func
from datetime import datetime, timedelta

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/overview', methods=['GET'])
def overview():
    """Dashboard overview metrics"""
    total_sent    = db.session.query(func.sum(Campaign.total_sent)).scalar() or 0
    total_opened  = db.session.query(func.sum(Campaign.total_opened)).scalar() or 0
    total_clicked = db.session.query(func.sum(Campaign.total_clicked)).scalar() or 0
    total_bounced = db.session.query(func.sum(Campaign.total_bounced)).scalar() or 0
    total_campaigns = Campaign.query.count()
    total_contacts  = Contact.query.count()

    open_rate   = round(total_opened  / total_sent * 100, 2) if total_sent > 0 else 0
    click_rate  = round(total_clicked / total_sent * 100, 2) if total_sent > 0 else 0
    bounce_rate = round(total_bounced / total_sent * 100, 2) if total_sent > 0 else 0

    return jsonify({
        'total_sent': total_sent,
        'total_opened': total_opened,
        'total_clicked': total_clicked,
        'total_bounced': total_bounced,
        'open_rate': open_rate,
        'click_rate': click_rate,
        'bounce_rate': bounce_rate,
        'total_campaigns': total_campaigns,
        'total_contacts': total_contacts,
    })

@analytics_bp.route('/daily', methods=['GET'])
def daily_stats():
    """Daily email event counts for the last N days"""
    days = request.args.get('days', 7, type=int)
    start = datetime.utcnow() - timedelta(days=days)

    events = (
        db.session.query(
            func.date(EmailEvent.occurred_at).label('date'),
            EmailEvent.event_type,
            func.count(EmailEvent.id).label('count')
        )
        .filter(EmailEvent.occurred_at >= start)
        .group_by(func.date(EmailEvent.occurred_at), EmailEvent.event_type)
        .all()
    )

    result = {}
    for row in events:
        date_str = str(row.date)
        if date_str not in result:
            result[date_str] = {'date': date_str, 'sent': 0, 'opened': 0, 'clicked': 0, 'bounced': 0}
        result[date_str][row.event_type] = row.count

    return jsonify({'data': list(result.values()), 'days': days})

@analytics_bp.route('/device-breakdown', methods=['GET'])
def device_breakdown():
    """Email opens by device type"""
    results = (
        db.session.query(EmailEvent.device_type, func.count(EmailEvent.id).label('count'))
        .filter(EmailEvent.event_type == 'opened')
        .group_by(EmailEvent.device_type)
        .all()
    )
    total = sum(r.count for r in results) or 1
    return jsonify({
        'breakdown': [
            {'device': r.device_type or 'Unknown', 'count': r.count, 'percentage': round(r.count / total * 100, 1)}
            for r in results
        ]
    })

@analytics_bp.route('/geo', methods=['GET'])
def geo_stats():
    """Opens by country"""
    results = (
        db.session.query(EmailEvent.country, func.count(EmailEvent.id).label('count'))
        .filter(EmailEvent.event_type == 'opened', EmailEvent.country.isnot(None))
        .group_by(EmailEvent.country)
        .order_by(func.count(EmailEvent.id).desc())
        .limit(10)
        .all()
    )
    return jsonify({'geo_data': [{'country': r.country, 'opens': r.count} for r in results]})

@analytics_bp.route('/best-send-times', methods=['GET'])
def best_send_times():
    """Analyze best hours to send emails"""
    results = (
        db.session.query(
            func.strftime('%H', EmailEvent.occurred_at).label('hour'),
            func.count(EmailEvent.id).label('count')
        )
        .filter(EmailEvent.event_type == 'opened')
        .group_by(func.strftime('%H', EmailEvent.occurred_at))
        .order_by('hour')
        .all()
    )
    return jsonify({
        'hourly_opens': [{'hour': int(r.hour), 'opens': r.count} for r in results]
    })
