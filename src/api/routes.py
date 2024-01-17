"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import resend
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Trainer, Routines, Diets, Admins
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_mail import Mail




api = Blueprint('api', __name__)
app = Flask(__name__)


# configuro la api de correos utilzada para alertar al usuario
app.config['MAIL_SERVER'] = 'smtp.resend.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'resend'
app.config['MAIL_PASSWORD'] = 're_GeRFSVeg_Jx373tv4jpEfRr2j6gbT3aVw'

app.config['RESEND_API_KEY'] = os.environ.get('RESEND_API_KEY', 're_GeRFSVeg_Jx373tv4jpEfRr2j6gbT3aVw')
mail = Mail(app)

# Allow CORS requests to this API

CORS(api)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

url_front = "https://cuddly-train-69g46jgrrpqq3r9pg-3000.app.github.dev/login"

#hacemos un llamado que lista todos los usuarios 
@api.route('/all', methods=['GET'])
@jwt_required()
def all():
    query = User.query.all()
    # con este bucle for devolcemos un array de objetos con los usuarios
    all_users = [{
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'id': user.id,
        'role': user.role,
        'create_at': user.create_at,
        'pay': user.pay
        

    } for user in query]


    if len(all_users) == 0 :
        
        return jsonify({'msg': 'no user in db'}), 200
    
    return jsonify(all_users), 200

# hacemos un llamado a la table diets para traer una dieta por el id
@api.route('/get/diet/<int:id_user>', methods=['GET'])
@jwt_required()
def get_diet(id_user):
    
    query_diet = Diets.query.filter_by(id_user = id_user).first()
    
    if not query_diet:
        return jsonify({'msg': 'this user not have diet assigned'}), 200
    
    return jsonify({
        'breakfast': query_diet.breakfast,
        'brunch': query_diet.brunch,
        'lunch': query_diet.lunch,
        'dinner': query_diet.dinner,
        'supper': query_diet.supper,
        'trainer_first_name': Trainer.query.filter_by(id = query_diet.id_trainer).first().first_name,
        'trainer_last_name': Trainer.query.filter_by(id = query_diet.id_trainer).first().last_name,
        'msg': 'success'

    }), 200

#hacemos un llamado a la tabla user para verificar que los datos del request body sean los correctos
@api.route('/get', methods=['POST'])
def get_payment_info():
    email = request.json.get('email')

    query_user = User.query.filter_by(email = email).first()

    admin_api = Admins.query.filter_by(role = "admin").first()

    if not query_user:
        return jsonify({'msg': 'this user not exist'}), 200
    
    return jsonify({
        'first_name': query_user.first_name,
        'last_name': query_user.last_name,
        'email': query_user.email,
        'client': admin_api.client_paypal,
        'secret': admin_api.secret_paypal,

    }), 200 #si todo esta correcto devolvemos  un objeto con las credenciales necesarias para hacer las transacciones de paypal

#hacemos un llamado a la table diets para traer una routine por el id
@api.route('/get/routine/<int:id_user>', methods=['GET'])
@jwt_required()
def get_routine(id_user):
    
    query_routine = Routines.query.filter_by(id_user = id_user).first()
    
    if not query_routine:
        return jsonify({'msg': 'this user not have routine assigned'}), 200
    
    return jsonify({
        'Chest': query_routine.Chest,
        'shoulders': query_routine.shoulders,
        'arms': query_routine.arms,
        'legs': query_routine.legs,
        'trainer_first_name': Trainer.query.filter_by(id = query_routine.id_trainer).first().first_name,
        'trainer_last_name': Trainer.query.filter_by(id = query_routine.id_trainer).first().last_name

    }), 200

# hacemos un llamado a la tabla user
@api.route('/get/pay/<string:email>', methods=['GET'])
def get_payment_id(email):
    
    query_payment = User.query.filter_by(email = email).first()
    
    if not query_payment:
        return jsonify({'msg': ' id payment not exist'}), 200
    
    if query_payment.pay == 'success':
        return jsonify({ 'msg': 'success' }), 200 # devolvemos success si el pago del usuario fue comprobado por paypal
  
    return jsonify({'msg': 'payment not success yet'}), 200

