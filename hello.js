var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',//이거 광역서버로 할거면 openhost
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
