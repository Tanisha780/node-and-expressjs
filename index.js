const express = require("express");
const  mongoose = require("mongoose");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))


 const connectDB=async()=>{
  try{
    await mongoose.connect("mongodb+srv://tanisha90:05tkRFiLLaAI98kx@cluster0.dwafaez.mongodb.net/")
  
  
console.log("mongoDB is connected");}
catch(e){
  console.log(e);
  
}
}
connectDB();
app.put("/login",(req,res)=>{
  res.send("put data sending here.........")
})

app.listen("5000",()=>{
  console.log("Server is started..........");
  
})