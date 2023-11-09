## Overview

The Distributed Data Management System for Climate Control Devices is a sophisticated solution designed to monitor, manage, and optimize environmental conditions within controlled agriculture settings like greenhouses and vertical farms. This system leverages microservices architecture and distributed data management to enhance plant growth, automate maintenance, and ensure efficient resource utilization. This distributed system is an important software part of my bachelor thesis project.

## Application Suitability Assessment:

- **Complexity of Components:** Climate control systems involve diverse parameters like temperature, humidity, and light intensity, demanding specialized management.
- **Scalability Requirements:** Agriculture facilities vary in size; independent scaling of microservices optimizes resource utilization.
- **Maintenance Criticality:** Proactive sensor health monitoring and maintenance scheduling are essential for uninterrupted operations.
- **Data Management and Analysis:** Microservices enable specialized data handling and analysis for optimizing plant growth and resource usage.
- **Faster Development:** Teams can work on different microservices concurrently, enabling faster development and updates.
- **Technology Flexibility:** Different components may require varying technologies and frameworks, well-suited for microservices' flexibility.

**Real-world Examples**:

- **Facebook:** Employs microservices for user authentication, content delivery, and real-time notifications.
- **Netflix:** Utilizes microservices for content recommendation, user management, and content delivery.
- **Uber:** Manages ride requests, driver dispatch, and payment processing through microservices.

## Define Service Boundaries:

Here are defined service boundaries as well as the boundaries for shared components.

**Climate Control Services (CCS)**:

- **Functionality and Responsibilities:**
    - Manages climate parameters (e.g., temperature, humidity) and their control.
    - Receives and processes climate data updates from external sources.
    - Provides real-time status information about the climate conditions.
    - Offers historical climate data retrieval for analysis and reporting.
    - Generates alerts in response to critical climate conditions.
    - Allows configuration of climate control settings, including setpoints.
    - Implements resource utilization monitoring and provides insights into system performance.
    - Utilizes caching for optimizing data retrieval.
    - Implements unit testing for climate control-related functionalities.

**Sensor Health Service (SHS):**

- **Functionality and Responsibilities:**
    - Monitors the health and status of sensors deployed in the controlled environment.
    - Receives and processes sensor health data updates.
    - Provides real-time status information about sensors, including their operational status and health metrics.
    - Generates alerts in response to sensor-related issues or anomalies.
    - Allows scheduling and management of sensor maintenance tasks.
    - Provides sensor configuration options, including calibration parameters.
    - Offers diagnostics for assessing sensor health and performance.
    - Enables data export of sensor health information for external analysis.
    - Supports firmware updates for sensors.
    - Utilizes caching for optimizing data retrieval.
    - Implements unit testing for sensor health-related functionalities.

**Shared Components:**

**Gateway Service:**

- **Responsibility:** The Gateway Service acts as a reverse proxy and load balancer, receiving incoming requests from external systems and directing them to the appropriate microservice (Climate Control Service or Sensor Health Service) based on routing rules. It handles load balancing to distribute requests evenly among microservice instances.

**Service Discovery:**

- **Responsibility:** The Service Discovery component maintains a registry of microservice instances and their network locations. It enables dynamic service discovery for the Gateway Service to route requests to the correct microservice instances. It provides registration and discovery mechanisms for microservices.

**Monitoring and Alerting System:**

- **Responsibility:** The Monitoring and Alerting System is responsible for collecting performance metrics, logs, and telemetry data from both the Climate Control Service and Sensor Health Service. It generates alerts based on predefined criteria and provides insights into the health and performance of the entire system.

**Unit Testing Frameworks**:

