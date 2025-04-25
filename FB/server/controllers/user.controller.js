import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

// signup function
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // try to fill all the fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "please fill all the fields all fields are required.........",
    });
  }
  try {
    // check existing user
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        message: "user already exists with this email id",
        success: false,
      });
    }
    // hashing passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: "user created successfully!!!!!", success: true, user:user });
  } catch (e) {
    console.log(e);

    return res
      .status(400)
      .json({ message: "something went wrong", success: false });
  }
};
// login function
export const login = async (req, res) => {
  const { email, password } = req.body;
  // checking user exists or not
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(402).json({
        message: "user does not exists please signup ",
        success: false,
      });
    }
    // comparing the passwords
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json({ message: "wrong credentials", success: false });
    }
    // generating token
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30s"
      }
    );
    // sending token in cookie (cookie based authentication)
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 30),
    });
    console.log(token);
    return res.status(200).json({ success: true }); 
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ messsage: "something went wrong", success: false });
  }
};
// getting user details
export const getAllUsers = async (req, res) => {
  const users = await userModel.find({});
  return res.status(200).json({ success: true, users });
};
export const getUserDetails = async (req, res) => {
  console.log(req.cookies);
  
  const users = await userModel.find({ email: req.user?.email });
  return res.status(200).json({ success: true, users });
};
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ success: true, user });
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete(id);
  res.status(200).json({ success: true, user });
};
export const tokenVerification=async(req,res)=>{
  const token = req.cookies?.token;
  if(!token){
    return res.status(401).json({valid:false,message:"no token provided"})
  }
  try{
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    res.status(200).json({valid:true,user:decoded})

  }catch(e){

    res.status(401).json({valid:false,message:"invalid or expired token"})
  }
}