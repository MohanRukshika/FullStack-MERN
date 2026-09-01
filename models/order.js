import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {   orderID:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        addressLineOne:{
            type:String,
            required:true
        },
        addressLineTwo:{
            type:String,
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true,
            default:"Pending" //shipped , completed, cancelled
        },
        notes:{
            type:String
        },
        total:{
            type:Number,
            required:true,
        },
        date:{
            type:Date,
            required:true,
            default: Date,
        },
        items:[
            {
                product:{
                    productId:{
                        type:String,
                        required:true,
                    },
                    name:{
                        type:String,
                        required:true
                    },
                    price:{
                        type:Number,
                        required:true
                    },
                    labelPrice:{
                        type:Number,
                        required:true
                    },
                    image:{
                        type:[String],
                        required:true,
                    }               
                }
            }
        ]
    }
)

const Order = mongoose.model("orders",orderSchema);

export default Order