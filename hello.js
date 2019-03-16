var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',//접속할 데이터베이스 주소
  user     : 'root',//사용자 이름
  password : '111111',//호스트 비밀번호
  database : 'o2'// 내가 설정한 데이터베이스 이름
});//이거 원래는 보안상으로 이렇게하면안댐 현재는 내 컴퓨터랑 맞추는 중

con.connect();

//////////////여기 부터가 본문

  //셀렉트 구문
var sql = 'SELECT * FROM USER'

con.query(sql,function(error,result,fields)
{
  if(error)
  {
    console.log(error);
  }
  else
   {

    for(var i=0 ; i<result.length ;i ++)
    {
      console.log('result',result);
    }

  }

});

/*
 //인서트 구문
var insert = 'INSERT INTO USER(ISBN,Book,price,Oldprice) VALUES(?,?,?,?)' ;//이부분을 건드려야 값을 계속 넣을 수 있음


//var data = ['9789747799119','총균쇠','30000','5000'];

var isbn ;

var data = [ ];


con.query (insert,data,function(error,result,fields)
{
if(error)
{
  console.log(error);
}
else
{
    console.log(result);
}
});

*/

/*  //업데이트 구문
var update = 'UPDATE USER SET ISBN = ?,BOOK = ?,PRICE = ?,Oldprice = ? WHERE ISBN = ?' ;//이부분을 건드려야 값을 계속 넣을 수 있음

var data = ['9789747799119','총균쇠','60000','7000','9789747799119'];

con.query (update,data,function(error,result,fields)
{
if(error)
{
  console.log(error);
}
else
{
    console.log(result);
}
});

*/

/*      //delete 구문

var deletesql = 'DELETE FROM USER WHERE ISBN = ?' ;//이부분을 건드려야 값을 계속 넣을 수 있음

var data = ['9789747799119'];

con.query (deletesql,data,function(error,result,fields)
{
if(error)
{
  console.log(error);
}
else
{
    console.log(result);
}
});
*/





/////////////////


con.end();//접속을 끊음 무조건 마지막줄인듯
