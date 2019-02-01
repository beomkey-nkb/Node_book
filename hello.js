var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',//
  user     : 'root',//사용자 이름
  password : '111111',//호스트 비밀번호
  database : 'o2'// 내가 설정한 데이터베이스 이름
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
