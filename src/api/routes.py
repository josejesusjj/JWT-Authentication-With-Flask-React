"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, create_access_token

api = Blueprint('api', __name__)
#api 1 - login, here i create the login service
@api.route('/login', methods=['POST'])
def login():
    #here I take the data from the api for login
    email = request.json.get('email') 
    password = request.json.get('password') 

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"message":"El usuario o contraseña incorrectos"}), 401

    token = create_access_token(identity=user.id)

    data_response = { #here I create a dictionary and I put de data from the API
        "token" : token,
        "email": user.email,
        "user_id": user.id
    }

    return jsonify(data_response), 200 # here I send de data stored in the dictionary as a response

# this way we are sure the data is coming from the api and is the right data
# end of api 1 - login

# api 2 - signup, here i create the signup service, for now is just a copy of api 1.
@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email') #here I take the data from the api
    password = request.json.get('password') 
    already_used = User.query.filter_by(email=email).first()
    if already_used: 
        return jsonify({"message": "El email ya está utilizado"}), 401
    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({'response': "Usuario creado con éxito"}), 200

# end of api 2 - singup

# api test - hello: this is and api for testings
@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
# end of api test - hello