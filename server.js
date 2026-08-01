//server.js 
require('dotenv').config();
const express = require('express');
const mongoose  = require('mongoose');

const cors = require('cors');
// App and setting
const app=express();
const PORT = process.env.PORT || 5000;
//Middleware   security guards
app.use(cors());
app.use(express.json());

// Database 

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('Database connected Successfully!')).catch((err)=>console.log('Databse Error:',err.message));

// test route 
app.get('/',(req,res)=>{
    res.send('todo API is running on port '+PORT);
});

//call the endpoint
app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
})