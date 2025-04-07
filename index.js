const express = require("express");
const app= express();


app.get("/",(req,res)=>{
  console.log("hello ")
  res.send("hello world")
})
app.get("/home",(req,res)=>{
  res.send("<h1>hello from home page</h1>")

})
app.get("/product",(req,res)=>{
  res.send("<h1>hello from product page</h1>")
})

app.listen("5000",()=>{
  console.log("server is started");
  
})