#hacemos un llamado a la tabla trainer para listarlos
@api.route('/all/trainers')
@jwt_required()
def all_trainers():
    query = Trainer.query.all()
    all_trainers = [{
        'first_name': trainer.first_name,
        'last_name': trainer.last_name,
        'email': trainer.email,
        'id': trainer.id,
        'role': trainer.role,
        'create_at': trainer.create_at    

    } for trainer in query]

    if len(all_trainers) == 0:
        return jsonify({'msg': 'no trainers in db :('}), 200
    
    return jsonify(all_trainers), 200

# hacemos llamado a la tabla user para registrar un usuario nuevo
@api.route('/signup', methods=['POST'])
def create_one_user():    
    email = request.json.get('email')
    existing_user = User.query.filter_by(email=email).first()
    
    admin_api = Admins.query.filter_by(role = "admin").first() # se hace un llamado a la tabla admin para traer credenciales necesarias para que el usurio pueda hacer el pago correctamente

    if existing_user:
        return jsonify({'msg': 'Email already exists.'}), 409
    
    body = request.json
    raw_password = request.json.get('password')
    password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')
    new_user = User(
        first_name  = body["first_name"],
        last_name  = body["last_name"],
        date_of_birth = body["date_of_birth"],
        email = body["email"],
        pathologies = body["pathologies"],
        password = password_hash,
        role = body["role"]
        )
    db.session.add(new_user)
    db.session.commit()

    ok_to_share = {
        "first_name" : body["first_name"],
        "last_name" : body["last_name"],
        "date_of_birth" : body["date_of_birth"],
        "email" : body["email"],
        "pathologies" : body["pathologies"],
        "msg": "success",
        'client': admin_api.client_paypal,
        'secret': admin_api.secret_paypal,
        }

    return jsonify({"msg": "success", "user_added": ok_to_share }), 200

# hacemos llamado a la tabla admin para registrar un admin nuevo
@api.route('/admin', methods=['POST'])
def admin():    
    email = request.json.get('email')
    existing_admin = Admins.query.filter_by(email=email).first()
    if existing_admin:
        return jsonify({'msg': 'Email already exists.'}), 409
    
    body = request.json
    raw_password = request.json.get('password')
    password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')
    new = Admins(
       
        email = body["email"],
        role = body["role"],
        password = password_hash,
        client_paypal= body["client_paypal"],
        secret_paypal= body['secret_paypal'],
        )
    db.session.add(new)
    db.session.commit()

    ok_to_share = {  
        "email" : body["email"],
        "msg": "success"
        }

    return jsonify({"msg": "success", "added": ok_to_share }), 200

# hacemos un llamado a la tabla user para que el usuario se pueda logear correctamente
@api.route('/login', methods=['POST'])
def get_token():
    
        email = request.json.get('email')
        password = request.json.get('password')


        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        email_from_db = User.query.filter_by(email= email).first()

        if not email_from_db:
            return jsonify({"msg": "email don't exist"}), 404

       
        password_from_db = email_from_db.password # traemos la contraseña del usuario del request body 
        true_o_false = bcrypt.check_password_hash(password_from_db, password) #verificamos que las contraseñas coincidan

        if not true_o_false:
             return jsonify({"msg": "Incorrect password"}), 401
        
        if email_from_db.pay != "success":
            return jsonify({"msg": "user not pay yet"}), 402
        else: 

            access_token = create_access_token(identity= email_from_db.id)
            return jsonify({
                'access_token': access_token,
                'msg': 'success',
                "role": email_from_db.role,
                "payment_state": email_from_db.pay,
                
                }), 200 # si todo esta correcto retornamos un objeto con el jwt token en el 
        
@api.route('/log', methods=['POST'])
def get_token_admin():
    
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        email_from_db = Admins.query.filter_by(email= email).first()

        if not email_from_db:
            return jsonify({"msg": "email don't exist"}), 404
 
        password_from_db = email_from_db.password
        true_o_false = bcrypt.check_password_hash(password_from_db, password)

        if not true_o_false:
             return jsonify({"msg": "Incorrect password"}), 401
        
        else: 
            access_token = create_access_token(identity= email_from_db.id)
            return jsonify({
                'access_token': access_token,
                'msg': 'success',
                'role': email_from_db.role,
                'id': email_from_db.id
                }), 200
          
    
