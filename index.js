// authentication and authorzation in express using JWT
require("dotenv").config();
const express = require("express")
const app= express();
const jwt = require("jsonwebtoken");
const bcrypt= require("bcryptjs");

const SECRET_KEY="asfddddd";
const users=[];

app.use(express.json())
// Register Route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered');
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).send('Internal Server Error');
  }
});
console.log(SECRET_KEY)
// Login Route
app.post("/login",async(req,res)=>{
  const{username,password}=req.body;
  const user = users.find(u=>u.username===username);
  if(!user)return res.status(404).send("user not found");
  const isValid = await bcrypt.compare(password,user.password);
  if(!isValid) return res.status(403).send("incorrect password");
  const token = jwt.sign({username},SECRET_KEY,{expiresIn:"1h"});
  res.json({token});
});
function authenticateToken(req,res,next){
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if(!token) return res.sendStatus(401);
  jwt.verify(token,SECRET_KEY,(err,user)=>{
    if(err) return res.sendStatus(403);
    req.user=user;
    next();
  })
 
}
// Protected Route
app.get("/dashboard",authenticateToken,(req,res)=>{
  res.send(`Welcome ${req.user.username},this is your dashboard`);
})
app.listen("5000",()=>{
  console.log("server running on http://localhost:5000");
  
})