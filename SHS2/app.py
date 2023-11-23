import pyodbc
from flask import Flask, request, jsonify
from datetime import datetime
from cachetools import cached, LRUCache
import hashlib

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

# Cache setup with Consistent Hashing
cache = LRUCache(maxsize=128)  # You can adjust the cache size as needed

# Helper function for generating cache key
def generate_cache_key(*args, **kwargs):
    key = hashlib.md5(str(args).encode('utf-8') + str(kwargs).encode('utf-8')).hexdigest()
    return key


@app.route('/api/sensors/update', methods=['POST'])
def update_sensor_data():
        data = request.get_json()
        sensor_id = data['sensor_id']
        timestamp_str = data['timestamp']
        status = data['status']
        battery_level = data['battery_level']
        alert_message = data.get('alert_message')

        # Use dateutil.parser to parse the timestamp string
        timestamp = datetime.fromisoformat(timestamp_str)

        # Insert data into the database
        cursor = conn.cursor()
        cursor.execute ( '''
            INSERT INTO sensor_data (sensor_id, timestamp, status, battery_level, alert_message)
            VALUES (?, ?, ?, ?, ?)
        ''', sensor_id, timestamp, status, battery_level, alert_message)

        conn.commit()
        cursor.close()

        return jsonify(message='Sensor data updated successfully'), 200
# Decorator for caching with consistent hashing
@cached(cache, key=generate_cache_key)
def query_database_and_return_data(sensor_id):
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
        return response_data
    else:
        return None

@app.route('/api/sensors/status', methods=['GET'])
def get_sensor_status():
    sensor_id = request.args.get('sensor_id')

    # Use the cached function to query the database
    result = query_database_and_return_data(sensor_id)

    if result:
        return jsonify(result), 200
    else:
        return jsonify(message='Sensor data not found'), 404



@app.route('/api/status', methods=['GET'])
def service_status():
    return jsonify(status='active'), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # You can specify a port of your choice here
