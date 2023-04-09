const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.port || 8080;
const app = express()
const connect = require('./config/db')
const usersController = require('./Users/usercontroller')
const postController = require('./Post/postcontroller')
mongoose.set('strictQuery', true);

app.use(express.json())
app.use(cors())

app.use(usersController)
app.use(postController)

app.listen(port , async()=>{
    try {
        await connect()
        console.log(`this is ${port} yo`)
    } catch (error) {
        console.log(error)
    }
})
