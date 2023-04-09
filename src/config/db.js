const mongoose = require('mongoose')


module.exports = ()=>{
    mongoose.connect('mongodb+srv://Adobe:Adobe@kartik.exjuu.mongodb.net/?retryWrites=true&w=majority')
}