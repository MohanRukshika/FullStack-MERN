import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import jwt from 'jsonwebtoken'
import authenticateUser from './middleware/authentication.js'
import productRouter from './routers/productRouter.js'


const app = express()
const mongodbURI="mongodb://rukshika53_db_user:fYtBHkaWhr7TITjL@ac-rbdm13j-shard-00-00.uflenph.mongodb.net:27017,ac-rbdm13j-shard-00-01.uflenph.mongodb.net:27017,ac-rbdm13j-shard-00-02.uflenph.mongodb.net:27017/myDatabase?ssl=true&replicaSet=atlas-av7l7m-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("Connected to Mongodb");
    }
).catch((error) => {
    console.log("MongoDB connection failed:", error.message)
  })

app.use( express.json() )

app.use(authenticateUser)

app.use("/users",userRouter) //plugging
app.use("/products",productRouter)

app.listen(3000,()=>{
    console.log("Server is starting.....");
})