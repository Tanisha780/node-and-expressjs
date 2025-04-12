const express = require("express");
const app = express();
const cors=require("cors")
app.use(express.json());
app.use(cors())

app.get("/api/user",(req,res)=>{
  res.json({name:"tanisha",age:21});

});
// post request 
app.post("/api/user",(req,res)=>{
  const userData = req.body;
  res.json({message:"user data received",data:userData});
});
app.listen("5000",()=>{
  console.log("Server is running on port number 5000");
})
