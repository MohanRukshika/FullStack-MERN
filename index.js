import express from 'express'

const app = express()

app.use( express.json() )

app.put("/",()=>{
    console.log("Put Request Received")
})

app.get("/",(req,res)=>{
    console.log("Get Request Received")
    console.log(req.body)
    res.json({
        "message":"data received successfully"
    })
})

app.listen(3000,()=>{
    console.log("Server is starting.....");
})