Responsibility: Unit Testing Frameworks are used for testing the individual microservices. They facilitate automated testing of code components within the Climate Control Service (using xUnit in C#) and the Sensor Health Service (using PyTest in Python). These frameworks ensure the reliability and correctness of microservice functionalities.

## Diagram:

![mermaid-diagram-2023-09-20-175630](https://github.com/AnnaWeber07/PAD_Labs/assets/78998404/30020359-de18-44fb-9cae-51d31540b36c)

## Tech Stack & Communication Patterns:

**Climate Control Services (CCS)**:

- **Technology Stack:** C# (ASP.NET Core)
    - **Web Framework:** ASP.NET Core for building RESTful APIs.
    - **Database Access:** Entity Framework Core for database interactions.
    - **Caching:** Redis for caching frequently accessed data.
    - **Testing Framework:** xUnit for unit testing.

**Sensor Health Service (SHS):**

- **Technology Stack:** Python
    - **Web Framework:** Flask for building RESTful APIs.
    - **Database Access:** SQLAlchemy for database interactions.
    - **Caching:** Redis for caching frequently accessed data.
    - **Testing Framework:** PyTest for unit testing.

 **Shared Components**:
 
- **Gateway Service:**
    - **Technology Stack:** C# (ASP.NET Core) or Python (Flask) for the Gateway Service, matching the technology stack of the microservices.
    - **Load Balancing:** Round-robin load balancing for distributing requests.
- **Service Discovery:**
    - **Technology Stack:** C# (ASP.NET Core) or Python (Flask) for the Service Discovery component, matching the technology stack of the microservices.
- **Monitoring and Alerting System:**
    - **Technology Stack:** Azure Monitor and Azure Log Analytics for monitoring and alerting. This system is technology-agnostic and can interact with both C# and Python microservices.
- **Unit Testing Frameworks:**
    - **Technology Stack:** xUnit for C# (CCS) and PyTest for Python (SHS). Each microservice uses its respective testing framework.

## Data Management Design:

In the provided system architecture diagram:

- The **Climate Control Service (CCS)** and the **Sensor Health Service (SHS)** communicate indirectly through the **Gateway Service**.
- The communication between CCS and SHS is facilitated by the architecture's components, primarily through the Gateway Service, shared databases, and cache servers.

Here's a description of the data flow between CCS and SHS:

1. **Climate Control Service (CCS):**
    - CCS is responsible for managing climate control data and functions. It communicates with the Gateway Service for various purposes.
    - When CCS needs to access or update climate control data, it interacts with its dedicated database, referred to as the **CCS_Database**. This database stores information related to climate control settings, historical data, and other climate-related parameters.
    - CCS also utilizes a shared cache server, denoted as the **Shared_Cache_Server**, for caching frequently accessed climate control data. This cache server helps improve data retrieval performance.
2. **Sensor Health Service (SHS):**
    - SHS focuses on monitoring the health and status of sensors. It communicates with the Gateway Service for its data needs.
    - When SHS needs to access or update sensor health-related data, it interacts with its dedicated database, referred to as the **SHS_Database**. This database stores information about sensor statuses, battery levels, and alerts.
    - Similar to CCS, SHS also utilizes the shared cache server, the **Shared_Cache_Server**, to cache sensor health data, enhancing data retrieval efficiency.
3. **Gateway Service:**
    - The **Gateway_Service** acts as an intermediary that routes requests and data between external systems, such as Users and External Services, and the internal microservices like CCS and SHS.
    - It provides load balancing for distributing incoming requests between the Climate Control Service and the Sensor Health Service to ensure efficient resource utilization and high availability.
    - The Gateway_Service also handles service discovery, allowing external systems and services to locate and communicate with CCS and SHS.
4. **Monitoring and Alerting System:**
    - The **Monitoring_and_Alerting_System** is responsible for monitoring the status and health of both CCS and SHS.
    - It collects monitoring data and alerts from both services. This data includes climate control status and sensor health metrics.
    - The Monitoring_and_Alerting_System communicates with CCS and SHS for monitoring purposes. It retrieves data about climate control and sensor health through their respective monitoring endpoints.
    - Additionally, it interacts with both CCS and SHS to collect logs related to their operations, facilitating monitoring and diagnostics.

Here's a short overview of data management and endpoints that are to be implemented:

**Climate Control Service (CCS) Endpoints:**

1. **Update Climate Data**
    - URL: `/api/climate/update`
    - Method: `POST`
    - Request JSON:
        
        ```json
        {
          "timestamp": "2023-09-15T10:30:00",
          "temperature": 25.5,
          "humidity": 60.2
        }
        
        ```
        
    - Description: Updates climate data with timestamp, temperature, and humidity readings.
2. **Get Climate Status**
    - URL: `/api/climate/status`
    - Method: `GET`
    - Response JSON:
        
        ```json
        {
          "timestamp": "2023-09-15T10:30:00",
          "temperature": 25.5,
          "humidity": 60.2,
          "status": "Normal"
        }
        
        ```
        
    - Description: Retrieves the current climate status with timestamp, temperature, humidity, and status information.
3. **Get Historical Climate Data**
    - URL: `/api/climate/history`
    - Method: `GET`
    - Query Parameters:
        - `start_date` (e.g., "2023-09-01")
        - `end_date` (e.g., "2023-09-15")
    - Response JSON:
        
        ```json
        [
          {
            "timestamp": "2023-09-10T14:00:00",
            "temperature": 26.0,
            "humidity": 59.8
          },
          {
            "timestamp": "2023-09-11T15:00:00",
            "temperature": 25.8,
            "humidity": 60.0
          }
        ]
        
        ```
        
    - Description: Retrieves historical climate data within a specified date range.
4. **Get Climate Alerts**
    - URL: `/api/climate/alerts`
    - Method: `GET`
    - Response JSON:
        
        ```json
        [
          {
            "timestamp": "2023-09-15T12:30:00",
            "message": "High temperature alert"
          },
          {
            "timestamp": "2023-09-16T08:45:00",
            "message": "Humidity level too low"
          }
        ]
        
        ```
        
    - Description: Retrieves climate-related alerts with timestamp and alert messages.

**Sensor Health Service (SHS) Endpoints:**

1. **Update Sensor Data**
    - URL: `/api/sensors/update`
    - Method: `POST`
    - Request JSON:
        
        ```json
        {
          "sensor_id": "12345",
          "timestamp": "2023-09-15T10:30:00",
          "status": "Operational",
          "battery_level": 85
        }
        
        ```
        
    - Description: Updates sensor health data with sensor ID, timestamp, status, and battery level.
2. **Get Sensor Status**
    - URL: `/api/sensors/status`
    - Method: `GET`
    - Response JSON:
        
        ```json
        {
          "sensor_id": "12345",
          "timestamp": "2023-09-15T10:30:00",
          "status": "Operational",
          "battery_level": 85
        }
        
        ```
        
    - Description: Retrieves the current status of a sensor with sensor ID, timestamp, status, and battery level.
3. **Get Sensor Alerts**
    - URL: `/api/sensors/alerts`
    - Method: `GET`
    - Response JSON:
        
        ```json
        [
          {
            "sensor_id": "12345",
            "timestamp": "2023-09-16T08:45:00",
            "message": "Low battery alert"
          },
          {
            "sensor_id": "67890",
            "timestamp": "2023-09-17T14:20:00",
            "message": "Sensor offline"
          }
        ]
        
        ```
        
    - Description: Retrieves sensor-related alerts with sensor ID, timestamp, and alert messages.

These REST API endpoints provide specific fields for each service, making it clear what data can be sent or retrieved in JSON format. They cover climate control and sensor health operations, including updates, status retrieval, historical data, and alerts.

**Architecture Schema**
![image](https://github.com/AnnaWeber07/PAD_Labs/assets/78998404/0d6f33df-f2a0-43c3-bda2-5321a2a06b90)

With cache cluster:
![image](https://github.com/AnnaWeber07/PAD_Labs/assets/78998404/6b45af71-3e67-4345-b1c4-134f6bf49865)


To implement the architectural changes for lab 2, I will need to perform the following steps:

1. **Trip Circuit Breaker**:
   - Integrate a Circuit Breaker library into microservices. Configure it to monitor outgoing requests and open the circuit if multiple errors occur.
   - Define fallback mechanisms for when the circuit is open to gracefully handle failures.

2. **Service High Availability**:
   - Deploy multiple instances of each microservice behind a load balancer to ensure high availability. Use container orchestration tools like Kubernetes for container management and scaling.

3. **Logging with ELK Stack or Prometheus + Grafana**:
   - Set up an ELK (Elasticsearch, Logstash, Kibana) stack or Prometheus + Grafana for monitoring and logging.
   - Configure your microservices to send logs to either Elasticsearch or Prometheus using logging libraries or agents.

4. **Aggregate Data from ALL Services**:
   - Create a separate microservice or component responsible for aggregating data from all services.
   - Implement an API endpoint in the aggregator service that fetches data from individual microservices and combines it.

5. **Microservice-based 2 Phase Commits**:
   - Implement a coordinator service responsible for coordinating transactions across multiple databases.
   - Define a protocol for two-phase commit and have the coordinator interact with the microservices to ensure atomic transactions.

6. **Consistent Hashing for Cache**:
   - Use a consistent hashing algorithm (e.g., Ketama) to distribute cache data across multiple cache nodes. This ensures that cached data remains available even if nodes fail.

7. **Cache High Availability**:
   - Deploy multiple cache nodes and use a cache clustering or replication mechanism (e.g., Redis Cluster) to ensure availability even if some nodes fail.

8. **Long-running Saga Transactions with Coordinator**:
   - Implement a Saga Orchestrator pattern to manage long-running transactions across microservices.
   - Define a saga for your specific business process, and use a coordinator to handle the sequence of steps and compensating transactions.

9. **Database Redundancy/Replication + Failover**:
   - Choose a database that supports replication (e.g., PostgreSQL with streaming replication).
   - Set up a primary database and configure multiple replicas for redundancy. Implement automatic failover mechanisms.

10. **Data Warehouse with ETL**:
    - Create a separate ETL (Extract, Transform, Load) service or job.
    - Define ETL processes to periodically extract data from your databases, transform it to fit the data warehouse schema, and load it into the data warehouse.

11. **Deploy and Orchestrate**:
    - Dockerize all components, including microservices, databases, cache nodes, orchestrators, and ETL services.
    - Use a container orchestration platform like Kubernetes to manage deployment, scaling, and orchestration.

Remember to thoroughly test each component and the interactions between them to ensure the entire architecture functions as expected. Additionally, consider implementing monitoring, alerting, and recovery procedures for each component to handle potential failures in a production environment.

## Deployment & Scaling:

By implementing Docker containerization and Kubernetes orchestration, we ensure consistent, reliable, and scalable deployment of microservices. This approach allows us to manage resources efficiently, automatically scale services as needed, and maintain high availability for the Distributed Data Management System for Climate Control Devices.
