from flask import Flask, render_template 
from flask_socketio import SocketIO , send, emit
import random
import psycopg2

user = "postgres"
password = "Frecciax77"

con = psycopg2.connect(
    host="localhost",
    database="CansatData",
    user=user,
    password=password)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def home():
    return render_template("/home.html")

@app.route("/stats")
def stats():
    return render_template("/statistics.html")

@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))
    emit('change value', {'data' : random.randrange(0,40)})
    cur = con.cursor()
    cur.execute("""SELECT datname from pg_database""")
    cur.execute("INSERT INTO datname(Temperatura) VALUES (10)")
    rows = cur.fetchall()
    for row in rows:
        print("   ", row[0])

if __name__ == "__main__":
    socketio.run(app)

con.close()