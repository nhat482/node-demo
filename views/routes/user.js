//route for user here
import express from 'express';
const user_router = express.Router();
//list all user
/*var users = [
    {id:1, name:"Minh Nhat", email: "nhat@gamil.com"},
    {id:2, name:"Eden", email: "eden@gamil.com"}
]*/
//get users
user_router.get('/users',function(req,res){
    res.render('users/list',{
        users:users
    })
})
//search user
user_router.get('/users/search',(req,res)=> {
    var name_search = req.query.name
    var result = users.filter((user)=>{
        return user.name.toLowerCase().indexOf(name_search.toLowerCase())!==-1

    })
    res.render('users/list',{
        users:result
    })

})
//get form create user
user_router.get('/users/create',(req,res)=>{
    res.render('users/create')
})
//create user
user_router.post('/users/create',(req,res)=>{
    console.log(req.body)
    users.push(req.body)
    res.redirect('/users')
})
//routing xem tung user
user_router.get('/users/:id', (req, res) => {
    // Tìm user phù hợp với params id
	var user = users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
    
    // Render trang show, với một biến user được định nghĩa là user vừa tìm được
	res.render('users/show', {
    	user: user
    })
})
