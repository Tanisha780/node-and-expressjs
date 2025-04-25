import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router } from "./Router/user.Router.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use("/users", router);



app.listen("5000", () => {
  console.log("server is running on port http://localhost:5000");
  connectDB();
});
