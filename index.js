const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views', './views')

//list all user
var users = [
    {name:"Minh Nhat", email: "nhat@gamil.com"},
    {name:"Eden", email: "eden@gamil.com"}
]

app.get('/', (req, res) => {
    res.render('index',{
        name:'Nhat tu'
    })
  })  
//get users
app.get('/users',function(req,res){
    res.render('users/list',{
        users:users
    })
})

app.get('/users/search',(req,res)=> {
    var name_search = req.query.name
    var result = users.filter((user)=>{
        return user.name.toLowerCase().indexOf(name_search.toLowerCase())!==-1

    })
    res.render('users/list',{
        users:result
    })

})

app.listen(port,()=>{
    console.log('Example app listening on port '+port)
})
