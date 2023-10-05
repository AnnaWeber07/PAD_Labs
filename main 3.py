import pyodbc

from flask import Flask, request, jsonify, current_app
from werkzeug.exceptions import RequestTimeout
from datetime import timedelta

app = Flask(__name__)

# Set CORS headers for all routes
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Max-Age', '86400')  # 24 hours
    return response

# Connection string
CONNECTION_STRING = 'DRIVER={SQL Server};Server=DESKTOP-ENEG12R;Database=SHS;Integrated Security=SSPI;'
conn = pyodbc.connect(CONNECTION_STRING)

# Set the timeout for all requests (in seconds)
REQUEST_TIMEOUT = 0

@app.route('/api/sensors/update', methods=['POST'])
def update_sensor_data():
    data = request.get_json()
    sensor_id = data['sensor_id']
    timestamp = data['timestamp']
    status = data['status']
    battery_level = data['battery_level']
    alert_message = data.get('alert_message')

    # Insert data into the database
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO sensor_data (sensor_id, timestamp, status, battery_level, alert_message)
        VALUES (?, ?, ?, ?, ?)
    ''', sensor_id, timestamp, status, battery_level, alert_message)

    conn.commit()
    cursor.close()

    return jsonify(message='Sensor data updated successfully'), 200

@app.route('/api/sensors/status', methods=['GET'])
def get_sensor_status():
    sensor_id = request.args.get('sensor_id')

    # Retrieve data from the database
    cursor = conn.cursor()
    cursor.execute('SELECT TOP 1 * FROM sensor_data WHERE sensor_id = ? ORDER BY timestamp DESC', sensor_id)
    row = cursor.fetchone()
    cursor.close()

    if row:
        response_data = {
            'sensor_id': row.sensor_id,
            'timestamp': row.timestamp.strftime('%Y-%m-%dT%H:%M:%S'),
            'status': row.status,
            'battery_level': row.battery_level,
            'alert_message': row.alert_message
        }
        return jsonify(response_data), 200
    else:
        return jsonify(message='Sensor data not found'), 404

# Status endpoint to check if the service is active
@app.route('/api/status', methods=['GET'])
def service_status():
    return jsonify(status='active'), 200

# Register a request timeout handler for all routes
@app.before_request
def before_request():
    # Set the timeout for the current request
    current_app.config['timeout'] = REQUEST_TIMEOUT

@app.after_request
def after_request(response):
    # If the request has timed out, return a 408 Request Timeout response
    if getattr(request, '_timeout', False):
        return jsonify(message='Request Timeout'), 408

    return response

if __name__ == '__main__':
    app.run(debug=True)
