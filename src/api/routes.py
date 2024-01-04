
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(api)
jwt = JWTManager(app)

@api.route('/signup', methods=['POST'])

def create_one_user():    
    email = request.json.get('email')
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already exists.'}), 409
    
    body = request.json
    raw_password = request.json.get('password')
    password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')
    new_user = User(
        first_name  = body["first_name"],
        last_name  = body["last_name"],
        date_of_birth = body["date_of_birth"],
        email = body["email"],
        pathologies = body["pathologies"],
        password = password_hash
        )
    db.session.add(new_user)
    db.session.commit()

    ok_to_share = {
        "first_name" : body["first_name"],
        "last_name" : body["last_name"],
        "date_of_birth" : body["date_of_birth"],
        "email" : body["email"],
        "pathologies" : body["pathologies"],
        "password" : body["password"]
        }

    return jsonify({"msg": "success", "user_added": ok_to_share }), 200

@api.route("/login", methods=["POST"])

def login():
    
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password: 
        return jsonify({"msg": "Bad email or password"}), 401

    existing_user = User.query.filter_by(email=email).first()
    if not existing_user: 
        return jsonify({"msg":"Email not found"})
    
    password_db = existing_user.password

    true_or_false = bcrypt.check_password_hash(password_db, password)

    if not true_or_false:
        return jsonify({"msg": "Wrong password"}),400

    user_id = existing_user.id    

    access_token = create_access_token(identity=user_id)
    return jsonify({"access_token":access_token, "msg": "Success" }),200

@api.route('/user/<int:id>')
def get_user_by_id(id):
    user = User.query.get(id)
    
    if user:
        return jsonify({
            'id': user.id, 
            'email': user.email, 
            'first name': user.first_name, 
            'last name': user.last_name,
            'date of birth': user.date_of_birth,
            'pathologies' : user.pathologies
        }), 200
    else: 
        return jsonify({'error': 'User not found'})

@api.route('/users', methods=['GET'])
def show_users():    
    users = User.query.all()
    if users:
        user_list = [{'id': user.id, 
                'email': user.email, 
                'first name': user.first_name, 
                'last name': user.last_name,
                'date of birth': user.date_of_birth,
                'pathologies' : user.pathologies 
        } for user in users]
        return jsonify(user_list), 200
    else:
        return jsonify({'error': 'No se encontro usuarios'}), 400
    
@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user_id(id):
    user = User.query.get_or_404(int(id))
    if user:
        db.session.delete(user)
        db.session.commit()        
        return jsonify({'message': 'User deleted'}), 200              
    else:
        return jsonify({'error': 'User not found to delete'}), 400