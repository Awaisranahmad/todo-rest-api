// controllers/todoController.js

const Todo = require("../models/Todo");

// 1. POST /todos - Naya todo banana
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newTodo = new Todo({
      title,
      description,
      completed: req.body.completed || false,
    });

    await newTodo.save();

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// 2. GET /todos - Saare todos lana (FIXED VERSION)
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// day 3
exports.getTodoById = async (req, res) => {
  try {
    // req.params.id
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Tod with id ${req.params.id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    if (error.name === "CastEror") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid ID format. Please provide a valid 24 character mongodb",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// put data by id

exports.updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updateTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true },

      // new : true for update replace the old data otherwise it shows old data
      // runvalidators:true mean all models rule all apply on the update data
    );

    // if id is corrcet but not exist in the database then
    if (!updateTodo) {
      return res.status(404).json({
        success:false,
        message  :`Todo with ID ${req.params.id} not found`
      });
    }

    // show the updated data
    res.status(200).json({
      success:true,
      message:'todo updated successfully',
      data:updateTodo
    })
  } catch (error) { // Agar validation fail ho (jaise title 3 letters se chhota ho)
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    // Agar ID format galat ho
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format. Please provide a valid 24-character MongoDB ID.'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
