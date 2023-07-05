import graph
import bubble


def algorithm(firstStation, lastStation, hour, minute, maxTime, graph):
    busesListFirstStop = graph.get_other_buses_from_same_stop(firstStation)
    busesListLastStop = graph.get_other_buses_from_same_stop(lastStation)
    solutions = []

    def checkIfThereIsTheSameBus(busList):
        listOfBuses = []
        for busName in busList:
            if busName in busesListLastStop:
                listOfBuses.append(busName)
        return listOfBuses

    def checkDirection(busName, startStation, goalStation):
        firstDirection = graph.get_stops_dict(busName, 1)

        if firstDirection.index(startStation) < firstDirection.index(goalStation):
            return 1
        else:
            return 2

    def checkDepartureHours(busName, firstStation, direction, setMinHour, setMinMinute):
        res = graph.get_hours(busName, firstStation, direction)
        firstStationDepartureHours = [[int(item) for item in sublist] for sublist in res]

        firstStationHour = 0
        firstStationMinute = 0

        for clock in firstStationDepartureHours:
            firstStationHour = clock[0]
            firstStationMinute = clock[1]
            if (firstStationHour > setMinHour or (firstStationHour == setMinHour and firstStationMinute >= setMinMinute)):
                break
        return firstStationHour, firstStationMinute

    def sumUpTravelTime(lastStationHour, lastStationMinute, firstStationHour, firstStationMinute):
        if lastStationMinute > firstStationMinute and lastStationHour > firstStationHour:
            return lastStationHour-firstStationHour, lastStationMinute-firstStationMinute
        elif lastStationMinute > firstStationMinute and lastStationHour == firstStationHour:
            return 0, lastStationMinute-firstStationMinute
        elif lastStationMinute < firstStationMinute and lastStationHour > firstStationHour:
            return lastStationHour-1-firstStationHour, lastStationMinute+60-firstStationMinute
        elif lastStationMinute == firstStationMinute and lastStationHour > firstStationHour:
            return lastStationHour-firstStationHour, 0


        #   przypadek gdy nie potrzeba się przesiadać
    firstTransportOption = checkIfThereIsTheSameBus(busesListFirstStop)

    for option in firstTransportOption:     #tutaj przejście po możliwych do wyboru dojazdach
        direction = checkDirection(option, firstStation, lastStation)
        hour2 = hour
        minute2 = minute
        solutionsFound = 0
        while solutionsFound < 40:
            firstStationHour, firstStationMinute = checkDepartureHours(option, firstStation, direction, hour2, minute2)

            time = graph.get_time_between_stops_algorithm(firstStation, lastStation, option, direction)
            if time:
                addedHour = time // 60
                addedMinute = time - addedHour*60

                lastStationHour = firstStationHour + addedHour
                lastStationMinute = firstStationMinute + addedMinute
                if lastStationMinute > 59:
                    lastStationHour += 1
                    lastStationMinute -= 60
                travelTimeHour, travelTimeMinute = sumUpTravelTime(lastStationHour, lastStationMinute, firstStationHour, firstStationMinute)
                solution = {'firstBus': option, 'secondBus': None, 'secondStopName': None, 'timeOnTravel': [travelTimeHour, travelTimeMinute],'firstStationHour':[firstStationHour, firstStationMinute],'secondStationArrivalHour': [None,None],'secondStationDepartureHour': [None, None],'lastStationArivalHour': [lastStationHour, lastStationMinute]}
                if solution not in solutions:
                    solutions.append(solution)
            solutionsFound += 1
            minute2 += 10
            if minute2 > 59:
                hour2 += 1
                minute2 -= 60

            #   przypadek z przesiadką
            #   1 przesiadka
    if len(solutions) == 0:
        for busName in busesListFirstStop:          #przejscie po kazdym z busow na pierwszym przystanku          #przejscie po kazdym kierunku jazdy
            stopsList = graph.get_stops_dict(busName, 1)        #lista przystankow
            for secondStopName in stopsList:
                if secondStopName != firstStation and secondStopName != lastStation:        #brało losowego busa z tej stacji, zeby dojechac na tę samą stację i pojechać bezpośrednio
                    firstBusDirection = checkDirection(busName, firstStation, secondStopName)
                    busList = graph.get_other_buses_from_same_stop(secondStopName)
                    secondOption = checkIfThereIsTheSameBus(busList)
                    firstStationHour, firstStationMinute = checkDepartureHours(busName, firstStation, firstBusDirection, hour,minute)
                    timeBetween = graph.get_time_between_stops_algorithm(firstStation, secondStopName, busName, firstBusDirection)
                    tmpHour = firstStationHour + timeBetween // 60
                    tmpMinute = firstStationMinute + timeBetween % 60
                    secondStationHourArrival, secondStationMinuteArrival = checkDepartureHours(busName, secondStopName,firstBusDirection, tmpHour,tmpMinute)
                    minSecondStationMinuteDeparture = secondStationMinuteArrival + 3  # doliczamy 3 minuty na przesiadkę
                    minSecondStationHourDeparture = secondStationHourArrival
                    if minSecondStationMinuteDeparture > 59:
                        minSecondStationMinuteDeparture -= 60
                        minSecondStationHourDeparture += 1
                    for secondBus in secondOption:
                        if secondBus != busName:
                            secondBusDirection = checkDirection(secondBus, secondStopName, lastStation)
                            secondStationHourDeparture, secondStationMinuteDeparture = checkDepartureHours(secondBus, secondStopName, secondBusDirection, minSecondStationHourDeparture, minSecondStationMinuteDeparture)
                            timeBetween = graph.get_time_between_stops_algorithm(secondStopName, lastStation, secondBus, secondBusDirection)
                            tmpHour = secondStationHourDeparture + timeBetween // 60
                            tmpMinute = secondStationMinuteDeparture + timeBetween % 60
                            lastStationHourArrival, lastStationMinuteArrival = checkDepartureHours(secondBus, lastStation, secondBusDirection, tmpHour, tmpMinute)
                            travelTimeHour, travelTimeMinute = sumUpTravelTime(lastStationHourArrival, lastStationMinuteArrival, firstStationHour, firstStationMinute)

                            solutions.append({'firstBus': busName, 'secondBus':secondBus, 'secondStopName': secondStopName, 'timeOnTravel': [travelTimeHour, travelTimeMinute], 'firstStationHour': [firstStationHour, firstStationMinute],'secondStationArrivalHour': [secondStationHourArrival,secondStationMinuteArrival],'secondStationDepartureHour': [secondStationHourDeparture, secondStationMinuteDeparture], 'lastStationArivalHour':[lastStationHourArrival, lastStationMinuteArrival]})
    bubble.bubbleSort(solutions)
    # for index in solutions:
    #     print(index)
    return solutions
