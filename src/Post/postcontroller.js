const express = require('express');
const router = express.Router();
const Post = require('./postmodel')
const { body, validationResult } = require("express-validator");


router.post('/posts',
body('content').not().isEmpty().withMessage("Content can not be empty")
.custom((value)=>{
  if(value.length === 0 || value.length > 300){
    throw new Error("Content can not be more then 300") 
  }
  return true
}),
async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }
        let post = await Post.create(req.body)
        return res.status(201).send({message:"Succesfully Posted"})
    } catch (error) {
        return res.status(500).send({error})
    }
})

router.get('/post/:id',async(req,res)=>{
  try {
    let post = await Post.findById(req.params.id).populate({path:"user_id"}).lean().exec()
    return res.status(201).send({post})
  } catch (error) {
    return res.status(500).send({error})
  }
})

router.delete('/posts/:id',async(req,res)=>{
  try {
    let post = await Post.findByIdAndDelete(req.params.id)
    return res.status(201).send({message:"DELETED"})
  } catch (error) {
    return res.status(500).send({error})
  }
})


router.patch('/posts/:id',async(req,res)=>{
  try {
    let post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(201).send({message:"Updated"})
  } catch (error) {
    return res.status(500).send({error})
  }
})


router.patch('/posts/:id/like',async(req,res)=>{
  try {
    let post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(201).send({message:"Liked"})
  } catch (error) {
    return res.status(500).send({error})
  }
})


router.patch('/posts/:id/unlike',body('likes').custom((value)=>{
  if(value < 0){
    
    throw new Error("Likes can not be lower than 0")
  }
  return true
}),async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    let post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(201).send({message:"Unliked"})
  } catch (error) {
    return res.status(500).send({error})
  }
})

router.get('/analytics/posts',async(req,res)=>{
  try {
    let posts = await Post.find({}).lean().exec()
    return res.status(201).send({total_post:posts.length})
  } catch (error) {
    return res.status(500).send({error})
  }
})


router.get('/posts',async(req,res)=>{
  try {
      let posts = await Post.find({}).populate({path:"user_id"}).lean().exec()
      return res.status(201).send({posts})
  } catch (error) {
      return res.status(500).send({error})
  }
})


module.exports = router

