const express = require("express");
const app = express();
app.get("/",(req,res)=>{
  console.log("hieeeeeeeeeeeeee")
  res.send("<h1>Hello from Home page</h1>")
})
app.get("/login",(req,res)=>{
  res.send("<h1>hello from login page</h1>")
})
app.post("/login",(req,res)=>{
  res.send("post data sending here..............")
})
app.put("/login",(req,res)=>{
  res.send("put data sending here.........")
})
app.patch("/login",(req,res)=>{
  res.send("patch data sending here........")
})
app.delete("/login",(req,res)=>{
  res.send("delete data sending here...........")
})
app.listen("5000",()=>{
  console.log("Server is started..........");
  
})