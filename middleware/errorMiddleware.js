// This is the middleware code for less code and check error



const errorMiddleware =(err,req,res,next)=>{
    let statusCode =res.statusCode === 200? 500:res.statusCode; // for default eror 500
    // default message if message not found
    let message= err.message||'something wrong in the sever';
// case 1.castError

if(err.name=== 'CastError'){
    statusCode=400;
    message=`Invalid ID format: ${err.value}.`
}
 // CASE 2:  (ValidationError)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        
        const errors = Object.values(err.errors).map(e => e.message);
        message = `Validation failed: ${errors.join('. ')}`;
    }

    // CASE 3: we can handle error like todo is not found otherwise defaul error will show

    // Final Response bhejna
    res.status(statusCode).json({
        success: false,
        message: message,
        // Stack trace sirf development mein dikhao, production mein nahi
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports=errorMiddleware;

