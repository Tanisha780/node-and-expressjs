import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    minLength:5,
    required:true
  }
})
export const userModel = mongoose.model("User",userSchema);