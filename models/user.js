import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    },
    isEmailVerified:{
        type:Boolean,
        required:true,
        default:false
    },
    image:{
        type:String,
        default:"/images/default-profile.png"
    }
})

const User = mongoose.model("User",userSchema)

export default User
