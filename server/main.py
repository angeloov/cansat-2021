from flask import Flask, render_template 
from flask_socketio import SocketIO , send, emit
import time
import math
import random
from flask_cors import CORS

#import serial
#import mysql.connector
#from mysql.connector import errorcode

#dbCansat = mysql.connector.connect(
#    host='127.0.0.1',
#    user='root',
#    passwd='cansat',
#   database='CansatData'
#)

app = Flask(__name__)
CORS(app) # enable cors for * domains

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

#curs = dbCansat.cursor()
#curs.execute("select exists(select * from CansatData.data where temperatura=%s)", ('data',))
#if curs.fetchone()[0] == None :
#    curs.execute("CREATE TABLE data (temperatura int,areaatterraggio longtext,pressione int,gps longtext );")

@app.route("/")
def home():
    return "HEYY"
    return render_template("/home.html")

@app.route("/stats")
def stats():
    return render_template("/statistics.html")

@socketio.on('start-receiving-data') # event fired by client
def startSendingDataToClient():
    print("Client connesso")

    timeInSeconds = 0
    
    while True:
        timeInSeconds += 0.1
        
        temperatura = random.randrange(0,40)
        atterraggio = "'0,1,2'"
        pressione = random.randrange(0,40)
        gps = "'32,42,377'"
        
        # comando = "INSERT INTO cansatdata.data"
        # elencoCampi = " (temperatura,areaatterraggio,pressione,gps)"
        # elencoValori = " VALUES (" + str(temperatura) + " , " + atterraggio + " , " + str(pressione) + " , " + gps + ");"

        # query = comando + elencoCampi + elencoValori
        # curs.execute(query)
        
        emit('cansat-data', {
            'seconds'     : round(timeInSeconds, 1),
            'temperatura' : temperatura,
            'atterraggio' : atterraggio,
            'pressione'   : pressione,
            'gps'         : gps
        })

        time.sleep(0.1)
        #curs.execute("SELECT * FROM cansatdata.data")
    
        #result = curs.fetchall()
        
    # for row in result:
            # print(row, '\n')


if __name__ == "__main__":
    socketio.run(app)