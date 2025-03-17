# Carmind Frontend

Carmind Frontend is an open-source web application for managing automotive-related data and receiving push notifications. Built with **Svelte**, **TypeScript**, and **Docker**, it provides a fast and scalable user interface.

## Features

- **Svelte** for a lightweight and reactive UI
- **TypeScript** for type safety and maintainability
- **Docker support** for seamless deployment
- **Web Push Notifications** for real-time updates
- **Environment Configuration** for flexible setups
- **Internationalization (i18n)** for multilingual support

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js v20.x.x** (Latest LTS strongly recommended)
- **npm** (comes with Node.js)
- **Docker** (for production setup, optional for development)

### Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/alealpha07/carmind-frontend.git
cd carmind-frontend

# Install dependencies
npm install
```

### Configuration

Copy the example environment file and configure necessary variables:

```sh
cp example.env .env
```

- Ensure the backend API URL and Web Push Notification settings are correctly configured.

### Development Mode

Start the development server with hot-reloading:

```sh
npm run dev
```

---

## Production Setup (Docker)

### Prerequisites

- **Docker** and **Docker Compose** installed

### Deployment

1. Copy the example Docker Compose file and adjust configurations as needed:
   ```sh
   cp example.docker-compose.yml docker-compose.yml
   ```
2. Build and run the container:
   ```sh
   docker compose up --build
   ```

---

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a pull request.

---

## Authors

- **Alessandro Prati**
- **Armando Scuotto**
