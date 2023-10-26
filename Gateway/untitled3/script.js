function sendRandomClimateData() {
    // Code for sending random climate data
    const climatePort = document.getElementById('climatePort').value;

    axios.post(`http://localhost:${climatePort}/api/climate/update`, {
        timestamp: "2023-09-15T10:30:00",
        temperature: Math.random() * 20 + 10,
        humidity: Math.random() * 40 + 30
    })
        .then(response => console.log('Climate Data Sent:', response.data))
        .catch(error => console.error('Error sending Climate Data:', error));
}

function sendRandomSensorData() {
    // Code for sending random sensor data
    const sensorPort = document.getElementById('sensorPort').value;

    axios.post(`http://localhost:${sensorPort}/api/sensors/update`, {
        sensor_id: "12345",
        timestamp: "2023-09-15T10:30:00",
        status: Math.random() > 0.5 ? "Operational" : "Faulty",
        battery_level: Math.random() * 100
    })
        .then(response => console.log('Sensor Data Sent:', response.data))
        .catch(error => console.error('Error sending Sensor Data:', error));
}

function updateStatus() {
    const climatePort = document.getElementById('climatePort').value;
    const sensorPort = document.getElementById('sensorPort').value;

    axios.get(`http://localhost:${climatePort}/api/climate/status`)
        .then(response => {
            document.getElementById('climateStatus').textContent = response.data;
        })
        .catch(error => console.error('Error getting Climate Status:', error));

    axios.get(`http://localhost:${sensorPort}/api/sensors/status?sensor_id=12345`)
        .then(response => {
            document.getElementById('sensorStatus').textContent = response.data;
        })
        .catch(error => console.error('Error getting Sensor Status:', error));
}

function fetchData() {
    const climatePort = document.getElementById('climatePort').value;
    const sensorPort = document.getElementById('sensorPort').value;

    axios.get(`http://localhost:${climatePort}/api/climate/history?start_date=2023-09-15T00:00:00&end_date=2023-09-15T23:59:59`)
        .then(response => displayClimateData(response.data))
        .catch(error => console.error('Error getting Climate Data:', error));

    axios.get(`http://localhost:${sensorPort}/api/sensors/status?sensor_id=12345`)
        .then(response => displaySensorData([response.data]))
        .catch(error => console.error('Error getting Sensor Data:', error));
}

function displayClimateData(data) {
    const dataTable = document.getElementById('climateDataTable');
    const chartData = {
        labels: [],
        temperature: [],
        humidity: []
    };

    data.forEach(entry => {
        const row = dataTable.insertRow();
        const keys = Object.keys(entry);
        keys.forEach((key, index) => {
            const cell = row.insertCell(index);
            cell.innerHTML = entry[key];
            if (key === 'timestamp') {
                chartData.labels.push(entry[key]);
            } else if (key === 'temperature') {
                chartData.temperature.push(entry[key]);
            } else if (key === 'humidity') {
                chartData.humidity.push(entry[key]);
            }
        });
    });

    const ctx = document.getElementById('climateChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: 'Temperature',
                    data: chartData.temperature,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Humidity',
                    data: chartData.humidity,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {type: 'linear', position: 'bottom'},
                y: {min: 0, max: 100}
            }
        }
    });
}

function displaySensorData(data) {
    const dataTable = document.getElementById('sensorDataTable');
    data.forEach(entry => {
        const row = dataTable.insertRow();
        const keys = Object.keys(entry);
        keys.forEach((key, index) => {
            const cell = row.insertCell(index);
            cell.innerHTML = entry[key];
        });
    });
}

setInterval(() => {
    updateStatus();
    fetchData();
}, 5000);

updateStatus();
fetchData();
function sendRandomClimateData() {
    const port = document.getElementById('climatePort').value;
    const endpoint = `http://localhost:${port}/api/climate/update`;

    const randomTemperature = Math.random() * (30 - 10) + 10;
    const randomHumidity = Math.random() * (80 - 40) + 40;

    const data = {
        timestamp: new Date().toISOString(),
        temperature: randomTemperature.toFixed(2),
        humidity: randomHumidity.toFixed(2)
    };

    axios.post(endpoint, data)
        .then(response => {
            console.log('Random Climate Data Sent:', response.data);
        })
        .catch(error => {
            console.error('Error Sending Random Climate Data:', error);
        });
}

