from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse

import json

from gad import getAge

app = Flask(__name__)
api = Api(app)

class Res(Resource):

    def post(self):
        image = request.get_data()
        age = getAge(image)
        response = jsonify(
            ethnicity='white',
            age=age
        )
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Credentials'] = True
        return response

api.add_resource(Res, "/ai")
app.run(host='0.0.0.0', debug=True) # runs on port 5000 by default


