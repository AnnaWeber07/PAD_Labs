// Sample values, adjust as needed
let circuitBreakerOpen = false;
let consecutiveFailures = 0;
const maxConsecutiveFailures = 3; // Adjust as needed

// Function to gather and send data
function gatherAndSendData() {
    if (circuitBreakerOpen) {
        console.log('Circuit breaker is open. Skipping data gathering.');
        return;
    }

    // Gather data from combined endpoint
    axios.get('https://localhost:7277/combined/status')
        .then(response => {
            const combinedData = response.data;

            // Send climate data to microservice
            sendClimateDataToMicroservice(combinedData.climateData);

            // Send sensor data to microservice
            sendSensorDataToMicroservice(combinedData.sensorData);

            // Display data on the site
            displayClimateData(combinedData.climateData);
            displaySensorData(combinedData.sensorData);
        })
        .catch(error => {
            handleFailure('Combined Data', error);
        });
}

// Function to send climate data to microservice
function sendClimateDataToMicroservice(climateData) {
    const climatePort = document.getElementById('climatePort').value;

    axios.post(`http://localhost:${climatePort}/api/climate/update`, climateData)
        .then(response => console.log('Climate Data Sent:', response.data))
        .catch(error => {
            handleFailure('Sending Climate Data', error);
        });
}

// Function to send sensor data to microservice
function sendSensorDataToMicroservice(sensorData) {
    const sensorPort = document.getElementById('sensorPort').value;

    axios.post(`http://localhost:${sensorPort}/api/sensors/update`, sensorData)
        .then(response => console.log('Sensor Data Sent:', response.data))
        .catch(error => {
            handleFailure('Sending Sensor Data', error);
        });
}

// Function to handle failures
function handleFailure(operation, error) {
    consecutiveFailures++;
    console.error(`Error in ${operation}:`, error);

    if (consecutiveFailures >= maxConsecutiveFailures) {
        openCircuitBreaker();
    }

    // Retry after a timeout
    setTimeout(() => {
        gatherAndSendData();
    }, 5000); // Adjust the timeout as needed
}

// Function to open the circuit breaker
function openCircuitBreaker() {
    console.warn('Opening circuit breaker.');
    circuitBreakerOpen = true;

    // Schedule to close the circuit breaker after a cooldown period
    setTimeout(() => {
        console.log('Closing circuit breaker.');
        circuitBreakerOpen = false;
        consecutiveFailures = 0;
    }, 30000); // Adjust the cooldown period as needed
}

// Function to display climate data on the site
function displayClimateData(data) {
    console.log('Climate Data:', data);

    // Assuming data is an object with temperature and humidity properties
    document.getElementById('climateDataTable').innerHTML = `
        <tr>
            <td>${data.timestamp}</td>
            <td>${data.temperature}</td>
            <td>${data.humidity}</td>
        </tr>
    `;

    // Additional code to update other HTML elements or charts if needed
}

// Function to display sensor data on the site
function displaySensorData(data) {
    console.log('Sensor Data:', data);

    // Assuming data is an object with sensor information
    document.getElementById('sensorDataTable').innerHTML = `
        <tr>
            <td>${data.sensor_id}</td>
            <td>${data.timestamp}</td>
            <td>${data.status}</td>
            <td>${data.battery_level}</td>
            <td>${data.alertMessage}</td>
        </tr>
    `;

    // Additional code to update other HTML elements or charts if needed
}

// Call gatherAndSendData every second
setInterval(() => {
    gatherAndSendData();
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
