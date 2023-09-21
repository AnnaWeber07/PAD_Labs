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

- **Climate Control Service:**
    - **Functionality:** Manages climate parameters (e.g., temperature, humidity, CO2 levels).
    - **Responsibilities:** Regulates environmental conditions, ensuring optimal plant growth.
    - **Technology Stack:** C# (Control Logic), RESTful APIs.
- **Sensor Health Monitoring:**
    - **Functionality:** Monitors the health and performance of sensors deployed throughout the facility.
    - **Responsibilities:** Detects issues in sensors, generates maintenance alerts.
    - **Technology Stack:** Python (Data Processing), Message Queues (Asynchronous Communication).
- **Maintenance Scheduler Service:**
    - **Functionality:** Schedules and logs maintenance tasks for sensors and climate control devices.
    - **Responsibilities:** Ensures proactive maintenance to prevent disruptions.
    - **Technology Stack:** C# for Control Logic, ASP.NET Core for RESTful APIs.
- **Data Visualization Service:**
    - **Functionality:** Provides a user-friendly interface for monitoring climate conditions and sensor health.
    - **Responsibilities:** Offers real-time data visualization, historical data analysis, and critical condition alerts.
    - **Technology Stack:** JavaScript (Interactive Data Visualization).

## Diagram:

![mermaid-diagram-2023-09-20-175630](https://github.com/AnnaWeber07/PAD_Labs/assets/78998404/30020359-de18-44fb-9cae-51d31540b36c)

## Tech Stack & Communication Patterns:



## Data Management Design:

Here's a short overview of data management and endpoints that are to be implemented:


## Deployment & Scaling:

By implementing Docker containerization and Kubernetes orchestration, we ensure consistent, reliable, and scalable deployment of microservices. This approach allows us to manage resources efficiently, automatically scale services as needed, and maintain high availability for the Distributed Data Management System for Climate Control Devices.
