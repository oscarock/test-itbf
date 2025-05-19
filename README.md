# Hotel Management System 🏨✨

**Manage your hotels and rooms with ease!**

This full-stack application provides a robust backend API built with Laravel (PHP) and a dynamic frontend interface built with React (TypeScript) and Vite, all containerized with Docker for easy setup and deployment.

---

## 📋 Table of Contents

*   [🚀 About The Project](#-about-the-project)
*   [✨ Features](#-features)
*   [🛠️ Tech Stack](#️-tech-stack)
*   [🏁 Getting Started](#-getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation & Setup](#installation--setup)
*   [🏗️ Project Structure](#️-project-structure)
*   [🔗 API Endpoints](#-api-endpoints)
*   [🤝 Contributing](#-contributing)
*   [📄 License](#-license)

---

## 🚀 About The Project

This project is a hotel and room management system. It allows users to:
*   View a list of hotels.
*   Add new hotels with details like name, address, city, NIT, and number of rooms.
*   View details of a specific hotel, including its rooms.
*   Add different types of rooms (e.g., Standard, Junior, Suite) with specific accommodations (e.g., Single, Double, Triple) to a hotel.
*   Delete hotels and rooms.

The application is designed with a decoupled architecture, where the backend serves a RESTful API and the frontend consumes it.

---

## ✨ Features

*   **Hotel Management:** CRUD operations for hotels.
*   **Room Management:** Add and manage rooms within hotels, specifying type and accommodation.
*   **Interactive UI:** User-friendly interface built with React and Bootstrap.
*   **API Driven:** Backend API for all data operations.
*   **Containerized:** Easy to set up and run using Docker Compose.
*   **Responsive Design:** Basic responsiveness for different screen sizes.

---

## 🛠️ Tech Stack

*   **Backend:**
    *   [PHP](https://www.php.net/)
    *   [Laravel](https://laravel.com/)
    *   [PostgreSQL](https://www.postgresql.org/)
*   **Frontend:**
    *   [React](https://reactjs.org/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Vite](https://vitejs.dev/)
    *   [Bootstrap](https://getbootstrap.com/)
*   **DevOps:**
    *   [Docker](https://www.docker.com/)
    *   [Docker Compose](https://docs.docker.com/compose/)
*   **Web Server:**
    *   [Nginx](https://www.nginx.com/) (as reverse proxy)

---

## 🏁 Getting Started

Follow these steps to get your local development environment up and running.

### Prerequisites

*   [Git](https://git-scm.com/)
*   [Docker](https://www.docker.com/products/docker-desktop/) installed and running.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/oscarock/test-itbf # Or your repository URL
    cd test-itbf # Or your project directory
    ```

2.  **Configure Backend Environment:**
    Navigate to the `app-backend` directory. Copy the example environment file and customize it if needed. The default settings are configured for the Docker setup.
    ```sh
    cd app-backend
    cp .env.example .env
    ```
    The relevant database section in `.env` should look like this for the Docker setup:
    ```env
    DB_CONNECTION=pgsql
    DB_HOST=db
    DB_PORT=5432
    DB_DATABASE=prueba_hoteles
    DB_USERNAME=postgres
    DB_PASSWORD=secret
    ```
    Return to the project root directory:
    ```sh
    cd ..
    ```

3.  **Build and Run with Docker Compose:**
    From the root of the project, run:
    ```sh
    docker compose up -d --build
    ```
    This command will build the images for the frontend, backend, and database services and start them in detached mode.

4.  **Verify Containers:**
    Check if all containers are running:
    ```sh
    docker ps -a
    ```
    You should see three containers: one for the frontend, one for the backend, and one for the PostgreSQL database.

5.  **Run Backend Migrations:**
    Execute the database migrations within the backend container. First, find your backend container ID using `docker ps -a`.
    ```sh
    docker exec -it <YOUR_BACKEND_CONTAINER_ID_OR_NAME> bash
    ```
    Once inside the container's shell, run:
    ```sh
    php artisan migrate
    exit
    ```
    *(Alternatively, you can often use the service name from `docker-compose.yml`, e.g., `docker exec -it app-backend-container php artisan migrate` if your service is named `app-backend-container`)*

6.  **Access the Application:**
    If default ports haven't been changed:
    *   **Frontend:** [http://localhost:3000](http://localhost:3000)
    *   **Backend API:** [http://localhost:85](http://localhost:85) (or the port mapped in your `docker-compose.yml` for Nginx)

You should now be able to interact with the application through the frontend.

---

## 🏗️ Project Structure

The project is organized into two main directories:

*   `app-backend/`: Contains the Laravel (PHP) backend application.
    *   `app/`: Core code including Models, Controllers, Providers.
    *   `routes/`: API and web route definitions.
    *   `database/`: Migrations and seeders.
    *   `config/`: Application configuration files.
    *   `Dockerfile`: Instructions to build the backend Docker image.
*   `app-frontend/`: Contains the React (TypeScript) frontend application.
    *   `src/`: Source files for the React app.
        *   `components/`: Reusable UI components.
        *   `App.tsx`: Main application component.
        *   `index.tsx`: Entry point for the React app.
    *   `public/`: Static assets.
    *   `Dockerfile`: Instructions to build the frontend Docker image.
*   `docker-compose.yml`: Defines the multi-container Docker application (frontend, backend, database, nginx).
*   `nginx.conf`: Nginx configuration for reverse proxying requests to the backend and serving frontend static files (if applicable to your setup).

---

## 🔗 API Endpoints

The backend exposes the following primary API endpoints (managed by [`api.php`](app-backend/routes/api.php:1)):

*   **Hotels:**
    *   `GET /api/hoteles`: Get a list of all hotels.
    *   `POST /api/hoteles`: Create a new hotel.
    *   `GET /api/hoteles/{id}`: Get details of a specific hotel.
    *   `PUT /api/hoteles/{id}`: Update an existing hotel.
    *   `DELETE /api/hoteles/{id}`: Delete a hotel.
*   **Habitaciones (Rooms):**
    *   `POST /api/hoteles/{hotel_id}/habitaciones`: Add a new room to a specific hotel.
    *   `DELETE /api/habitaciones/{id}`: Delete a specific room.

*(Authentication for `/api/user` is via Sanctum, but other routes appear to be open in the provided `api.php`)*

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information (if you choose to add one).

---

