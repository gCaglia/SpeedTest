# SpeedTest

SpeedTest is a self-hosted, full-stack internet speed testing application. It provides a modern, responsive web interface for measuring download and upload speeds, as well as latency. Built with a Svelte frontend and a Rust backend, the application is containerized using Docker, ensuring easy deployment and scalability.

## Features
- Download and Upload Speed Measurement: Accurately test your internet connection's throughput.
- Latency Testing: Measure the responsiveness of your connection.
- Modern UI: Responsive and intuitive interface built with Svelte.
- High-Performance Backend: Leveraging Rust for efficient and reliable performance.
- Containerized Deployment: Simplified setup using Docker and Docker Compose.

## Technologies Used
- Frontend: Svelte, TypeScript, CSS
- Backend: Rust
- Containerization: Docker, Docker Compose

## Getting Started
### Prerequisites
- Docker
- Docker Compose

### Installation
Clone the repository:

```bash
git clone https://github.com/gCaglia/SpeedTest.git
cd SpeedTest
```

Build and run the containers:
```bash
docker-compose up --build
```

Access the application:

Open your browser and navigate to http://localhost:3000 to use the SpeedTest interface.

## Project Structure

```
SpeedTest/
├── speedtest-frontend/   # Svelte frontend application
├── speedtest-backend/    # Rust backend service
├── docker-compose.yaml   # Docker Compose configuration
└── README.md             # Project documentation
```

##Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
License

This project is licensed under the MIT License.
