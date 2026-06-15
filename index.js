import express from 'express'

let app = express()

function go(){
    console.log("started...")
}

app.listen(3000,go)