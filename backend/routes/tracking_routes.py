"""Email Tracking Routes — pixel tracking & click tracking"""
import os
import base64
from flask import Blueprint, request, redirect, send_file, jsonify
from models.models import TrackingPixel, EmailEvent, Contact, Campaign, db
from datetime import datetime
from io import BytesIO

tracking_bp = Blueprint('tracking', __name__)

# 1x1 transparent GIF
TRANSPARENT_GIF = base64.b64decode(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
)

def detect_device(user_agent: str) -> str:
    ua = (user_agent or '').lower()
    if 'mobile' in ua or 'android' in ua or 'iphone' in ua:
        return 'mobile'
    elif 'tablet' in ua or 'ipad' in ua:
        return 'tablet'
    return 'desktop'

@tracking_bp.route('/open/<token>', methods=['GET'])
def track_open(token):
    """Serve 1x1 tracking pixel and record open event"""
    pixel = TrackingPixel.query.filter_by(token=token).first()
    if pixel:
        pixel.open_count += 1
        if not pixel.opened_at:
            pixel.opened_at = datetime.utcnow()

        # Record event
        event = EmailEvent(
            campaign_id=pixel.campaign_id,
            contact_id=pixel.contact_id,
            event_type='opened',
            occurred_at=datetime.utcnow(),
            ip_address=request.remote_addr,
            user_agent=request.headers.get('User-Agent', ''),
            device_type=detect_device(request.headers.get('User-Agent', '')),
        )
        db.session.add(event)

        # Update campaign stats
        campaign = Campaign.query.get(pixel.campaign_id)
        if campaign:
            campaign.total_opened += 1

        # Update contact
        if pixel.contact_id:
            contact = Contact.query.get(pixel.contact_id)
            if contact:
                contact.total_opens += 1
                contact.last_opened = datetime.utcnow()

        db.session.commit()

    # Return transparent 1x1 GIF (no-cache)
    response = send_file(
        BytesIO(TRANSPARENT_GIF),
        mimetype='image/gif',
    )
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma']         = 'no-cache'
    response.headers['Expires']        = '0'
    return response


@tracking_bp.route('/click/<token>', methods=['GET'])
def track_click(token):
    """Redirect user and record click event"""
    redirect_url = request.args.get('url', '/')
    campaign_id  = request.args.get('cid', type=int)
    contact_id   = request.args.get('uid', type=int)

    # Record event
    event = EmailEvent(
        campaign_id=campaign_id,
        contact_id=contact_id,
        event_type='clicked',
        occurred_at=datetime.utcnow(),
        ip_address=request.remote_addr,
        user_agent=request.headers.get('User-Agent', ''),
        device_type=detect_device(request.headers.get('User-Agent', '')),
        link_url=redirect_url,
    )
    db.session.add(event)

    if campaign_id:
        campaign = Campaign.query.get(campaign_id)
        if campaign:
            campaign.total_clicked += 1

    if contact_id:
        contact = Contact.query.get(contact_id)
        if contact:
            contact.total_clicks += 1
            contact.last_clicked = datetime.utcnow()

    db.session.commit()
    return redirect(redirect_url, code=302)


@tracking_bp.route('/unsubscribe/<token>', methods=['GET', 'POST'])
def unsubscribe(token):
    """Handle unsubscribe requests"""
    contact_id  = request.args.get('uid', type=int)
    campaign_id = request.args.get('cid', type=int)

    if contact_id:
        contact = Contact.query.get(contact_id)
        if contact:
            contact.status = 'unsubscribed'
            event = EmailEvent(
                campaign_id=campaign_id,
                contact_id=contact_id,
                event_type='unsubscribed',
                occurred_at=datetime.utcnow(),
            )
            db.session.add(event)
            if campaign_id:
                campaign = Campaign.query.get(campaign_id)
                if campaign:
                    campaign.total_unsub += 1
            db.session.commit()

    return jsonify({
        'success': True,
        'message': "You've been successfully unsubscribed. We're sorry to see you go!"
    })
