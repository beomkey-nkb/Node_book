var request = require('request-promise');
var requestO = require('request');
var await = require('await');
var https = require('https');
var fs = require('fs'),
express = require('express'),
http = require('http');
var iconv = require('iconv-lite');
var charset = require('charset');
var cheerio = require('cheerio');
var async = require('async');
var buffer = require('buffer/').Buffer
var url = require('url');

var app = express();
app.set('port', process.env.PORT || 3000);//서버 3000번 포트로 열기, express 모듈 사용

app.use(function(req, res, next){
	if(req.url == '/'){
		url = '/index.html';
	}
	if(req.url == '/favicon.ico'){
		return res.writeHead(404);
	}
	console.log('첫번째 미들웨어 요청 처리');
	var _url = req.url;
	var querydata = url.parse(_url,true).query;
	console.log(querydata.name);

	var options = {
		headers : {
			"X-Naver-Client-Id" : "S6Q53PE53pQn44KDWD1J",
			"X-Naver-Client-Secret" : "br1oxDVW6X"
		},
		method : 'get',
		encoding: "utf-8",
		url : 'https://openapi.naver.com/v1/search/book.json',//json 양식으로 요청
		qs : {
		query : querydata.name,//책 제목
		  display : 1,//총 보여지는 개수
		  start : 1,
		sort : "sim",//정확도 순으로 나열
		}//naver api를 사용하기 위한 입력양식
	};
	
	var result = requestO.get(options,function(req,rek,body){//get방식을 이용하여 naver에 요청, request 모듈 사용
		console.log(body);
		var parser = JSON.parse(body);//객체로 변환

		if(parser.items.length >= 1)//isbn 값이 존재할 때만 수행
		{

			var isbnString = parser.items[0].isbn.slice(11,24);//isbn 정보 추출
			console.log(isbnString);
			var options1 = {
				url: 'http://www.yes24.com/searchcorner/Search?keywordAd=&keyword=&qdomain=UsedGoods&query='+isbnString+'&domain=USED_GOODS&scode=006_015'
				,encoding : null
				//url에 isbn에 대한 정보를 넣어서 요청
			}
			async function crawler(){
				try{
					var doc = iconv.decode(new buffer(await request(options1)),'EUC-KR').toString();//요청한 html 파일을 euc-kr 형식으로 디코딩
					
					var $1 = cheerio.load(doc);//html 파싱을 위한 변수 선언
					
					var finalurl = ''+$1('.btn_view_allused').attr('href').toString();//html을 파싱하여 실제 중고가를 추출할 수 있는 url을 추출하여 저장
					console.log(finalurl);
					
					
					var finalOption = {
						url: finalurl,
						encoding : null
						//추출한 url로 요청
					}

					try{
						var finaldoc = iconv.decode(new buffer(await request(finalurl)),'EUC-KR').toString();//요청한 html 파일을 euc-kr 형식으로 디코딩
					
						var $ = cheerio.load(finaldoc);//html 파싱을 위한 변수 선언
	
						var finaldata = $('.yes_b').text().slice(0,6);
                        //html을 파싱하여 중고책 가격 추출
                        var finaldataArray = finaldata.split('');
	if(finaldataArray[5] != "0"){
        finaldata = $('.yes_b').text().slice(0,5);
    }
                    
                        
						res.send(finaldata);
					}
					catch(e)//중고 제품의 가격이 없을 경우에 대한 예외처리
					{
						res.end('no price');
					}
				}
				catch(e)//판매중인 중고 제품에 관련된 url이 없을 경우에 대한 예외처리
				{
					res.end('no sell');
				}
			};

			crawler();
		}
		else//isbn이 없을 경우
		{
			res.end('no data');
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){//서버 생성
	console.log('express server start : '+app.get('port'));
});