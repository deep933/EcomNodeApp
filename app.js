const express = require('express')
var mysql  = require('mysql')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const { read } = require('fs')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var connection = mysql.createConnection({
    host     : 'mydb.cmfzm1h1kavq.us-east-1.rds.amazonaws.com',
    user     : 'root',
    port : 3306,
    password : '9333deeP'
  });



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/books',(req,res)=>{

})

app.post('/signup',(req,res)=>{

  if(req.body.userName !== null && req.body.userPass !== null && req.body.userEmail!==null){

  }

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})