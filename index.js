const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const user= require('./models/UserModel')

const app = express();
app.use(express.json());
const mongodb =  async()=>{
  try{
    await mongoose.connect("mongodb+srv://tanisha90:E8Lo6j0UsOe4cwGb@cluster0.dwafaez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("mongodb connected!!!!!!!!!!")
  }
  catch(e){
    console.log("something went wronggggggg",e)
  }
}
mongodb();
// creating new user
app.post("/add-user",async(req,res)=>{
  try{
   const newUser = await user.create(req.body,{new:true});
    res.status(201).json({message:`User added Successfully!`,user:newUser})
  }
  catch(e){
    res.status(400).json({error:e.message})

  }
})
// updating user
app.put("/update-user/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const updatedUser=await user.findByIdAndUpdate(
      id,
      {name:"tanisha puri"},{new:true},
    )
    res.status(201).json({message:"user updated successfully!!!!!",user:updatedUser})
    
    }
    catch(e){
      res.status(400).json({error:e.message})
    }
  }
)
// getting all the users
app.get("/users",async(req,res)=>{
  try{
    const users = await user.find();
    res.status(200).json(users);
  }
  catch(e){
    res.status(400).json({error:e.message})

  }
})
// getting particular user by id
app.get("/user/:id",async(req,res)=>{
  try{
    const User = await user.findById(req.params.id);
    if(!User) return res.status(404).json({message:"user not found!!!!!! "});
    res.status(200).json(User);

  }
  catch(e){
    res.status(500).json({error:e.message})
  }
})
app.listen("5000",()=>{
  console.log("server is connected to http://localhost:5000")
})
