
import express from 'express'
const app = express()

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000
// Require user mnno
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index',{
        name:'Nhat tu'
    })
  })  

  //list all user
  const file = join(__dirname, 'db.json')
  const adapter = new JSONFile(file)
  const db = new Low(adapter)
  // Read data from JSON file, this will set db.data content
  await db.read()
  db.data ||= { users: [] } 

//get users
app.get('/users',function(req,res){
    res.render('users/list',{
        users:db.data.users
    })
})
//search user
app.get('/users/search',(req,res)=> {
    var name_search = req.query.name
        var result = db.data.users.filter((user)=>{
            return user.name.toLowerCase().indexOf(name_search.toLowerCase())!==-1
        })
       /*var result =db.data.users.find((name)=>{
             return name.name == name_search
       })*/
        console.log(result)
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
    const post= db.data.users.push(req.body)
    //db.write()
    res.redirect('/users')
})
//routing xem tung user
app.get('/users/:id', (req, res) => {
    // Tìm user phù hợp với params id
	var user = db.data.users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
    // Render trang show, với một biến user được định nghĩa là user vừa tìm được
    console.log(user)
	res.render('users/show', {
    	user: user
    })
})

app.listen(port,()=>{
    console.log('Example app listening on port '+port)
})
function newFunction() {
    return require('./routes/user');
}