function sendRandomSensorData() {
    const port = document.getElementById('sensorPort').value;
    const endpoint = `http://localhost:${port}/api/sensors/update`;

    const randomSensorId = Math.floor(Math.random() * 1000) + 1;
    const randomStatus = Math.random() < 0.5 ? 'Operational' : 'Error';
    const randomBatteryLevel = Math.random() * (100 - 50) + 50;

    const data = {
        sensor_id: randomSensorId,
        timestamp: new Date().toISOString(),
        status: randomStatus,
        battery_level: randomBatteryLevel.toFixed(2)
    };

    axios.post(endpoint, data)
        .then(response => {
            console.log('Random Sensor Data Sent:', response.data);
        })
        .catch(error => {
            console.error('Error Sending Random Sensor Data:', error);
        });
}
let climateEndpoints = [];
let sensorEndpoints = [];

function sendRandomClimateData() {
    const port = document.getElementById('climatePort').value;
    const endpoint = `http://localhost:${port}/api/climate/update`;

    const randomTemperature = Math.random() * (30 - 10) + 10;
    const randomHumidity = Math.random() * (80 - 40) + 40;

    const data = {
        timestamp: new Date().toISOString(),
        temperature: randomTemperature.toFixed(2),
        humidity: randomHumidity.toFixed(2)
    };

    axios.post(endpoint, data)
        .then(response => {
            console.log('Random Climate Data Sent:', response.data);
        })
        .catch(error => {
            console.error('Error Sending Random Climate Data:', error);
        });
}

function sendRandomSensorData() {
    const port = document.getElementById('sensorPort').value;
    const endpoint = `http://localhost:${port}/api/sensors/update`;

    const randomSensorId = Math.floor(Math.random() * 1000) + 1;
    const randomStatus = Math.random() < 0.5 ? 'Operational' : 'Error';
    const randomBatteryLevel = Math.random() * (100 - 50) + 50;

    const data = {
        sensor_id: randomSensorId,
        timestamp: new Date().toISOString(),
        status: randomStatus,
        battery_level: randomBatteryLevel.toFixed(2)
    };

    axios.post(endpoint, data)
        .then(response => {
            console.log('Random Sensor Data Sent:', response.data);
        })
        .catch(error => {
            console.error('Error Sending Random Sensor Data:', error);
        });
}

function registerEndpoint(type, event) {
    event.preventDefault();
    const endpointInput = document.getElementById(`${type}Endpoint`);
    const portInput = document.getElementById(`${type}Port`);

    const endpoint = endpointInput.value.trim();
    const port = portInput.value.trim();

    if (endpoint && port) {
        const endpointObj = { endpoint, port };

        if (type === 'climate') {
            climateEndpoints.push(endpointObj);
            console.log('Climate Endpoint Registered:', endpointObj);
            localStorage.setItem('climateEndpoints', JSON.stringify(climateEndpoints));
        } else if (type === 'sensor') {
            sensorEndpoints.push(endpointObj);
            console.log('Sensor Endpoint Registered:', endpointObj);
            localStorage.setItem('sensorEndpoints', JSON.stringify(sensorEndpoints));
        }
    }

    endpointInput.value = '';
    portInput.value = '';
}

// Load previously saved endpoints from local storage (if any)
window.addEventListener('load', function() {
    const savedClimateEndpoints = JSON.parse(localStorage.getItem('climateEndpoints'));
    const savedSensorEndpoints = JSON.parse(localStorage.getItem('sensorEndpoints'));

    if (savedClimateEndpoints) {
        climateEndpoints = savedClimateEndpoints;
    }

    if (savedSensorEndpoints) {
        sensorEndpoints = savedSensorEndpoints;
    }

    console.log('Loaded Climate Endpoints:', climateEndpoints);
    console.log('Loaded Sensor Endpoints:', sensorEndpoints);
});
