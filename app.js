const express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var uuid = require('uuid');
const app = express()
const port = 8081

//bodyparser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var connection=null;


app.use((req,res,next)=>{
  connection = mysql.createConnection({
    host: 'mydb.cmfzm1h1kavq.us-east-1.rds.amazonaws.com',
    user: 'root',
    port: 3306,
    password: '9333deeP',
    database: 'mydb'
  });
  connection.connect()
  next()
})

//mysql db connection



// user signup
app.post('/signup', (req, res) => {


  if (req.body.userName !== null && req.body.userPass !== null && req.body.userEmail !== null) {

    const user_id = uuid.v1();
    connection.query(`INSERT INTO users VALUES("${req.body.userName}","${req.body.userEmail}","${req.body.userPass}","${user_id}")`, function (error, results, fields) {
      if (error) {
        res.status(404).send(error.message)
      }
      res.send(results)
    });
    connection.end()

  }
})

//get user by user email
app.get('/user', (req, res) => {
  console.log(req.query)


  if (req.query.userEmail != null) {
    connection.query(`SELECT * FROM users WHERE user_email="${req.query.userEmail}"`, function (error, results, fields) {
      if (error) throw error
      res.send(results)
    });
    connection.end();

  }
})

//get all books
app.get('/books',(req,res)=>{

    connection.query(`SELECT * FROM books`, function (error, results, fields) {
      if (error) throw error
      res.send(results)
    });
    connection.end()


})

//add book
app.post('/add/book',(req,res)=>{

  
  if (req.body.bookTitle !== null && req.body.bookUrl !== null && req.body.bookAuthor !== null && req.body.bookPrice !== null) {

    const book_id = uuid.v4();
    connection.query(`INSERT INTO books VALUES("${book_id}","${req.body.bookUrl}","${req.body.bookTitle}",${req.body.bookPrice},"${req.body.bookAuthor}")`, function (error, results, fields) {
      if (error) {
        res.status(404).send(error.message)
      }
      res.send(results)
    });
    connection.end()


  }
})




app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at`)
})

