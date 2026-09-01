import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true
    },
    createdTime:{
        type:Date,
        required:true,
        default:Date.now
    }
   
})

const OTP = mongoose.model("otp",otpSchema)

export default OTP
