import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    altNames:{
        type:[String],
        required:false,
        default:[]
    },
    price:{
        type:Number,
        required:true
    },
    labelPrice:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    image:{
        type:[String],
        required:true,
        default:["/image/default-product-01.png","/image/default-product-02.png"]
    },
    brand:{
        type:String,
        required:false
    },
    model:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        required:true,
        default:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    }
})

const Product = mongoose.model("products",productSchema);

export default Product