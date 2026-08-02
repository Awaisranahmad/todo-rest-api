const express= require('express');
const router =express.Router();
 const {createTodo, getAllTodos}= require('../controllers/todoController');
// post function and the post route
router.post('/',createTodo);

// get function call and the get route

router.get('/',getAllTodos);
module.exports=router;
