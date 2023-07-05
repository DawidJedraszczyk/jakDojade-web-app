import geopy.distance
import mysql.connector
from geopy.geocoders import Nominatim
from geopy import distance
import graph
from operator import itemgetter
import time

city = graph.Graph(2)

mydb = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="Dragon11",
    database="jakdojade"
)
mycursor = mydb.cursor()
mycursor.execute("select nazwa_przystanku, lokalizacja from przystanki")
allStopsWithLocation = mycursor.fetchall()
def checkIfThereIsTheSameBus(busList1, busList2):
    listOfBuses = []
    for busName in busList1:
        if busName in busList2:
            listOfBuses.append(busName)
    return listOfBuses
def findNearestStations(ADDRESS, num_stations=5):
    geolocator = Nominatim(user_agent='sprawdzbusa')
    location = geolocator.geocode(ADDRESS + ', Polska')
    station_distances = []
    for stopLocation in allStopsWithLocation:
        distance = geopy.distance.distance((location.latitude, location.longitude), stopLocation[1]).m
        station_distances.append((stopLocation, distance))
    station_distances.sort(key=itemgetter(1))  # Sort the stations by distance in ascending order
    nearest_stations = []
    for station, distance in station_distances[:num_stations]:
        nearest_stations.append({
            'station': [station[0], station[1]],  # station[0] is the station name, station[1] is the coordinates
            'distance': distance
        })
    result = {
        'address': (ADDRESS, location.latitude, location.longitude),
        'stations': nearest_stations
    }
    return result

def checkCoordinates(stopName):
    mycursor.execute("SELECT LOKALIZACJA FROM PRZYSTANKI WHERE NAZWA_PRZYSTANKU = %s", (stopName,))
    res = mycursor.fetchone()
    if res:
        coordinates = res[0].split(',')
        coordinates = [float(coord.strip()) for coord in coordinates]  # Remove spaces and convert to floats
        return coordinates
    return []
def algorithm(STARTADDRESS, GOALADDRESS):
    startAddress = findNearestStations(STARTADDRESS)
    goalAddress = findNearestStations(GOALADDRESS)
    maxDistance = geopy.distance.distance((startAddress['address'][1], startAddress['address'][2]), (goalAddress['address'][1], goalAddress['address'][2])).m
    startAddressStations = []
    goalAddressStations = []
    for station in startAddress['stations']:
        startAddressStations.append([station['station'], station['distance']])

    for station in goalAddress['stations']:
        goalAddressStations.append([station['station'], station['distance']])

    solutionsOneBus = []
    solutionsTwoBuses = []
    busesUsed = set()
    for firstStation in startAddressStations:
        firstStationBuses = city.get_other_buses_from_same_stop(firstStation[0][0])
        tmp = []
        for goalStation in goalAddressStations:
            goalStationBuses = city.get_other_buses_from_same_stop(goalStation[0][0])
            res = checkIfThereIsTheSameBus(firstStationBuses, goalStationBuses)
            if len(res) > 0 and (firstStation[1] + goalStation[1] < maxDistance):
                for bus in res:
                    busesUsed.add(bus)
                    solution = {
                        'firstStation': firstStation,
                        'goalStation': goalStation,
                        'bus': bus,
                        'distanceTotal': firstStation[1] + goalStation[1]
                    }
                    tmp.append(solution)
            solutionsOneBus.append(tmp)
    allPossibleNextStops = set()
    for bus in firstStationBuses:
        if bus not in busesUsed:
            possibleStops = city.get_stops_dict(bus, 1) #first direction
            possibleStops2 = city.get_stops_dict(bus, 2) #second direction
            for stop in possibleStops:
                allPossibleNextStops.add(stop)
            for stop in possibleStops2:
                allPossibleNextStops.add(stop)
            for stop in allPossibleNextStops:
                nextStopBuses = city.get_other_buses_from_same_stop(stop)
                possibleBuses = checkIfThereIsTheSameBus(goalStationBuses, nextStopBuses)
                for finalBus in possibleBuses:
                    if finalBus not in busesUsed and finalBus != bus:
                        busesUsed.add(finalBus)
                        coordinates = checkCoordinates(stop)
                        secondStationTmp = [[stop], coordinates]
                        station_name = secondStationTmp[0][0]
                        coordinates = ', '.join(str(coord) for coord in secondStationTmp[1])
                        distance = 0
                        solution = {
                            'firstStation': firstStation,
                            'secondStation': [[station_name, coordinates], distance],
                            'goalStation': goalStation,
                            'firstBus': bus,
                            'secondBus': finalBus,
                            'distanceTotal': firstStation[1] + goalStation[1]
                        }
                        solutionsTwoBuses.append(solution)
    # Filter the solutions to remove duplicates with the same bus
    filtered_solutions = []
    visited_buses = set()
    for sublist in solutionsOneBus:
        for solution in sublist:
            if solution['bus'] not in visited_buses:
                filtered_solutions.append(solution)
                visited_buses.add(solution['bus'])

    # Sort the filtered solutions by distanceTotal
    sorted_solutions = sorted(filtered_solutions, key=lambda x: x['distanceTotal'])

    return [sorted_solutions, solutionsTwoBuses]

