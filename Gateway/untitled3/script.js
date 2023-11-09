function gatherAndSendData() {
    // Gather data from endpoints and send it to microservices
    const climatePort = document.getElementById('climatePort').value;
    const sensorPort = document.getElementById('sensorPort').value;

    // Gather climate data
    axios.get(`http://localhost:${climatePort}/api/climate/status`)
        .then(response => {
            const climateData = response.data;
            sendClimateDataToMicroservice(climateData);
            displayClimateData(climateData); // Display climate data
        })
        .catch(error => console.error('Error getting Climate Data:', error));

    // Gather sensor data
    axios.get(`http://localhost:${sensorPort}/api/sensors/status?sensor_id=12345`)
        .then(response => {
            const sensorData = response.data;
            sendSensorDataToMicroservice(sensorData);
            displaySensorData(sensorData); // Display sensor data
        })
        .catch(error => console.error('Error getting Sensor Data:', error));
}

function sendClimateDataToMicroservice(climateData) {
    const climatePort = document.getElementById('climatePort').value;

    axios.post(`http://localhost:${climatePort}/api/climate/update`, climateData)
        .then(response => console.log('Climate Data Sent:', response.data))
        .catch(error => console.error('Error sending Climate Data:', error));
}

function sendSensorDataToMicroservice(sensorData) {
    const sensorPort = document.getElementById('sensorPort').value;

    axios.post(`http://localhost:${sensorPort}/api/sensors/update`, sensorData)
        .then(response => console.log('Sensor Data Sent:', response.data))
        .catch(error => console.error('Error sending Sensor Data:', error));
}

function displayClimateData(data) {
    console.log('Climate Data:', data);
    // Add code here to display climate data on the site (e.g., update HTML elements)
}

function displaySensorData(data) {
    console.log('Sensor Data:', data);
    // Add code here to display sensor data on the site (e.g., update HTML elements)
}

setInterval(() => {
    gatherAndSendData(); // Gather and send data every second
}, 1000);

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
