const express=require("express");
const { userLogin, signup } = require("./controller");
const app=express();

const router=express.Router();
router.get("/login",userLogin);
router.get("/signup",signup);
module.exports={
router
}