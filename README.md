# Todo REST API - Complete CRUD Backend

A production-ready RESTful API built with **Node.js**, **Express**, and **MongoDB Atlas** for managing a todo list. This backend supports full **CRUD (Create, Read, Update, Delete)** operations with robust error handling and input validation.

> **Internship Project:** Backend Web Development Track (Week 1 Task)

---

## 🚀 Features

- ✅ **Full CRUD Operations:** Create, Read All, Read One (by ID), Update, and Delete todos.
- ✅ **Real Database Integration:** Persistent storage using MongoDB Atlas (Cloud).
- ✅ **Input Validation:** Automatic validation using Mongoose schemas (e.g., minimum length for title/description).
- ✅ **Centralized Error Handling:** Professional error responses for validation failures, invalid IDs, and server errors.
- ✅ **Async/Await & AsyncHandler:** Clean controller logic without repetitive try-catch blocks.
- ✅ **Environment Variables:** Secure management of sensitive data using `dotenv`.
- ✅ **CORS Enabled:** Ready to connect with any frontend application (React, Flutter, etc.).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for building REST APIs |
| **MongoDB Atlas** | Cloud-based NoSQL database |
| **Mongoose** | ODM (Object Data Modeling) library for MongoDB |
| **dotenv** | Environment variable management |
| **Nodemon** | Development tool for auto-restarting the server |
| **Postman** | API testing and documentation |

---

## 📁 Project Structure


```
todo-backend/
todo-backend/
├── models/
│ └── Todo.js # Mongoose schema & model
├── controllers/
│ └── todoController.js # Business logic (CRUD operations)
├── routes/
│ └── todoRoutes.js # API route definitions
├── middleware/
│ └── errorMiddleware.js # Centralized error handler
├── utils/
│ └── asyncHandler.js # Wrapper to catch async errors
├── tests/ # Automated tests (node:test, no database needed)
├── .env.example # Example environment variables
├── screenshots/ # Postman test screenshots (optional)
├── server.js # Main application entry point
├── .env # Environment variables (ignored by Git)
├── .gitignore # Files/folders ignored by Git
├── package.json # Dependencies and scripts
└── README.md # Project documentation
```

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (version 14 or higher)  
- npm or Yarn  
- MongoDB Atlas account (or a local MongoDB instance)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Awaisranahmad/todo-rest-api.git
   cd todo-rest-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root with the following contents:

   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_atlas_connection_string>
   ```

   Replace `<your_mongodb_atlas_connection_string>` with your actual MongoDB connection URI.

4. **Start the server**

   ```bash
   npm run dev
   ```

   The server will start and listen on `http://localhost:5000`.

## API Endpoints

### Create a New Todo

- **Endpoint:** `POST /todos`  
- **Description:** Create a new todo item.  
- **Request Body (JSON):**

  ```json
  {
    "title": "MongoDB Atlas setup karo",
    "description": "Cluster banao aur Node.js se connect karo"
  }
  ```

- **Success Response (201 Created):**

  ```json
  {
    "success": true,
    "message": "Todo created successfully",
    "data": {
      "title": "MongoDB Atlas setup karo",
      "description": "Cluster banao aur Node.js se connect karo",
      "completed": false,
      "_id": "6a6f2ba41b63b2f56c13abdc",
      "createdAt": "2026-08-02T11:36:04.045Z",
      "__v": 0
    }
  }
  ```

- **Error Response (400 Bad Request):**

  ```json
  {
    "success": false,
    "message": "Title and description are required"
  }
  ```
  
### GET /todos/:id (Get Single Todo):

  ```json
  {
  "success": true,
  "data": {
    "_id": "66a1b2c3d4e5f67890abcd12",
    "title": "Learn Backend Development",
    "description": "Complete the internship task",
    "completed": false,
    "createdAt": "2026-08-04T10:00:00.000Z"
  }}
  ```
  
   - **Error Response (400 Bad Request):**

  ```json
  {
    "success": false,
    "message": "Title and description are required"
  }
  ```
 ###  PUT /todos/:id (Update a Todo):
 
   **Request Body (JSON):** 
   ```json
      {
  "title": "Backend Development Completed",
  "description": "Successfully built the REST API",
  "completed": true
}
```
   - **Success Response (200 OK):**

  ```json
  {
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "_id": "66a1b2c3d4e5f67890abcd12",
    "title": "Backend Development Completed",
    "description": "Successfully built the REST API",
    "completed": true,
    "createdAt": "2026-08-04T10:00:00.000Z"
  }
}
  ```      
