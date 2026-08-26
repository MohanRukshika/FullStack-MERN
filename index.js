import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import jwt from 'jsonwebtoken'
import productRouter from './routers/productRouter.js'
import cors from 'cors';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js'

dotenv.config();

const app = express()

const mongodbURL=process.env.mongodbURL;

mongoose.connect(mongodbURL).then(
    ()=>{
        console.log("Connected to Mongodb");
    }
).catch((error) => {
    console.log("MongoDB connection failed:", error.message)
  })

app.use(cors())  

app.use( express.json() )

//app.use(authenticateUser)

app.use("/api/users",userRouter) //plugging
app.use("/api/products",productRouter)
app.use("/api/orders",orderRouter)

app.listen(3000,()=>{
    console.log("Server is starting.....");
})

