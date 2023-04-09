const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    bio:{type:String,required:true},
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"adobepost",
    },
},{
    versionKey:false,
    timestamps:true,
})

module.exports = mongoose.model('adobeuser',userSchema)