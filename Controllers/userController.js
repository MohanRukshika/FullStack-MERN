import User from "../models/user.js";
import bcrypt from 'bcrypt'
import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import OTP from "../models/OTPschema.js"
import nodemailer from 'nodemailer'
dotenv.config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,// no need hash
    auth:{
        user:process.env.Gmail,
        pass:process.env.Gmail_AppPassword
    }
})

export async function createUser(req,res){

    try{

        const passwordHash = bcrypt.hashSync(req.body.password,10)

        const newUser = new User({
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:passwordHash
        })

        await newUser.save()
        console.log(newUser)
        res.json({
            message:"User Created Successfully"
        })
    }catch(error){
        res.json({
            message:"Error creating user"
        })
    }
}

export async function getUserData(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
    }else{
        res.json(req.user)
    }
}

export async function loginUser(req,res){
    try{

        const user = await User.findOne({
            email:req.body.email
        })

        console.log(user)
        
        if(user==null){
            res.status(404).json({
                message:"User not found"
            })
        }else{
            const isPasswordCorrect=bcrypt.compareSync(req.body.password,user.password)

            if(isPasswordCorrect){

                const payload = {
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    isAdmin:user.isAdmin,
                    isBlocked:user.isBlocked,
                    isEmailVerified:user.isEmailVerified,
                    image:user.image
                }

                const token=jwt.sign(payload,process.env.JWT_Secret_Key,{
                    expiresIn:"24h"
                })

                res.json({
                    message:"Login successful",
                    "token":token,
                    "isAdmin":user.isAdmin
                })
            }else{
                res.status(401).json({
                    message:"Invalid password"
                })
            }
        }

    }catch(error){
        console.log("Login error:", error.message)  // shows error in terminal
        res.status(500).json({
        message: error.message
    })
    }
}

export async function updateUserDetails(){
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
    }else{
        try{

            await User.findByIdAndUpdate(
                {email:req.user.email},
                {firstName:req.body.firstName , lastName:req.body.lastName}
            )
            const updateUser = await User.findOne({email:req.user.email})
            const token = jwt.sign({
                    email:updateUser.email,
                    firstName:updateUser.firstName,
                    lastName:updateUser.lastName,
                    isAdmin:updateUser.isAdmin,
                    isBlocked:updateUser.isBlocked,
                    isEmailVerified:updateUser.isEmailVerified,
                    image:updateUser.image
            },process.env.JWT_Secret_Key,{
                expiresIn : "48h"
            })

            res.json({
                message : "User data updated successfully",
                token:token
            })

        }catch(error){
            res.status(500).json({
                message:"Error updating user"
            })
        }
    }
}

export async function changePassword(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
    }

    try{

        const hashedPassword = bcrypt.hashSync(req.body.newPassword,10)
        await User.findOneAndUpdate({email:req.user.email},
            {password:hashedPassword}
        )

        res.json({
            message:"Password changed successfully"
        })

    }catch(error){
        res.status(500).json({
            message:"Error changing password"
        })
    }
}

export async function googleLogin(req,res){
     const accessToken = req.body.token;

     try{

        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers:{
                Authorization : "Bearer "+accessToken
            }
        })
        console.log(response.data)

        const user = await User.findOne({
            email : response.data.email
        })

        if(user==null){
            //create new account\
            const newUser = new User({
                email : response.data.email,
                firstName :response.data.given_name,
                lastName:response.data.family_name,
                password:"google_login",
                isEmailVerified:true,
                image:response.data.picture
            })

            await newUser.save()

            const token = jwt.sign({
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    isAdmin: newUser.isAdmin,
                    isBlocked: newUser.isBlocked,
                    isEmailVerified: newUser.isEmailVerified,
                    image: newUser.image
            },process.env.JWT_Secret_Key,{
                expiresIn : "48h"
            })

            res.json({
                token:token,
                isAdmin:newUser.isAdmin
            })

        }else{
            const token = jwt.sign({
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    isAdmin:user.isAdmin,
                    isBlocked:user.isBlocked,
                    isEmailVerified:user.isEmailVerified,
                    image:user.image
            },process.env.JWT_Secret_Key,{
                expiresIn : "48h"
            })

            res.json({
                token:token,
                isAdmin:user.isAdmin
            })
        }

     }catch(error){
        res.status(500).json({
            message:"Google Login Failed"
        })
        console.log(error)
     }
}

export async function sendOTP(req,res){
    const email = req.body.email

    try{
        const user = await User.findOne({email : email})

        if(user==null){
            res.status(404).json({
                message:"User not found"
            })
            return
        }

        await OTP.deleteOne({email:email})

        const otpCode = Math.floor(100000 + Math.random()*900000).toString()

        const newOTP = new OTP({
            email : email,
            otp : otpCode
        })

        await newOTP.save()

        const message = {
            from : process.env.Gmail,
            to:email,
            subject:"Password reset OTP - Applix",
            text:"Your OTP for password reset is "+otpCode+" .It's only valid for 10 minutes"
        }

        await transporter.sendMail(message)

        res.json({
            message:"OTP sent successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error sending OTP"
        })
    }
}

export async function verifyOTPResetPassword(req,res){
    const email = req.body.email
    const otp = req.body.otp
    const newPassword = req.body.newPassword

    try{
        const otpRecord = await OTP.findOne({email:email})

        if(otpRecord==null){
            res.status(400).json({
                message:"Invalid OTP"
            })
            return
        }

        if(otpRecord.otp!==otp){
            res.status(400).json({
                message:"Invalid OTP"
            })
            return
        }

        const otpAge = (Date.now()-otpRecord.createdTime.getTime())/(1000*60)

        if(otpAge>10){
            await OTP.deleteOne({email:email})
            res.status(400).json({
                message:"OTP Expired"
            })
            return
        }

        const hashedPassword = bcrypt.hashSync(newPassword,10)

        await User.findOneAndUpdate(
            {email:email},
            {password:hashedPassword}
        )

        await OTP.deleteOne({email:email})

        res.json({
            message:"Password reset successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error resetting password"
        })
    }
}