def bruteForce(startAddress, GOALADDRESS):
    startAddress = findNearestStations(startAddress)
    goalAddress = findNearestStations(GOALADDRESS)
    maxDistance = geopy.distance.distance((startAddress['address'][1], startAddress['address'][2]),
                                          (goalAddress['address'][1], goalAddress['address'][2])).m
    startAddressStations = []
    goalAddressStations = []
    for station in startAddress['stations']:
        startAddressStations.append([station['station'][0], station['distance']])

    for station in goalAddress['stations']:
        goalAddressStations.append([station['station'][0], station['distance']])

    solutionsOneBus = []
    solutionsTwoBuses = []
    for firstStation in startAddressStations:
        firstStationBuses = city.get_other_buses_from_same_stop(firstStation[0])
        tmp = []
        for goalStation in goalAddressStations:
            goalStationBuses = city.get_other_buses_from_same_stop(goalStation[0])
            res = checkIfThereIsTheSameBus(firstStationBuses, goalStationBuses)
            if len(res) > 0 and (firstStation[1] + goalStation[1] < maxDistance):
                for bus in res:
                    solution = {
                        'firstStation': firstStation,
                        'goalStation': goalStation,
                        'bus': bus,
                        'distanceTotal': firstStation[1] + goalStation[1]
                    }
                    tmp.append(solution)
        solutionsOneBus.append(tmp)
    allPossibleNextStops = set()
    for bus in firstStationBuses:
        possibleStops = city.get_stops_dict(bus, 1)  # first direction
        possibleStops2 = city.get_stops_dict(bus, 2)  # second direction
        for stop in possibleStops:
            allPossibleNextStops.add(stop)
        for stop in possibleStops2:
            allPossibleNextStops.add(stop)
        for stop in allPossibleNextStops:
            nextStopBuses = city.get_other_buses_from_same_stop(stop)
            possibleBuses = checkIfThereIsTheSameBus(goalStationBuses, nextStopBuses)
            for finalBus in possibleBuses:
                if finalBus != bus:
                    solution = {
                        'firstStation': firstStation,
                        'secondStation': stop,
                        'goalStation': goalStation,
                        'firstBus': bus,
                        'secondBus': finalBus,
                        'distanceTotal': firstStation[1] + goalStation[1]
                    }
                    solutionsTwoBuses.append(solution)
    return solutionsOneBus, solutionsTwoBuses


# start = time.time()
# res1, res2 = algorithm('Gorzycka 110, Ostrów Wielkopolski', 'Księdza Jerzego Popiełuszki 3, Ostrów Wielkopolski')
# for r in res1:
#    print(r)
# for r in res2:
#    print(r)
#
# end = time.time()
# print("")
# print(end-start)
# print("")
# print("")
# print("")
# start = time.time()
# res1, res2 = bruteForce('Gorzycka 110, Ostrów Wielkopolski', 'Księdza Jerzego Popiełuszki 3, Ostrów Wielkopolski')
# for r in res1:
#     print(r)
# for r in res2:
#     print(r)
# end = time.time()
# print('')
# print(end-start)

