from flask import Flask, render_template 
from flask_socketio import SocketIO , send, emit
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def home():
    socketio.emit('message', "heyyyyy")
    return render_template("/home.html")

@app.route("/stats")
def stats():
    return render_template("/statistics.html")

# @socketio.on('message')
# def UpdateEvent():
    # emit('update',random.randrange(0,40))

if __name__ == "__main__":
    socketio.run(app)