import express from "express";
import { Login , Signup, Logout, VerifyEmail, ForgotPassword, ResetPassword, checkAuth} from "../controllers/auth.controller.js";
import { verifyToken} from "../middlewares/verifyToken.js";
const router=express.Router();

router.get("/checkAuth",verifyToken,checkAuth);
router.post("/Login",Login);

router.post("/SignUp",Signup);
router.post("/Verify-email",VerifyEmail);

router.post("/LogOut",Logout);

router.post("/ForgotPassword",ForgotPassword);
router.post("/ResetPassword/:token",ResetPassword);
export default router;