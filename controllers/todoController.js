// controllers/todoController.js

const Todo = require("../models/Todo");
const asyncHandler = require("../utils/asyncHandler");

// 1. POST /todos - Naya todo banana
exports.createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    // statusCode travels with the error so the centralized error
    // middleware answers 400 (previously this fell through to a 500,
    // because the old try/catch only mapped ValidationError to 400).
    const error = new Error("Title and description are required");
    error.statusCode = 400;
    throw error;
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
});

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
    throw new Error('Todo id not found')


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
