//dynamic routing
const express=require('express');
const { userLogin, signup } = require('./controller.js');
const { router } = require('./route.js');
const app=express();
app.use(express.json())
app.get("/user/:username",(req,res)=>{
  const username=req.params.username;
  res.send(`<h1>welcome ${username}</h1>`)
})
app.get("/search",(req,res)=>{
  const keyword = req.query.keyword;
  res.send(`<h1>searching for ${keyword}</h1>`)
})
app.use('/user',router)
// app.get("/user/login",userLogin);
// app.get("/user/signup",signup)


app.post("/users",(req,res)=>{
  const{name,email}=req.body
  res.json({
    message:`User ${name} with email ${email} created successfully`
  })
  
})
//handling put request
app.put("/users/:id",(req,res)=>{
  const userId=req.params.id
  const{name,email}=req.body
  res.json({
    message:`User ${userId} updated to ${name},${email}`
  })
})
app.delete("/user/:id",(req,res)=>{
  const userId=req.params.id
  res.json({
    message:`user with id ${userId} deleted successfully`
  })

})
app.listen("5000",()=>{
  console.log("server is started ");
  
})