@api.route('/login/trainer', methods=['POST'])
def get_token_trainer():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        email_from_db = Trainer.query.filter_by(email= email).first()

        password_from_db = email_from_db.password
        true_o_false = bcrypt.check_password_hash(password_from_db, password)

        if true_o_false:
            access_token = create_access_token(identity= email_from_db.id)

            return jsonify({
                'access_token': access_token,
                'msg': 'success',
                "role": email_from_db.role
                }), 200

        else:
            return {"msg": "Incorrect password"}

    except Exception as e:
        return {"error": f"this email not exist: {str(e)}"}, 400

#hacemos un llamado a la base datos para que compruebe que el token esta correcto y el usuario pueda tener acceso a las vistas privadas
@api.route('/private')
@jwt_required()
def private_data():
    user_validation = get_jwt_identity()
    user_from_db = User.query.get(user_validation)

    if user_validation:
        return jsonify({
            'msg': 'success',
            'user_id': user_from_db.id,
            'create_at': user_from_db.create_at,
            'first_name': user_from_db.first_name,
            'last_name': user_from_db.last_name,
            'email': user_from_db.email
            }), 200

    else:
        return jsonify({"msg": 'token no valido o inexistente'}), 401
    
@api.route('/private/trainer')
@jwt_required()
def private_data_trainer():
    user_validation = get_jwt_identity()
    trainer_from_db = Trainer.query.get(user_validation)

    if trainer_from_db:
        return jsonify({
            'msg': 'success',
            'create_at': trainer_from_db.create_at,
            'first_name': trainer_from_db.first_name,
            'last_name': trainer_from_db.last_name,
            'email': trainer_from_db.email
            }), 200

    else:
        return jsonify({"msg": 'token no valido o inexistente'}), 401
    
@api.route('/private/private')
@jwt_required()
def admin_private_data():
    admin_id = get_jwt_identity()
    admin_query = Admins.query.get(admin_id)

    if admin_query:
        return jsonify({'msg': 'success'}), 200

    else:
        return jsonify({"msg": 'token no valido o inexistente'}), 401
    
# hacemos un llamado a la tabla admins para traer las credencias nesecesarias para recivir pagos 
@api.route('/get/api/info')
@jwt_required() # volvemos la vista privada para que personas sin autorizacion no puedan tener accesso a los datos
def admin_api_paypal_info():
    admin_id = get_jwt_identity()
    admin_query = Admins.query.get(admin_id)

    if admin_query:
        return jsonify({
            'msg': 'success',
            'email': admin_query.email,
            'client_paypal': admin_query.client_paypal,
            'secret_paypal': admin_query.secret_paypal
            }), 200

    else:
        return jsonify({"msg": 'token no valido o inexistente'}), 401


# hacemos un llamado a las tablas diets, routines, user, (para poder borrar el usuario hay que borrar su rutina y su dieta asociada)
@api.route('/user/delete/<int:id>', methods=['DELETE'])
def delete_user(id):

    
    user_exist_diets = Diets.query.filter_by( id_user= id).first()

    if user_exist_diets :
        db.session.delete(user_exist_diets)
        db.session.commit()

    user_exist_routine = Routines.query.filter_by( id_user= id).first()
    if user_exist_routine:
        db.session.delete(user_exist_routine)
        db.session.commit()

    user_exist_db = User.query.filter_by(id = id).first()
    if user_exist_db :
        db.session.delete(user_exist_db)
        db.session.commit()

        return jsonify({
            'msg': 'success'
        }), 200
    else:
        return jsonify({
           'msg': 'this user not exist' 
        }),500
    
