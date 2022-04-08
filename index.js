const req = require("express/lib/request")
const res = require("express/lib/response")

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index',{
        name:'Nhat tu'
    })
  })  
//est
app.get('/user',(req,res)=>{
    res.render('users/list',{
        users:[
            {id:1, name:'Minh'},
            {id:2, name: 'Nhat'}
        ]
    })
})
app.listen(port,()=>{
    console.log('Example app listening on port '+port)
})
