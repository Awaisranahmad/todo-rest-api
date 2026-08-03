const express= require('express');
const router =express.Router();
 const {createTodo, getAllTodos,getTodoById,updateTodo,deleteTodo}= require('../controllers/todoController');
// post function and the post route
router.post('/',createTodo);

// get function call and the get route

router.get('/',getAllTodos);


// routes of day 3
 router.get('/:id',getTodoById);
 router.get('/:id',updateTodo);
 router.get('/:id',deleteTodo);

 module.exports=router;