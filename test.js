var request = require('request-promise');
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

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
	console.log('첫번째 미들웨어 요청 처리');
	var options = {
		headers : {
			"X-Naver-Client-Id" : "S6Q53PE53pQn44KDWD1J",
			"X-Naver-Client-Secret" : "br1oxDVW6X"
		},
		method : 'get',
		encoding: "utf-8",
		url : 'https://openapi.naver.com/v1/search/book.json',
		qs : {
		query : "Ionic프로그래밍",
		  display : 1,
		  start : 1,
		sort : "sim",
		}
	};
	
	var result = request.get(options,function(req,rek,body){
		var parser = JSON.parse(body);
		var isbnString = parser.items[0].isbn.slice(11,24);
		console.log(isbnString);
		var options1 = {
			url: 'http://www.yes24.com/searchcorner/Search?keywordAd=&keyword=&qdomain=UsedGoods&query='+isbnString+'&domain=USED_GOODS&scode=006_015'
			,encoding : null
			
		}
		async function crawler(){
			var doc = iconv.decode(new buffer(await request(options1)),'EUC-KR').toString();
			
			var $1 = cheerio.load(doc);
			
			var finalurl = ''+$1('.btn_view_allused').attr('href').toString();
			console.log(finalurl);
			
			var finalOption = {
				url: finalurl,
				encoding : null
			}

			var finaldoc = iconv.decode(new buffer(await request(finalurl)),'EUC-KR').toString();
		
			var $ = cheerio.load(finaldoc);

			var finaldata = $('.yes_b').text().slice(0,6);

			res.send(finaldata);
		};

		crawler();
	
	});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('express server start : '+app.get('port'));
});