### DELETE /todos/:id (Delete a Todo)
- **Success Response (200 OK):**
  
  ```json
  {
  "success": true,
  "message": "Todo deleted successfully",
  "data": {
    "_id": "66a1b2c3d4e5f67890abcd12",
    "title": "Backend Development Completed",
    "description": "Successfully built the REST API",
    "completed": true
  } }

  ```  
    

### Get All Todos

- **Endpoint:** `GET /todos`  
- **Description:** Retrieve all todo items (sorted by latest first).  
- **Success Response (200 OK):**

  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "6a6f2e05822da08cdbaf9ab8",
        "title": "Data enter",
        "description": "Cluster12 banao aur Node.js se connect karo",
        "completed": false,
        "createdAt": "2026-08-02T11:46:13.468Z",
        "__v": 0
      },
      {
        "_id": "6a6f2ba41b63b2f56c13abdc",
        "title": "MongoDB Atlas setup karo",
        "description": "Cluster banao aur Node.js se connect karo",
        "completed": false,
        "createdAt": "2026-08-02T11:36:04.045Z",
        "__v": 0
      }
    ]
  }
  ```

## Testing

Automated tests run with Node's built-in test runner — no database needed:

```bash
npm test
```

21 tests cover the error middleware (CastError → 400, ValidationError → 400,
explicit `statusCode` honoured, stack trace hidden outside development),
the Todo schema validation (required fields, min lengths, trimming),
the `asyncHandler` wrapper, the `createTodo` 400 regression (missing
title/description used to answer 500), and the server wiring (the `/todos`
router mounted once, error handler registered after the routes).

This API was also tested using Postman. The following scenarios were verified:

- **POST /todos:** Successfully created a new todo item (201 Created).
- **GET /todos:** Successfully retrieved all existing todos (200 OK).
- Data persistence was verified in MongoDB Atlas using MongoDB Compass.

##🧪 Error Handling Strategy

The API uses a Centralized Error Handling Middleware to catch all errors in one place, eliminating repetitive `try-catch` blocks in controllers.

- **Validation Errors (`400 Bad Request`):** Triggered when a field fails Mongoose validation (e.g., title shorter than 3 characters).  
- **Cast Errors (`400 Bad Request`):** Triggered when an invalid ID format is provided. 
- **Not Found Errors (`404 Not Found`):** Triggered when a todo with the given ID does not exist in the database. 
- **Server Errors (500 Internal Server Error):** Triggered for any unexpected server-side issues.

### 📸 Postman Testing Screenshots
(Add your screenshots here after taking them)

**POST** `/todos` – 201 Created
<img width="1185" height="973" alt="Screenshot 2026-08-02 163622" src="https://github.com/user-attachments/assets/0e3163a4-59fe-4182-89a5-78e41c0072a1" />

**GET** `/todos/:id` – 200 OK
<img width="1025" height="860" alt="Screenshot 2026-08-02 164709" src="https://github.com/user-attachments/assets/8fb52c81-2cc5-49d3-ae1e-1705fbc765c8" />

**DELETE** `/todos/:id` – 200 OK
<img width="941" height="1007" alt="Screenshot 2026-08-03 202529" src="https://github.com/user-attachments/assets/c85ba5e4-9a30-4e0b-86cc-caff10eadc5f" />

## Changelog

### 2026-11-23 — Error handling actually wired up + tests
- **Fixed:** the centralized error middleware was required in `server.js`
  but never registered with `app.use()`, so every error fell through to
  Express's default HTML error page. It is now registered after all routes.
- **Fixed:** `app.use('/todos', todoRoutes)` was mounted twice — now once.
- **Fixed:** `POST /todos` without title/description answered **500**
  instead of 400 (the old try/catch only mapped `ValidationError` to 400).
  `createTodo` now uses `asyncHandler` like the other controllers and throws
  an error with `statusCode: 400`; the error middleware honours it.
- **Fixed:** typo in the not-found message (`'todo id not fond'` →
  `'Todo id not found'`).
- **Fixed:** `package.json` said `"main": "index.js"` but the entry point is
  `server.js`.
- **Added:** `tests/` — 21 automated tests (`npm test`, no database needed)
  covering the error middleware, Todo validation, `asyncHandler`, the
  `createTodo` 400 regression, and the server wiring.
- **Added:** `.env.example`; `server.js` now exports the app and only
  listens when run directly, so it can be imported by tests.

## Author

**Rana Awais Ahmad** 
GitHub: [Awaisranahmad](https://github.com/Awaisranahmad)
