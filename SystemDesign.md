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

Here's a short overview of data management and endpoints that are to be implemented:


## Deployment & Scaling:

By implementing Docker containerization and Kubernetes orchestration, we ensure consistent, reliable, and scalable deployment of microservices. This approach allows us to manage resources efficiently, automatically scale services as needed, and maintain high availability for the Distributed Data Management System for Climate Control Devices.
