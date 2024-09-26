import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateVerificationCode } from "../utils/generateverificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generatetokenandsetcookie.js";
import { sendingVerificationMail, WelcomeEmail, ResetPasswordMail, ResetSuccessfullMail } from "../mail/Sendemail.js";
export const Login=async (req,res)=>{
    const email=req.body.email.toLowerCase();
    const {password} = req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false, message:"User not found or Invalid email"});
        }
        else{
            const passwordValid = await bcryptjs.compare(password, user.password);
            if(!passwordValid){
                return res.status(400).json({success:false, message:"Invalid password"})
            }
            else{
                generateTokenAndSetCookie(res,user._id);
                user.lastlogindate=new Date();
                await user.save();
                return res.status(200).json({success:true, message:"Logged in successfully", user:{name:user.name}});
            }
        }
    } catch (error) {
        console.log("Error logging in ",error);
        return res.status(400).json({success:false, message:"Internal Server Error "+error});
    }
}

export const Signup=async (req,res)=>{
    const email=req.body.email.toLowerCase();
    const {password, name} = req.body;
    try {
        if(!email || !password || !name){
           return res.status(400).json({message:"All feilds are required"});
        }
        const useralreadyexixts= await User.findOne({email});
        if(useralreadyexixts){
            return res.status(400).json({success:false, message: "User already exists"});
        }
        else{
        const hashedpassword= await bcryptjs.hash(password,12);
        const verificationToken=generateVerificationCode();
        const user =new User({
            email,
            password:hashedpassword,
            name,
            verificationToken,
            verificationTokenExpiresat:Date.now() + 24*60*60*1000
        })
        await user.save();


        //jwt 
        generateTokenAndSetCookie(res,user._id);


        //Mail sending function called
        await sendingVerificationMail(user.email,verificationToken);

        return res.status(201).json({success:true, message:"User created Successfully"});}


    } catch (error) {
        console.log("HERE");
       return res.status(400).json({success:false, message:error.message});
    }
}

export const VerifyEmail= async (req,res)=>{
    const {verificationCode}=req.body;
    try {
        const user=await User.findOne({
            verificationToken:verificationCode,
            verificationTokenExpiresat:{$gt:Date.now()}  //$gt is a MongoDB query operator that stands for greater than.
        })
        if(!user){
            return res.status(400).json({success:false, message:"Invalid or expired verification code"});
        }
        else{
            user.isVerified=true;
            user.verificationToken=undefined;
            user.verificationTokenExpiresat=undefined;
            await user.save();
            await WelcomeEmail(user.email,user.name);
            return res.status(201).json({success:true, message:"Email Verified Successfully"});  
        }
    } catch (error) {
        console.log("Error verifying email ",error);
        return res.status(400).json({success:false, message:"Internal Server Error"});
    }

}

export const Logout= async (req,res)=>{
    res.clearCookie('token');
    res.status(200).json({success:true, message:"Logged out successfully"});
}

export const ForgotPassword= async (req,res)=>{
    const eamil=req.body.email.toLowerCase();
    try {
        const user= await User.findOne({email:eamil});
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        else{
            const resetpasswordtoken= crypto.randomBytes(20).toString("hex");
            const resetpasswordExpiresat= Date.now() + 1*60*60*1000; //expires after an hour
            user.resetpasswordtoken= resetpasswordtoken
            user.resetpasswordExpiresat= resetpasswordExpiresat
            await user.save();
            await ResetPasswordMail(user.email, process.env.CLIENT_URL+"/resetpassword/"+resetpasswordtoken);
            res.status(200).json({success:true, message:"Reset password link sent to your email"});
        }
    } catch (error) {
        console.log("Error in ForgotPassword endpoint",error);
        throw new Error("Error in ForgotPassword endpoint");
    }
}

export const ResetPassword= async (req,res)=>{
    const resetToken=req.params.token;
    try {
        const user= await User.findOne({
        resetpasswordtoken:resetToken,
        resetpasswordExpiresat:{$gt:Date.now()}
    })
    if(!user){
        return res.status(400).json({success:false, message:"Invalid or expired reset Link"});
    }
    else{
        const {password}=req.body;
        const hashedpassword= await bcryptjs.hash(password,12);
        user.password=hashedpassword;
        user.resetpasswordtoken=undefined;
        user.resetpasswordExpiresat=undefined;
        await user.save();
        await ResetSuccessfullMail(user.email);
        res.status(200).json({success:true, message:"Password reset successfully"});
    }
    } catch (error) {
        console.log("Error in ResetPassword endpoint ",error);
        throw new Error("Error in ResetPasswort");
    }
}

export const checkAuth= async (req,res)=>{
    try {
        const user=await User.findById(req.userid).select("-password"); //it means to select everything except password
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        } 
        return res.status(200).json({success:true, user});
    } catch (error) {
        console.log("Error in checkAuth ",error);
        throw new Error("Error in checkAuth");
    }
}