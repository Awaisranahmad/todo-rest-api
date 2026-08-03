# Todo REST API

This project provides a Node.js, Express, and MongoDB based RESTful API for managing a simple todo list. The backend supports full CRUD (Create, Read, Update, Delete) operations.

## Features

- **Database Connection:** Connects to MongoDB Atlas using Mongoose for data persistence.  
- **Create Todo:** `POST /todos` – Add a new todo item.  
- **Get All Todos:** `GET /todos` – Retrieve all todos, sorted by creation date (latest first).  
- **Input Validation:** Ensures that the title and description meet minimum length requirements.  
- **Error Handling:** Returns appropriate HTTP status codes (e.g. 200, 201, 400, 500).

## Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB Atlas (Cloud)  
- **ODM:** Mongoose  
- **Environment Variables:** dotenv  
- **Development Tool:** Nodemon  

## Project Structure

```
todo-backend/
├── models/
│   └── Todo.js           # Mongoose schema for Todo items
├── controllers/
│   └── todoController.js # Business logic for todo operations
├── routes/
│   └── todoRoutes.js     # API route definitions
├── server.js             # Main server entry point
├── .env                  # Environment variables (ignored by Git)
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation (this file)
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

This API was tested using Postman. The following scenarios were verified:

- **POST /todos:** Successfully created a new todo item (201 Created).  
- **GET /todos:** Successfully retrieved all existing todos (200 OK).  
- Data persistence was verified in MongoDB Atlas using MongoDB Compass.

## Upcoming Features

The following features are planned for future development (Day 3):

- **Get Single Todo:** `GET /todos/:id` – Retrieve a specific todo by its ID.  
- **Update Todo:** `PUT /todos/:id` – Update an existing todo.  
- **Delete Todo:** `DELETE /todos/:id` – Remove a todo item.  
- **Centralized Error Handling:** Improved error management for the API.

## Author

**Rana Awais Ahmad**  
GitHub: [Awaisranahmad](https://github.com/Awaisranahmad)
