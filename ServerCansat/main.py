from flask import Flask, render_template 
from flask_socketio import SocketIO , send, emit
import random
import serial
import mysql.connector
from mysql.connector import errorcode

dbCansat = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    passwd='cansat',
    database='CansatData'
)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

curs = dbCansat.cursor()
curs.execute("select exists(select * from CansatData.data where temperatura=%s)", ('data',))
if curs.fetchone()[0] == None :
    curs.execute("CREATE TABLE data (temperatura int,areaatterraggio longtext,pressione int,gps longtext );")

@app.route("/")
def home():
    return render_template("/home.html")

@app.route("/stats")
def stats():
    return render_template("/statistics.html")

@socketio.on('my event')
def handle_my_custom_event(json):
    
    temperatura = random.randrange(0,40)
    atterraggio = "'0,1,2'"
    pressione = random.randrange(0,40)
    gps = "'32,42,377'"
    
    comando = "INSERT INTO cansatdata.data"
    elencoCampi = " (temperatura,areaatterraggio,pressione,gps)"
    elencoValori = " VALUES (" + str(temperatura) + " , " + atterraggio + " , " + str(pressione) + " , " + gps + ");"

    query = comando + elencoCampi + elencoValori

    curs.execute(query)
    
    emit('change value', {
        'temperatura' : temperatura,
        'atterraggio' : atterraggio,
        'pressione'   : pressione,
        'gps'         : gps
    })

    curs.execute("SELECT * FROM cansatdata.data")
  
    result = curs.fetchall()
    
    for row in result:
        print(row, '\n')

if __name__ == "__main__":
    socketio.run(app)
