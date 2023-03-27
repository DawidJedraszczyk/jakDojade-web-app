import json
import sys
import os
sys.path.append(os.path.join(sys.path[0],'static','python'))
import mainFile
from mainFile import ostrow
from flask import Flask, render_template
from flask import jsonify
from flask import request

if __name__ == "__main__":
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
        res = results.split(",")
        print(res)
        if (len(res[9]) > 0):
            opt = 0
            output = [res[0], res[1], res[2], None, None, [int(res[5]), int(res[6])], [
                int(res[7]), int(res[8])], [int(res[9]), int(res[10])], [
                int(res[11]), int(res[12])], [None, None],
                [None, None], [int(res[17]), int(res[18])]]
        else:
            opt = 1
            output = [res[0], None, None, None, None, [int(res[5]), int(res[6])], [
                int(res[7]), int(res[8])], [None, None], [
                          None, None], [None, None],
                      [None, None], [int(res[17]), int(res[18])]]
        #print(output)
        options = mainFile.algorithmToWeb.getPath(firstStation, goalStation, output, ostrow)
        return options
    @app.route('/findBusDetails', methods=['POST'])
    def postSchedule():
        output = request.get_json()
        result = json.loads(output)
        bus = result['busName']
        options = mainFile.busDetails(bus)
        return options

    @app.route('/getDepartureHours', methods=['POST'])
    def getHours():
        output = request.get_json()
        result = json.loads(output)
        busName = result['busName']
        stopName = result['stopName']
        direction = result['direction']
        options = mainFile.getHours(busName, stopName, direction)
        return options
else:
    app.config.update(
        APPLICATION_ROOT='/',
    )