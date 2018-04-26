var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var url = require('url');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/wayne';

var cn = {
    host: 'localhost', // server name or IP address;
    port: 5000,
    database: 'wayne',
    user: 'wayne',
    password: 'Wayne1866'
};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'js'))

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  response.render('index');
});


var pg = require('pg');

app.post('/submitForm', function(req, res) {
  var name = req.param('username');
  console.log(name);
  console.log(req.param('guess'));
  //res.send(user_id + ' ' + token + ' ' + geo);
  const results = [];
  // Grab data from http request
  const data = {username: name, guess: req.param('guess')};
  console.log(data);
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO users(username, guess) values($1, $2)',
    [data.username, data.guess]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM users ORDER BY username ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});





app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


