from flask import Flask, render_template 
from flask_socketio import SocketIO , send, emit
import re
import time
import serial
import sys
import math
import random
from flask_cors import CORS

import serial
import mysql.connector
from mysql.connector import errorcode

ComPort = 'COM12'

dbCansat = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    passwd='cansat',
    database='CansatData'
)

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

curs = dbCansat.cursor()
curs.execute("select exists(select * from CansatData.data where temperatura=%s)", ('data',))
if curs.fetchone()[0] == None :
    curs.execute("CREATE TABLE data (temperatura float,umidita float,pressione float,altitudine float );")

@app.route("/")
def home():
    return "HEYY"
    return render_template("/home.html")

@app.route("/stats")
def stats():
    return render_template("/statistics.html")

@socketio.on('start-receiving-data') # event fired by client
def startSendingDataToClient():
    try:

        esp32Rx = serial.Serial(ComPort, 9600, timeout = 0)

        print("Client connesso")

        timeInSeconds = 0
        
        while True:

            inputLine = esp32Rx.readline()

            timeInSeconds += 0.1

            parsedString = re.match("T(\d+\.?\d*)P(\d+\.?\d*)A(\d+\.?\d*)U(\d+\.?\d*)",inputLine).groups()

            temperatura = parsedString[1]
            umidita = parsedString[2]
            pressione = parsedString[3]
            altitudine = parsedString[4]
            
            comando = "INSERT INTO cansatdata.data"
            elencoCampi = " (temperatura,umidita,pressione,altitudine)"
            elencoValori = " VALUES (" + str(temperatura) + " , " + str(umidita) + " , " + str(pressione) + " , " + str(altitudine) + ");"

            query = comando + elencoCampi + elencoValori
            curs.execute(query)
            
            emit('cansat-data', {
                'seconds'     : round(timeInSeconds, 1),
                'temperatura' : temperatura,
                'umidita'     : umidita,
                'pressione'   : pressione,
                'altitudine'  : altitudine
            })

            time.sleep(0.1)
            

    except Exception as e:
        print('error on line {}'.format(sys.exc_info()[-1].tb_lineno), " ", type(e).__name__, " ", e)

if __name__ == "__main__":
    socketio.run(app)