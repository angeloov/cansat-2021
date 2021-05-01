from flask import Flask, render_template 
from flask_socketio import SocketIO , send, emit
import random
<<<<<<< HEAD
=======
import psycopg2

user = "postgres"
password = "Frecciax77"

con = psycopg2.connect(
    host="localhost",
    database="postgres",
    user=user,
    password=password)
>>>>>>> 52f4bb64c8c8198f48c543b8575b361478e63eb9

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

<<<<<<< HEAD
@app.route("/")
def home():
    socketio.emit('message', "heyyyyy")
=======
curs = con.cursor()
curs.execute("select exists(select * from cansat.tables where Data=%s)", ('Data',))
if cur.fetchone()[0] == False :
    curs.execute("CREATE TABLE Data (Temperatura int);")

@app.route("/")
def home():
>>>>>>> 52f4bb64c8c8198f48c543b8575b361478e63eb9
    return render_template("/home.html")

@app.route("/stats")
def stats():
    return render_template("/statistics.html")

<<<<<<< HEAD
# @socketio.on('message')
# def UpdateEvent():
    # emit('update',random.randrange(0,40))
=======
@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))
    emit('change value', {'data' : random.randrange(0,40)})
    cur = con.cursor()
    cur.execute("""SELECT datname from pg_database""")
    rows = cur.fetchall()
>>>>>>> 52f4bb64c8c8198f48c543b8575b361478e63eb9

if __name__ == "__main__":
    socketio.run(app)