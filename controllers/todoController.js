// controllers/todoController.js

const { Error } = require("mongoose");
const Todo = require("../models/Todo");
const asyncHandler = require("../utils/asyncHandler");

// 1. POST /todos - Naya todo banana
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description){
      res.status(400);
      throw new Error('Title and description are required');
    };
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

// 2. GET /todos  
exports.getAllTodos =asyncHandler(async (req,res)=>{
  const todos = await Todo.find().sort({createdAt:-1});
  res.status(200).json({
    success:true,
    count:todos.length,
    data:todos
  });
});

// day 3
exports.getTodoById =asyncHandler( async (req, res) => {
const todo =await Todo.findById(req.params.id);
  if(!todo){
    res.status(404);
    throw new Error('todo id not fond')


}
res.status(200).json({
  success:true,
  data:todo
})
});

// put data by id

exports.updateTodo = asyncHandler(async (req, res) => {
  const {title,description,completed}=req.body;
   const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { title, description, completed },
        { new: true, runValidators: true }
    );

    if (!updatedTodo) {
        res.status(404);
        throw new Error(`Todo with ID ${req.params.id} not found`);
    }

    res.status(200).json({
        success: true,
        message: 'Todo updated successfully',
        data: updatedTodo
    });
});

// delete by id 

exports.deleteTodo = asyncHandler(async (req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
        res.status(404);
        throw new Error(`Todo with ID ${req.params.id} not found`);
    }

    res.status(200).json({
        success: true,
        message: 'Todo deleted successfully',
        data: deletedTodo
    });
});