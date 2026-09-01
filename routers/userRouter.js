import express from 'express'
import { googleLogin,changePassword, createUser, getUserData, loginUser, updateUserDetails, verifyOTPResetPassword ,sendOTP} from '../Controllers/userController.js';
import authenticateUser from '../middleware/authentication.js'

const userRouter = express.Router();

/*
    Use authenticateUser when the user must already be logged in to perform the action.

    Don't use it when the user needs to perform the action before logging in.
*/

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.get("/me",authenticateUser,getUserData)
userRouter.put("/",authenticateUser,updateUserDetails)
userRouter.put("/password",authenticateUser,changePassword)
userRouter.post("/googlelogin",googleLogin)
userRouter.post("/sendOTP",sendOTP)
userRouter.post("/verifyotp",verifyOTPResetPassword)

export default userRouter