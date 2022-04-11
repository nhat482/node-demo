const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express()
const port = 3000
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug');
app.set('views', './views')

//list all user
var users = [
    {id:1, name:"Minh Nhat", email: "nhat@gamil.com"},
    {id:2, name:"Eden", email: "eden@gamil.com"}
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
//search user
app.get('/users/search',(req,res)=> {
    var name_search = req.query.name
    var result = users.filter((user)=>{
        return user.name.toLowerCase().indexOf(name_search.toLowerCase())!==-1

    })
    res.render('users/list',{
        users:result
    })

})
//get form create user
app.get('/users/create',(req,res)=>{
    res.render('users/create')
})
//create user
app.post('/users/create',(req,res)=>{
    console.log(req.body)
    users.push(req.body)
    res.redirect('/users')
})
//routing xem tung user
app.get('/users/:id', (req, res) => {
    // Tìm user phù hợp với params id
	var user = users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
    
    // Render trang show, với một biến user được định nghĩa là user vừa tìm được
	res.render('users/show', {
    	user: user
    })
})

app.listen(port,()=>{
    console.log('Example app listening on port '+port)
})
