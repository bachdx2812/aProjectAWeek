const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const mysql = require('mysql')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'orchid2'
});
connection.connect();
app.use(cors())

app.get('/users', (req, res) => {
  let queryString = "";

  if (req.query.email) {
    queryString = `SELECT * from users where email LIKE "%${req.query.email}%"`;
  } else {
    queryString = 'SELECT * from users';
  }

  connection.query(queryString, function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    res.send(results)
  });
})

app.get('/users/:userId', (req, res) => {
  connection.query(`SELECT * from users where id = ${req.params.userId}`, function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    res.send(results[0])
  });
})

app.put('/users/:userId', (req, res) => {
  const user = req.body.user

  const sql = `UPDATE users SET name = "${user.name}", display_name = "${user.display_name}" WHERE id = ${user.id}`

  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    res.send('ok')
  });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))