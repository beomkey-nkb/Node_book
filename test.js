var request = require('request');

var options = {
	headers : {
		"X-Naver-Client-Id" : "S6Q53PE53pQn44KDWD1J",
		"X-Naver-Client-Secret" : "br1oxDVW6X"
	},
	method : 'get',
	encoding: "utf-8",
	url : 'https://openapi.naver.com/v1/search/book.json',
	qs : {
    query : "Ionic 프로그래밍 입문",
	  display : 1,
	  start : 1,
    sort : "sim",
	}
}

request(options, function(err, res, html) {
	console.log(html);
});