
const express = require('express')
const app = express()

// Establishing connection with mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/brokeCodeAryan')
.then(()=>{
    console.log("Connection Established")
})

.catch(err =>{
    console.log("Thrown an error")
    console.log(err)

})


// Importing the app here and defining the routes 
const registerRoute = require('./apiroute/register');
app.use('/',registerRoute)

app.listen(3000,()=>{
    console.log("Serving on port 3000")
})