const mongoose =require('mongoose');
const TodSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
        trim:true,
        minlength:[3,'Title must be at least 3 Charaters']
    },
    description:{
        type :String,
     required: [true,'Description is required'],
     minlength:[5,'minimum 5 characters'],
     trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})