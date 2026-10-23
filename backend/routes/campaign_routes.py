"""Campaign API Routes"""
from flask import Blueprint, request, jsonify
from models.models import Campaign, db
from datetime import datetime

campaign_bp = Blueprint('campaigns', __name__)

@campaign_bp.route('/', methods=['GET'])
def get_campaigns():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    status = request.args.get('status')
    q = request.args.get('q', '')

    query = Campaign.query
    if status:
        query = query.filter_by(status=status)
    if q:
        query = query.filter(Campaign.name.ilike(f'%{q}%'))

    paginated = query.order_by(Campaign.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'campaigns': [c.to_dict() for c in paginated.items],
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page
    })

@campaign_bp.route('/<int:cid>', methods=['GET'])
def get_campaign(cid):
    c = Campaign.query.get_or_404(cid)
    return jsonify(c.to_dict())

@campaign_bp.route('/', methods=['POST'])
def create_campaign():
    data = request.get_json()
    campaign = Campaign(
        user_id=data.get('user_id', 1),
        name=data['name'],
        subject=data['subject'],
        body=data.get('body', ''),
        status=data.get('status', 'draft'),
        scheduled_at=datetime.fromisoformat(data['scheduled_at']) if data.get('scheduled_at') else None
    )
    db.session.add(campaign)
    db.session.commit()
    return jsonify(campaign.to_dict()), 201

@campaign_bp.route('/<int:cid>', methods=['PUT'])
def update_campaign(cid):
    c = Campaign.query.get_or_404(cid)
    data = request.get_json()
    for field in ['name', 'subject', 'body', 'status']:
        if field in data:
            setattr(c, field, data[field])
    c.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify(c.to_dict())

@campaign_bp.route('/<int:cid>', methods=['DELETE'])
def delete_campaign(cid):
    c = Campaign.query.get_or_404(cid)
    db.session.delete(c)
    db.session.commit()
    return jsonify({'message': 'Campaign deleted successfully'})

@campaign_bp.route('/<int:cid>/stats', methods=['GET'])
def campaign_stats(cid):
    c = Campaign.query.get_or_404(cid)
    return jsonify({
        'campaign_id': cid,
        'name': c.name,
        'total_sent': c.total_sent,
        'total_opened': c.total_opened,
        'total_clicked': c.total_clicked,
        'total_bounced': c.total_bounced,
        'open_rate': c.open_rate,
        'click_rate': c.click_rate,
        'bounce_rate': c.bounce_rate,
    })
