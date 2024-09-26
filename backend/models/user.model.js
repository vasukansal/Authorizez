import mongoose from "mongoose";
import { date } from "zod";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,},
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    lastlogindate:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetpasswordtoken:String,
    resetpasswordExpiresat:Date,
    verificationToken:String,
    verificationTokenExpiresat:Date
},{timestamps:true})   //This timestamp true will create the createdat and updatedat feilds automatically

export const User=mongoose.model('User',userSchema);
