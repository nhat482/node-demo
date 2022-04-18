
import express from 'express'
const app = express()

//define database
/*var low =require('lowdb');
var FileSync =require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json') 
var db=low(adapter)
db.defaults({users:[]}).write();  */
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

/*var users = [
    {id:1, name:"Minh Nhat", email: "nhat@gamil.com"},
    {id:2, name:"Eden", email: "eden@gamil.com"}
]*/

//get users
app.get('/users',function(req,res){
    res.render('users/list',{
        users:db.data.users
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
    const post= db.data.users.push(req.body)
    console.log(req.body.id)
    //db.write()
    res.redirect('/users')
})
//routing xem tung user
app.get('/users/:id', (req, res) => {
    // Tìm user phù hợp với params id
	var user = db.data.users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
    console.log(user)
    // Render trang show, với một biến user được định nghĩa là user vừa tìm được
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

