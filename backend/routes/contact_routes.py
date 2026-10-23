"""Contact API Routes"""
from flask import Blueprint, request, jsonify
from models.models import Contact, db

contact_bp = Blueprint('contacts', __name__)

@contact_bp.route('/', methods=['GET'])
def get_contacts():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    q = request.args.get('q', '')
    status = request.args.get('status')

    query = Contact.query
    if q:
        query = query.filter(
            (Contact.email.ilike(f'%{q}%')) |
            (Contact.first_name.ilike(f'%{q}%')) |
            (Contact.last_name.ilike(f'%{q}%'))
        )
    if status:
        query = query.filter_by(status=status)

    paginated = query.order_by(Contact.engagement_score.desc()).paginate(page=page, per_page=per_page, error_out=False)
    return jsonify({
        'contacts': [c.to_dict() for c in paginated.items],
        'total': paginated.total,
        'pages': paginated.pages,
    })

@contact_bp.route('/', methods=['POST'])
def create_contact():
    data = request.get_json()
    contact = Contact(
        user_id=data.get('user_id', 1),
        email=data['email'],
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        company=data.get('company'),
    )
    db.session.add(contact)
    db.session.commit()
    return jsonify(contact.to_dict()), 201

@contact_bp.route('/<int:cid>', methods=['DELETE'])
def delete_contact(cid):
    contact = Contact.query.get_or_404(cid)
    db.session.delete(contact)
    db.session.commit()
    return jsonify({'message': 'Contact deleted'})

@contact_bp.route('/import', methods=['POST'])
def import_contacts():
    """Bulk import contacts from CSV data"""
    data = request.get_json()
    contacts_data = data.get('contacts', [])
    created = 0
    for row in contacts_data:
        if not Contact.query.filter_by(email=row.get('email')).first():
            contact = Contact(
                user_id=data.get('user_id', 1),
                email=row['email'],
                first_name=row.get('first_name'),
                last_name=row.get('last_name'),
                company=row.get('company'),
            )
            db.session.add(contact)
            created += 1
    db.session.commit()
    return jsonify({'created': created, 'total': len(contacts_data)})
