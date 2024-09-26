import jwt from "jsonwebtoken";

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({success:false, message:"Please login to access this resource"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
            if(!decoded.userid){return res.status(401).json({success:false, message:"Unauthorized access - Invalid token"});}    //if user tries to manipulate toke. It will be invalid. So it should be directly come from the cookies
        req.userid=decoded.userid;
        next();
    } catch (error) {
        console.log("Error in the verify token middleware ",error);
        return res.status(401).json({success:false, message:"Authorization check failed"});
    }
}