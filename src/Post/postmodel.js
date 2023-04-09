const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"adobeuser",
        required:true,
    },
    content:{type:String,required:true},
    likes:{type:Number,default:0}
},{
    versionKey:false,
    timestamps:true,
})

module.exports = mongoose.model('adobepost',postSchema)