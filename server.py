import json
import sys
import requests
import configparser
import os
sys.path.append(os.path.join(sys.path[0],'static','python'))
import mainFile
from mainFile import ostrow
from flask import Flask, render_template
from flask import jsonify
from flask import request
import arrays

app = Flask(__name__, static_url_path='/static/', static_folder='./static/', template_folder='./static/template')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test', methods=['POST'])
def test_post():
    output = request.get_json()
    result = json.loads(output)
    #print(result)
    #print(type(result))
    firstStation = result['firstStation']
    goalStation = result['goalStation']
    hourTMP = result['hour']
    hour = hourTMP.split(":")

    #mainFile.algorithmToWeb.algorithm('Centrum przesiadkowe', 'Odolanowska I', 15, 36, 100, ostrow)
    options = mainFile.algorithmToWeb.algorithm(firstStation, goalStation, int(hour[0]), int(hour[1]), 100, ostrow)
    #print(options)
    return options
@app.route('/showRoute', methods=['POST'])
def post():
    output = request.get_json()
    result = json.loads(output)
    firstStation = result['firstStation']
    goalStation = result['goalStation']
    results = result['res']
    #print(output)
    options = mainFile.getPath(firstStation, goalStation, results)
    return options
@app.route('/findBusDetails', methods=['POST'])
def postSchedule():
    output = request.get_json()
    result = json.loads(output)
    bus = result['busName']
    index = 0
    for i in range(len(arrays.addBusList)):
        if arrays.addBusList[i][0] == bus:
            index = i
    stopsCoordinates = []
    for stopName in arrays.addStopsList[index]:
        stopsCoordinates.append(mainFile.checkCoordinates(stopName))
    return [[arrays.dictionaries[2 * index], arrays.dictionaries[2 * index + 1], arrays.addStopsList[index]],stopsCoordinates]


@app.route('/getDepartureHours', methods=['POST'])
def getHours():
    output = request.get_json()
    result = json.loads(output)
    busName = result['busName']
    stopName = result['stopName']
    direction = result['direction']
    options = mainFile.getHours(busName, stopName, direction)
    return options

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
else:
    app.config.update(
        APPLICATION_ROOT='/',
    )