'use strict';
//var app = require('../app.js').start();
var request = require('request');
 
describe("*", function () {
  it("should respond with hello world", function(done) {
    request.get({json: true, url: "http://127.0.0.1:3000/api/1.1/bar"}, function(error, response, body){
      console.log(JSON.stringify(body));
      expect(body).toEqual({"fake":"bar"});
      done();
    });
  }, 500);  
}) 
