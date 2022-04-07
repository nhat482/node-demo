const req = require("express/lib/request")
const res = require("express/lib/response")

const express = require('express')
const app = express()
const port = 3000
app.get('/',(req,res)=>{
    res.send('Hello Word')
})
app.get('/user',(req,res)=>{
    res.send('Minh Nhat')
})
app.listen(port,()=>{
    console.log('Example app listening on port '+port)
})