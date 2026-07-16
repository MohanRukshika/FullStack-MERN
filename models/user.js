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

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1azEyM0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJNb2hhbiIsImxhc3ROYW1lIjoiUnVrc2hpa2EiLCJpc0FkbWluIjpmYWxzZSwiaXNCbG9ja2VkIjpmYWxzZSwiaXNFbWFpbFZlcmlmaWVkIjpmYWxzZSwiaW1hZ2UiOiIvaW1hZ2VzL2RlZmF1bHQtcHJvZmlsZS5wbmciLCJpYXQiOjE3ODQxMTgyMDEsImV4cCI6MTc4NDIwNDYwMX0.rhOARrgMOJljHKbIBWwMzaQqg1xx4KVv4DYc7NlXJsQ