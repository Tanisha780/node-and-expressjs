import express from "express";
import { getAllUsers, getUserDetails, login, signup, tokenVerification } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
export const router = express.Router();
router.post("/signup" , signup);
router.post("/login",login);
router.get("/",verifyToken,getUserDetails);
router.get("/get-all-users",verifyToken,getAllUsers);
router.get("/verify-token",tokenVerification)
