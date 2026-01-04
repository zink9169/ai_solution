# Backend API - Authentication System

A Node.js and Express backend with PostgreSQL (Neon) database and Supabase integration for file storage.

## Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ PostgreSQL Database (Neon)
- ✅ Supabase Setup (for future file storage)
- ✅ Input Validation
- ✅ Error Handling

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (Neon account)
- Supabase account (for file storage - optional)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your credentials:
   - **DATABASE_URL**: Your Neon PostgreSQL connection string
   - **JWT_SECRET**: A random secret key for JWT tokens
   - **SUPABASE_URL**: Your Supabase project URL (optional)
   - **SUPABASE_ANON_KEY**: Your Supabase anonymous key (optional)
   - **SUPABASE_SERVICE_ROLE_KEY**: Your Supabase service role key (optional)

## Database Setup

### Neon PostgreSQL Setup

1. Sign up at [Neon](https://neon.tech)
2. Create a new project
3. Copy your connection string (it will look like: `postgresql://user:password@host.neon.tech/dbname?sslmode=require`)
4. Add it to your `.env` file as `DATABASE_URL`

### Run Migrations

Run the migration script to create the necessary database tables:

```bash
npm run migrate
```

This will create:
- `users` table with email, password_hash, name, and timestamps
- Index on email for faster lookups

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in your `.env` file).

## API Endpoints

### Health Check
- **GET** `/health` - Check if server is running

### Authentication

#### Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePass123",
    "name": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "createdAt": "2024-01-01T00:00:00.000Z"
      },
      "token": "jwt_token_here"
    }
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "createdAt": "2024-01-01T00:00:00.000Z"
      },
      "token": "jwt_token_here"
    }
  }
  ```

#### Get Profile (Protected)
- **GET** `/api/auth/profile`
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    }
  }
  ```

## Password Requirements

- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Supabase File Storage (Future)

The Supabase client is configured and ready for future file storage implementation. The following helper functions are available:

- `uploadFile(bucket, filePath, file, options)` - Upload a file
- `deleteFile(bucket, filePath)` - Delete a file
- `getPublicUrl(bucket, filePath)` - Get public URL for a file

To use Supabase, make sure to configure the environment variables in your `.env` file.

## Project Structure

```
backend/
├── config/
│   ├── database.js       # PostgreSQL connection
│   └── supabase.js       # Supabase client setup
├── controllers/
│   └── auth.controller.js # Authentication logic
├── database/
│   └── migrate.js        # Database migrations
├── middleware/
│   └── auth.middleware.js # JWT authentication middleware
├── routes/
│   └── auth.routes.js    # Authentication routes
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js             # Main server file
```

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Environment variables are used for sensitive data
- Input validation is implemented using express-validator
- CORS is enabled (configure as needed for production)

## Error Handling

All errors are handled with appropriate HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## License

ISC
