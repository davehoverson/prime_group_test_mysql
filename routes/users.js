var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'impacthub',
  password: 'impact23',
  database: 'impacthub'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

router.get('/', function(req, res) {
  connection.query('SELECT * FROM users',
    function (err, rows) {
      if(err) throw err;
      res.json(rows);
    });
});

router.post('/', function(req, res) {
  connection.query('INSERT INTO users SET ?', req.body,
    function (err) {
      if (err) throw err;
      res.send('User ' + req.body.username + ' added to database')
    })
});

module.exports = router;

