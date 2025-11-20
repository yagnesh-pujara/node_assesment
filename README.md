# User Management API -- Node.js Assessment

A clean and modular Node.js REST API built using:

- Express.js
- TypeORM (JavaScript)
- PostgreSQL (Supabase)
- JWT Authentication
- Bcrypt Password Hashing

This project implements all required CRUD and access-control
functionality for user management as described in the assessment.

------------------------------------------------------------------------

## 🚀 Features

### 🔐 Authentication

- Register a new user (Admin or Staff)
- Login with JWT
- Password hashed using bcrypt

### 👥 User Management

- List all users (Admin only)
- Search users by name or email
- Filter users by country
- Get user details:
  - Admin → can view any user
  - Staff → can view only their own details

### 🗄 Database

- PostgreSQL (Supabase)
- TypeORM migrations (JavaScript)

------------------------------------------------------------------------

## 📦 Project Structure

    src/
      controllers/
        authController.js
        userController.js
      middleware/
        auth.js
      routes/
        authRoutes.js
        userRoutes.js
      entity/
        User.js
      migrations/
      data-source.js
      app.js
    .env
    package.json

------------------------------------------------------------------------

## 🔧 Setup Instructions

### 1️⃣ Install Dependencies

    npm install

### 2️⃣ Configure Environment Variables

Create a `.env` file in project root with:

    DB_HOST=your_supabase_host
    DB_PORT=5432
    DB_USER=postgres
    DB_PASS=your_db_password
    DB_NAME=postgres
    JWT_SECRET=your_secret_key

Use your Supabase → Project Settings → Database credentials.

------------------------------------------------------------------------

## 🗄 Database Migrations

Generate migration (only when changes exist):

    npm run migration:generate

Run migrations:

    npm run migration:run

Revert last migration:

    npm run migration:revert

------------------------------------------------------------------------

## ▶ Start Server

    npm start

Server runs on:

    http://localhost:3000

------------------------------------------------------------------------

## 🧪 API Endpoints

## API List

### Auth APIs

```http
- POST /auth/register
- POST /auth/login
```

### Users APIs

```http
- GET /users
- GET /users/:id
````

#### Query Parameters for `/users`

- search → search by name or email
- country → filter by country

Examples:

    GET /users?search=john
    GET /users?country=india
    GET /users?search=john&country=india

Headers:

    Authorization: Bearer <token>

------------------------------------------------------------------------

## 🧰 Postman Collection

A Postman collection file is included:

    Node_Assessment.postman_collection.json

Import it into Postman to test all APIs.

------------------------------------------------------------------------
