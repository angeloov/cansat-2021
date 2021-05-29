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

# global vars
ComPort = 'COM12'
isConnected = False

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

def calculateAltitude(pressure):
    airDensity = 1.29
    gravitationalConstant = 9.81
    return (pressure / (airDensity * gravitationalConstant))

@socketio.on('start-receiving-data') # event fired by client
def startSendingDataToClient():
    print("Client connesso")

    try:
        # esp32Rx = serial.Serial(ComPort, 9600, timeout = 0)      
        isConnected = True
        timeInSeconds = 0
        
        while True:
            # inputLine = esp32Rx.readline()
            inputLine = "P10T10.2H9.198"

            timeInSeconds += 0.1

            parsedString = re.match("P(\d+\.?\d*)T(\d+\.?\d*)H(\d+\.?\d*)", inputLine).groups()

            pressione = parsedString[0]
            temperatura = parsedString[1]
            umidita = parsedString[2]
            altitudine =  calculateAltitude(float(pressione))
            
            comando = "INSERT INTO cansatdata.data"
            elencoCampi = " (temperatura,umidita,pressione,altitudine)"
            elencoValori = " VALUES (" + str(temperatura) + " , " + str(umidita) + " , " + str(pressione) + " , " + str(altitudine) + ");"

            query = comando + elencoCampi + elencoValori
            curs.execute(query)
            
            emit('cansat-data', {
                'isConnected' : isConnected,
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