@api.route('/trainer/delete/<int:id>', methods=['DELETE'])
def delete_trainer(id):

    user_exist_diets = Diets.query.filter_by( id_user= id).first()

    if user_exist_diets :
        db.session.delete(user_exist_diets)
        db.session.commit()

    user_exist_routine = Routines.query.filter_by( id_user= id).first()

    if user_exist_routine:
        db.session.delete(user_exist_routine)
        db.session.commit()


    trainer_exist_db = Trainer.query.filter_by(id = id).first()

    if trainer_exist_db :
        db.session.delete(trainer_exist_db)
        db.session.commit()

        return jsonify({
            'msg': 'success'
        }), 200
    else:
        return jsonify({
           'msg': 'this trainer not exist' 
        }),500

@api.route('/signup/trainer', methods=['POST'])
def create_trainer():    
    email = request.json.get('email')
    existing_trainer = Trainer.query.filter_by(email=email).first()
    if existing_trainer:
        return jsonify({'msg': 'Email already exists.'}), 409
    
    body = request.json
    raw_password = request.json.get('password')
    password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')
    new_trainer = Trainer(
        first_name  = body["first_name"],
        last_name  = body["last_name"],
        email = body["email"],
        password = password_hash,
        role = body["role"]
        )
    db.session.add(new_trainer)
    db.session.commit()

    ok_to_share = {
        "first_name" : body["first_name"],
        "last_name" : body["last_name"],
        "email" : body["email"],
        "password" : body["password"],
        "msg": "success"
        }
    
    return jsonify(ok_to_share), 200
#hacemos un llamado a la tabla rutinas
@api.route('/assign/routine', methods=['POST'])
@jwt_required()
def assign_routine():
    
    trainer = get_jwt_identity()
    chest = request.json.get('chest')
    shoulders = request.json.get('shoulders')
    arms = request.json.get('arms')
    legs = request.json.get('legs')
    id_user = request.json.get('id_user')

    user_from_db = Routines.query.filter_by(id_user = id_user).first() 

    if not chest or not shoulders or not arms or not legs:
        return jsonify({'msg': 'fill all inputs'}), 400    
    
    if user_from_db :
        return jsonify({'msg': 'user already have routine assigned'}), 400
    
    new_routine = Routines(
        Chest = chest,
        shoulders = shoulders,
        arms = arms,
        legs = legs,
        id_user = id_user,
        id_trainer = trainer
        )
    db.session.add(new_routine)
    db.session.commit()
    return jsonify({'msg': 'success'}), 200 # si todo esta correcto agregamos una rutina asignada a la persona 


#hacemos una llamada a las tablas rutinas, user
@api.route('/get/routine', methods=['GET'])
@jwt_required()
def get_one_routine_user():
    user_validation = get_jwt_identity()
    user_from_db = User.query.get(user_validation)


    if not user_from_db:
        return ({"msg": "user not exist"})

    routine = Routines.query.filter_by(id_user = user_from_db.id).first()

    if not routine:
        return jsonify({"msg": "no routine yet",
                        "status": True
                        }), 200
    

    return jsonify({"chest": routine.Chest,
                    "trainer_first_name": Trainer.query.filter_by(id = routine.id_trainer).first().first_name,
                    "trainer_last_name": Trainer.query.filter_by(id = routine.id_trainer).first().last_name,
                    "shoulders": routine.shoulders,
                    "legs": routine.legs,
                    "arms": routine.arms,
                    "msg": "success",
                    "status": True

                    }), 200

@api.route('/get/diet', methods=['GET'])
@jwt_required()
def get_one_diet_user():
    user_validation = get_jwt_identity()
    user_from_db = User.query.get(user_validation)

    if not user_from_db:
        return ({"msg": "user not exist"})

    diet = Diets.query.filter_by(id_user = user_from_db.id).first()

    if not diet:
        return jsonify({
                        "msg": "no diet yet"
                        }), 200

    return jsonify({
                    "breakfast": diet.breakfast,
                    "trainer_first_name": Trainer.query.filter_by(id = diet.id_trainer).first().first_name,
                    "trainer_last_name": Trainer.query.filter_by(id = diet.id_trainer).first().last_name,
                    "brunch": diet.brunch,
                    "lunch": diet.lunch,
                    "dinner": diet.dinner,
                    "supper": diet.supper,
                    "msg": "success",
                    

                    }), 200


