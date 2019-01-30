var express = require('express');
var http = require('http');


var app = express();

app.set('port', process.env.PORT || 3000);


app.use(function(req,res,next) {
   console.log('첫번째 미들웨어 호출');
    
    //json데이터 통신을 위한 예시
    var book = {ISBN:'132312',name:'무선통신'};
    var bookstr = JSON.stringify(book);
    res.writeHead('200', {"Content-Type":"application/json;charset=utf8"})
    res.write(bookstr);
    res.end();
});

  

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('웹 서버 실행:' + app.get('port'));
});

