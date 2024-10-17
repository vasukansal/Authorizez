import express from 'express'; 
import dotenv from "dotenv";
import { connectDB } from './db/connectDB.js';
import authRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));



app.use(express.json()); //to parse incoming request's body's data, req.body
app.use(cookieParser()); //to parse incoming cookies
app.use("/api/auth",authRoutes)

app.get("/",(req,res)=>{
    res.send("Hello Vasu");
})
app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on port ",PORT);});