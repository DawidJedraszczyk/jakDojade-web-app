import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="Dragon11",
    database="jakdojade"
)
mycursor = mydb.cursor()

class Graph(object):
    def __init__(self, numberOfBuses):
        self.numberOfBuses = numberOfBuses

    def get_other_buses_from_same_stop(self, stopName):
        mycursor.execute(
            "SELECT id_linii FROM przystanki JOIN odjazd ON przystanki.ID_PRZYSTANKU = odjazd.id_przystanku WHERE przystanki.nazwa_przystanku = %s GROUP BY id_linii",
            (stopName,))
        res = mycursor.fetchall()
        bus_ids = [item[0] for item in res]
        return bus_ids

    def print_hours(self, busId, stopName, direction):
        mycursor.execute(
            "select godzina_odjazdu from przystanki join odjazd on przystanki.ID_PRZYSTANKU = odjazd.id_przystanku where przystanki.nazwa_przystanku = %s and odjazd.id_linii = %s and odjazd.kierunek = %s",
            (stopName, busId, direction))
        res = mycursor.fetchall()
        hours = [item[0].split(':') for item in res]
        print(hours)

    def get_hours(self, busId, stopName, direction):
        mycursor.execute(
            "select godzina_odjazdu from przystanki join odjazd on przystanki.ID_PRZYSTANKU = odjazd.id_przystanku where przystanki.nazwa_przystanku = %s and odjazd.id_linii = %s and odjazd.kierunek = %s",
            (stopName, busId, direction))
        res = mycursor.fetchall()
        hours = [item[0].split(':') for item in res]
        return hours

    def get_buses(self):
        mycursor.execute(
            "select id_linii from linie_autobusowe")
        res = mycursor.fetchall()
        buses = [item[0] for item in res]
        return buses

    def checkDepartureHours(self, busId, firstStation, direction, setMinHour, setMinMinute):
        hour = str(setMinHour) + ':' + str(setMinMinute)
        mycursor.execute(
            "SELECT Godzina_odjazdu FROM odjazd JOIN przystanki ON odjazd.ID_PRZYSTANKU = przystanki.ID_PRZYSTANKU WHERE odjazd.id_linii = %s AND przystanki.NAZWA_PRZYSTANKU = %s AND kierunek = %s AND GODZINA_ODJAZDU >= %s LIMIT 1",
            (busId, firstStation, direction, hour))
        res = mycursor.fetchone()
        depHour, depMin = [int(item) for item in res[0].split(":")]
        return depHour, depMin

    def get_all_stops(self):
        mycursor.execute("select NAZWA_PRZYSTANKU from przystanki order by nazwa_przystanku")
        res = mycursor.fetchall()
        allStops = [item[0] for item in res]
        return allStops

    def calculate_time_difference_in_minutes(self, start_time, end_time):
        start_hour, start_minute = map(int, start_time.split(':'))
        end_hour, end_minute = map(int, end_time.split(':'))
        total_start_minutes = start_hour * 60 + start_minute
        total_end_minutes = end_hour * 60 + end_minute
        time_difference = total_end_minutes - total_start_minutes
        return time_difference

    def get_time_between_stops_algorithm(self, firstStation, lastStation, busId, direction):
        mycursor.execute("select godzina_odjazdu from przystanki join odjazd on przystanki.ID_PRZYSTANKU = odjazd.id_przystanku where id_linii = %s and kierunek = %s and nazwa_przystanku = %s LIMIT 1", (busId, direction, firstStation,))
        res = mycursor.fetchall()
        firstTime = [item[0] for item in res]
        mycursor.execute("select godzina_odjazdu from przystanki join odjazd on przystanki.ID_PRZYSTANKU = odjazd.id_przystanku where id_linii = %s and kierunek = %s and nazwa_przystanku = %s LIMIT 1", (busId, direction, lastStation,))
        res = mycursor.fetchall()
        secondTime = [item[0] for item in res]
        time_diff = self.calculate_time_difference_in_minutes(firstTime[0], secondTime[0])
        return time_diff


    def get_stops_dict(self, busId, direction):
        mycursor.execute("select NAZWA_PRZYSTANKU from przystanki join odjazd on przystanki.ID_PRZYSTANKU = odjazd.id_przystanku where id_linii = %s and kierunek = %s group by NAZWA_PRZYSTANKU", (busId, direction,))
        res = mycursor.fetchall()
        allStops = [item[0] for item in res]
        return allStops

    def get_name_of_stop_dict(self, index):
        mycursor.execute("select NAZWA_PRZYSTANKU from przystanki where id_przystanku = %s", (index,))
        res = mycursor.fetchone()
        stopName = res[0]
        return stopName

    def get_name_of_stop_in_bus(self, index, busId, direction):
        mycursor.execute("select NAZWA_PRZYSTANKU from przystanki join odjazd on przystanki.ID_PRZYSTANKU = odjazd.id_przystanku where numer_porządkowy = %s and id_linii = %s and kierunek = %s group by nazwa_przystanku", (index, busId, direction,))
        res = mycursor.fetchone()
        stopName = res[0]
        return stopName