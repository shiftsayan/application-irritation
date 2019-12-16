from flask import Flask, request
from flask_restful import Api, Resource, reqparse

import json

app = Flask(__name__)
api = Api(app)

class Res(Resource):

    def get(self):
        return "hi"
        # {
        #     'ethnicity': 'white',
        #     'age': 21
        # }


api.add_resource(Res, "/ai")
app.run(host='0.0.0.0', debug=True) # runs on port 5000 by default
