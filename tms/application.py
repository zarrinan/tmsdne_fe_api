import json
from flask import Flask, abort, jsonify, request
import random

from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import generator, plotly_chart

application = Flask(__name__)

cors = CORS(application, resources={r"/": {"origins": "*"}})
application.config['CORS_HEADERS'] = 'Content-Type'

@application.route('/', methods=['POST','OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_report():
    user_input = request.get_json(force=True)
    print(user_input)
    date = user_input['date']
    try:
        text = generator.interact_model(date)
    except:
    text = generator.interact_model('2019-05-02')
        pass
    try:
        url, url2, url3 =  plotly_chart.get_chart_url(date, 'yJFFlg1mOfxnXv3WBCGH')
    except:
    url, url2, url3 = 'https://plot.ly/~TMSDNE/4', 'https://plot.ly/~TMSDNE/10', 'https://plot.ly/~TMSDNE/12'
        pass

    chart_url = random.choice([url, url2, url3])
    print(text)


    return jsonify({'report':text,
        'url': chart_url})

@application.route('/')
def hello():
  return jsonify({"Hi":"tmsdne!"})


if __name__ == '__main__':
    application.run(port = 5050, debug = False)



