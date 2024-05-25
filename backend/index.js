// importing libraries
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = require('./db');
connectDB();

const PORT = process.env.PORT || 5000;

// importing the routes
const taskRoutes = require('./routes/taskRoutes');


// middleware
app.use(cors());
app.use(express.json());



// default route
app.get('/',(req,res)=>{
    if(mongoose.connection.readyState === 1){
        res.status(200).json([{
            "status": "success",
            "code": 200,
            "message": 'To do List',
            "database": "Connected to MongoDb"
        }])
    }
    else{
        res.status(200).json([{
            "status": "success",
            "code": 200,
            "message": 'To do List',
            "database": "Not connected to MongoDb"
        }])
    }
    
})

// using the routes

app.use('/api', taskRoutes); // Prefix all task routes with /api


// listening to the server

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;