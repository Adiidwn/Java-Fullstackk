# Fullstack Application with Java Spring Boot and React

This project is a fullstack application using Java Spring Boot for the backend and React for the frontend. It manages user details and provides functionality for creating, reading, updating, and deleting user information.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Backend](#setup-backend)
- [Setup Frontend](#setup-frontend)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Java JDK 11 or later**: Required for running the Spring Boot application.
- **Node.js**: Required for running the React application.
- **Maven**: Required for building the Spring Boot application.
- **Git**: Required for version control.

## Setup Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YourUsername/Java-Fullstackk.git
   cd Java-Fullstackk
   ```

2. Navigate to the backend directory:

bash
cd server-side

3. Build and run the Spring Boot application:
   ./mvnw spring-boot:run
   The backend server will start on http://localhost:8080.

Setup Frontend
Navigate to the frontend directory:
cd ../client-side
npm install
npm start
The frontend will be available at http://localhost:3000.

Usage
Open your web browser and navigate to http://localhost:3000 to access the React frontend.
Use the application to manage user details. You can add, edit, delete, and view user information.
The search functionality allows you to filter users by NIK and full name.
API Endpoints
GET /api/v1/user-details: Retrieve all user details.
POST /api/v1/user-details: Create a new user.
PUT /api/v1/user-details/{id}: Update an existing user.
DELETE /api/v1/user-details/{id}: Delete a user