@api.route('/get/user/<int:id>', methods=['GET'])
@jwt_required()
def get_one_user(id):

    
    user_from_db = User.query.filter_by(id = id).first()

    if not user_from_db:
        return ({"msg": "user not exist"}), 404


    return jsonify({
                    'first_name': user_from_db.first_name,
                    'last_name': user_from_db.last_name,
                    'email': user_from_db.email,
                    'id': user_from_db.id        
                    }), 200


@api.route('/routine/delete/<int:id>', methods=['DELETE'])
def delete_routine(id):

    routine_exist_db = Routines.query.filter_by(id_user = id).first()

    if routine_exist_db :
        db.session.delete(routine_exist_db)
        db.session.commit()

        return jsonify({
            'msg': 'success'
        }), 200
    else:
        return jsonify({
           'msg': 'this user not have routines' 
        }),500
    
@api.route('/diet/delete/<int:id>', methods=['DELETE'])
def delete_diet(id):

    diet_exist_db = Diets.query.filter_by(id_user = id).first()

    if diet_exist_db :
        db.session.delete(diet_exist_db)
        db.session.commit()

        return jsonify({
            'msg': 'success'
        }), 200
    else:
        return jsonify({
           'msg': 'this user not have diet' 
        }),500


@api.route('/assign/diet', methods=['POST'])
@jwt_required()
def assign_diet():
    
    trainer = get_jwt_identity()
    breakfast = request.json.get('breakfast')
    brunch = request.json.get('brunch')
    lunch = request.json.get('lunch')
    dinner = request.json.get('dinner')
    supper = request.json.get('supper')
    id_user = request.json.get('id_user')

    diet_from_db = Diets.query.filter_by(id_user = id_user).first()

     
    if not breakfast or not brunch or not lunch or not dinner or not supper:
        return jsonify({'msg': 'fill all inputs'}), 400    
    
    if diet_from_db :
        return jsonify({'msg': 'user already have diet assigned'}), 400
    
    new_diet = Diets(
        id_trainer = trainer,
        breakfast = breakfast,
        brunch =  brunch,
        lunch = lunch,
        dinner = dinner,
        supper = supper,
        id_user = id_user
        )
    db.session.add(new_diet)
    db.session.commit()

    return jsonify({'msg': 'success'}), 200


@api.route('/paypal/confirmation', methods=['POST'])
def paypal_confirmation():

    paypal_res = request.json.get('resource')
    id = paypal_res.get('id')

    user = User.query.filter_by(pay = id).first()

    if user.pay == id:
        user.pay = "success"
        db.session.commit()

        params = {
        "from": "onboarding@resend.dev",
        "to": [user.email],
        "subject": "Welcome to GYM APP Sign",
        
        "html": f"<h1>Congrats you payment is confirmed sign in now!! {url_front} </h1>",
        
    }

    resend.api_key = "re_GeRFSVeg_Jx373tv4jpEfRr2j6gbT3aVw"

    try:
        r = resend.Emails.send(params)
        return jsonify({'msg': 'email was sended'}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
  


@api.route('/payment/update', methods=['PUT'])
def update_payment_state():  
    email = request.json.get('email') 
    id = request.json.get('id')

    email_from_db = User.query.filter_by(email = email).first()

    if not email_from_db:
        return jsonify({'msg': 'user not exist'}), 400
    
    email_from_db.pay = id
    db.session.commit()

    
    return jsonify({"msg": "success"}), 200

@api.route('/user/edit', methods=['PUT'])
@jwt_required()
def edit_user():  
    email = request.json.get('email') 
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    id = request.json.get('id')

    if not email or not first_name or not last_name or not id:
        return jsonify({'msg': 'missing properties'}), 400

    user_from_db = User.query.get(id)

    if not user_from_db:
        return jsonify({'msg': 'user not exist'}), 400
    
    user_from_db.email = email
    user_from_db.first_name = first_name
    user_from_db.last_name = last_name
    db.session.commit()

    
    return jsonify({"msg": "success"}), 200