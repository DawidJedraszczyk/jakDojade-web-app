import graph
import algorithmToWeb
import mysql.connector

ostrow = graph.Graph(2)
mydb = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="Dragon11",
    database="jakdojade")
mycursor = mydb.cursor()

#       MAIN
def getPath(firstStation, goalStation, results):
    data = {'firstBus': results[0], 'secondBus': results[5], 'secondStopName': results[10],
            'timeOnTravel': [int(results[11]), int(results[12])],
            'firstStationHour': [int(results[1]), int(results[2])], 'secondStationArrivalHour': [results[6], results[7]],
            'secondStationDepartureHour': [results[8], results[9]],
            'lastStationArivalHour': [int(results[3]), int(results[4])]}
    outputIndex = 0
    bus1 = [[firstStation, data['firstStationHour'], checkCoordinates(firstStation)]]
    bus2 = [[data["secondStopName"], data["secondStationDepartureHour"], checkCoordinates(data["secondStopName"])]]
    if data['secondBus'] != '': #2 buses
        firstDirection = ostrow.get_stops_dict(data['firstBus'],1)
        if firstDirection.index(firstStation) < firstDirection.index(data['secondStopName']):
            direction = 1
        else:
            direction = 2
        stops = ostrow.get_stops_dict(data['firstBus'], direction)
        for i in range(stops.index(firstStation) + 1, stops.index(data['secondStopName']) + 1):
            setMinHour = (bus1[outputIndex][1][0])
            setMinMinute = (bus1[outputIndex][1][1])
            outputIndex += 1
            bus1.append([stops[i], ostrow.checkDepartureHours(data['firstBus'], stops[i], direction, setMinHour, setMinMinute),checkCoordinates(stops[i])])
        secondDirection = ostrow.get_stops_dict(data['secondBus'], 1)
        if secondDirection.index(data['secondStopName']) < secondDirection.index(goalStation):
            direction = 1
        else:
            direction = 2
        stops = ostrow.get_stops_dict(data['secondBus'], direction)
        outputIndex = 0
        for i in range(stops.index(data['secondStopName']) + 1, stops.index(goalStation) + 1):
            setMinHour = int(bus2[outputIndex][1][0])
            setMinMinute = int(bus2[outputIndex][1][1])
            outputIndex += 1
            bus2.append(
                [stops[i], ostrow.checkDepartureHours(data['secondBus'], stops[i], direction, setMinHour, setMinMinute),
                 checkCoordinates(stops[i])])
        return [bus1, bus2]
    else: #only one bus
        firstDirection = ostrow.get_stops_dict(data['firstBus'], 1)
        if firstDirection.index(firstStation) < firstDirection.index(goalStation):
            direction = 1
        else:
            direction = 2
        stops = ostrow.get_stops_dict(data['firstBus'], direction)
        for i in range(stops.index(firstStation)+1, stops.index(goalStation)+1):
            setMinHour = (bus1[outputIndex][1][0])
            setMinMinute = (bus1[outputIndex][1][1])
            outputIndex += 1
            bus1.append([stops[i],ostrow.checkDepartureHours(data['firstBus'], stops[i], direction, setMinHour,setMinMinute), checkCoordinates(stops[i])])
        return [bus1, []]


def checkCoordinates(stopName):
    mycursor.execute("SELECT LOKALIZACJA FROM PRZYSTANKI WHERE NAZWA_PRZYSTANKU = %s", (stopName,))
    res = mycursor.fetchone()
    if res:
        coordinates = res[0].split(',')
        coordinates = [float(coord.strip()) for coord in coordinates]  # Remove spaces and convert to floats
        return coordinates
    return []

def getHours(busName, stopName, currentDirection):
    mycursor.execute("SELECT odjazd.godzina_odjazdu FROM odjazd JOIN przystanki ON odjazd.ID_PRZYSTANKU = przystanki.ID_PRZYSTANKU WHERE przystanki.nazwa_przystanku = %s AND odjazd.ID_LINII = %s AND odjazd.kierunek = %s", (stopName, busName, currentDirection))
    res = mycursor.fetchall()
    hours_minutes = [[time.split(':')[0], time.split(':')[1]] for time, in res]
    return hours_minutes
