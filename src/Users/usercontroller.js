const express = require('express');
const router = express.Router();
const User = require('./usermodel')
const { body, validationResult } = require("express-validator");





router.post('/users',

body('email').isEmail().withMessage("Enter the email only").custom(async (value) => {
    const user = await User.findOne({ email: value });

    if (user) {
      throw new Error("Email is already taken");
    }
    return true;
  }),

body('name').not().isEmpty().withMessage("Name can not be empty").custom(async (value)=>{
    if(value.length == 0 || value.length >=50){
        throw new Error("Name must be between 1 and 50"); 
    }
    return true
}),

body("bio").not().isEmpty().withMessage("bio can not be empty").custom(async(value)=>{
    if(value.length > 200){
      throw new Error("Bio limit can not be more than 200")
    }
    return true
}),

async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }
        let user = await User.create(req.body)
        return res.status(201).send({message:"Succesfully Created"})
    } catch (error) {
        return res.status(500).send({error})
    }
})

router.get('/users/:id',async(req,res)=>{
    try {
        let user = await User.findById(req.params.id).lean().exec()
        return res.status(201).send({user})
    } catch (error) {
        return res.status(500).send({error})
    }
})

router.patch('/users/:id',async (req,res)=>{
    try {
        let user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        return res.status(201).send({user,message:"Updated"})
    } catch (error) {
        return res.status(500).send({error})
    }
})

router.delete('/users/:id',async(req,res)=>{
    try {
      let user = await User.findByIdAndDelete(req.params.id)
      return res.status(201).send({message:"DELETED"})
    } catch (error) {
      return res.status(500).send({error})
    }
  })
  

router.get('/analytics/users',async(req,res)=>{
    try {
        let user = await User.find({}).lean().exec()
        return res.status(201).send({total_user:user.length})
    } catch (error) {
        return res.status(500).send({error})
    }
})

router.get('/users',async(req,res)=>{
    try {
        let users = await User.find({}).populate({path:'post'}).lean().exec()
        return res.status(201).send({users})
    } catch (error) {
        return res.status(500).send({error})
    }
})


module.exports = router