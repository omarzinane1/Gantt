from flask import Flask, render_template, request, redirect, jsonify
import json
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route('/')
def index():
    with open('planning.json') as f:
        tasks = json.load(f)
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    data = request.form
    task = {
        "formule": data["formule"],
        "debut": data["debut"],
        "duree": int(data["duree"]),
        "type": data["type"]
    }
    with open('planning.json') as f:
        tasks = json.load(f)
    tasks.append(task)
    with open('planning.json', 'w') as f:
        json.dump(tasks, f, indent=4)
    return redirect('/')
