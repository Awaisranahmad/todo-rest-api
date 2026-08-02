# Todo REST API

A RESTful API built with Node.js, Express, and MongoDB for managing a todo list. This is the backend for a todo application, supporting full CRUD operations.

## 🚀 Features Implemented

- ✅ **Database Connection**: MongoDB Atlas (Cloud) integrated using Mongoose.
- ✅ **Create Todo**: `POST /todos` - Add a new task.
- ✅ **Get All Todos**: `GET /todos` - Retrieve all tasks (sorted by latest first).
- ⏳ **Get Single Todo**: `GET /todos/:id` - (Coming Soon - Day 3)
- ⏳ **Update Todo**: `PUT /todos/:id` - (Coming Soon - Day 3)
- ⏳ **Delete Todo**: `DELETE /todos/:id` - (Coming Soon - Day 3)
- ✅ **Input Validation**: Ensures title and description meet minimum length requirements.
- ✅ **Error Handling**: Proper HTTP status codes (200, 201, 400, 500).

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose
- **Environment Variables**: dotenv
- **Dev Tool**: Nodemon

## 📁 Project Structure

todo-backend/
├── models/
│ └── Todo.js # MongoDB schema for Todo
├── controllers/
│ └── todoController.js # Business logic (POST, GET)
├── routes/
│ └── todoRoutes.js # API route definitions
├── server.js # Main entry point
├── .env # Environment variables (not pushed)
├── package.json
└── README.md


## 🏁 Getting Started (Setup Instructions)

Follow these steps to run the project locally:

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Awaisranahmad/todo-rest-api.git
   cd todo-rest-api

2. **Install dependencies**
    npm install

3. **Set up environment variables**
Create a .env file in the root directory and add the following:  
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string 
Replace your_mongodb_atlas_connection_string with your actual MongoDB URI.

4. **Start the server**
    npm run dev
    the server will start http://localhost:500 .

# 📡 API Documentation (Endpoints) #

Method	Endpoint	Description	Status Codes
POST	/todos	Create a new todo	201 (Created), 400 (Bad Request)
GET	/todos	Get all todos	200 (OK)
1. POST /todos (Create a Todo)
Request Body (JSON):
{
  "title": "MongoDB Atlas setup karo",
  "description": "Cluster banao aur Node.js se connect karo"
}

**Successful Response (201 Created):**
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
**Error Response (400 Bad Request - If fields missing):**
{
  "success": false,
  "message": "Title and description are required"
}

**2. GET /todos (Get All Todos)**
Request: No body required. 

Successful Response (200 OK):
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

🧪 Testing
This API was tested using Postman. Screenshots of successful requests are attached in the submission.

POST Request: Successfully created a new todo (201 Created).

GET Request: Successfully retrieved all todos (200 OK).

MongoDB Compass: Verified that data is persisted in MongoDB Atlas.

🔮 Upcoming Features (Day 3)
GET /todos/:id (Get single todo by ID)

PUT /todos/:id (Update an existing todo)

DELETE /todos/:id (Remove a todo)

Centralized error handling middleware

📧 Connect
Author: Rana Awais Ahmad

GitHub: Awaisranahmad