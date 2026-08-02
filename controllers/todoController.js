const Todo = require("../models/Todo");
// post /todos

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // validations
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }
    // new databse TODO
    const newTodo = new Todo({
      title,
      description,
      completed: req.body.completed || false,
    });
    // save TODO in the database
    await newTodo.save();
    res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      data: newTodo,
    });
  } catch (error) {

    // mongoose validation failssssss
    if(error.name=== 'validationError'){
        const errors =Object.values(error.errors).map(e=>e.message);
        return res.status(400).json({
            success:false,
            message:'Validation Failed',
            errors:errors
        
        });
    }
    res.status(500).json({
        success:false,
        message:'server error',
        error:error.message
    });
  }
};

// get /todos
exports.getAllTodos =async (req,res)=>{
try {
    const todos =(await Todo.find()).sort({created:-1});
    //-1 means new first (shows the new one created)
    res.status(200).json({
        success:true,
        count:todos.length,
        data:todos
    });
} catch (
    error
) {
    res.status(500).json({
        success:false,
        message:'server error',
        error: error.message
    });
}
};
