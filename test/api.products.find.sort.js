// Use a different DB for tests
var app = require("../app");

var db = require('mongoose');
var dbtools = require("./fixtures/dbtools");
var should = require("should");require("should-http");
var data = dbtools.fixtures(["Users.js","Categories.js","Shops.js",'Products.more.js']);

describe("DEPRECATED api.products.find.sort", function(){
  var request= require('supertest');

  var _=require('underscore');
  

  before(function(done){
    dbtools.clean(function(e){
      dbtools.load(["../fixtures/Users.js","../fixtures/Categories.js","../fixtures/Shops.js","../fixtures/Products.sort.js"],db,function(err){
        should.not.exist(err);
        done();
      });
    });      
  });

  after(function(done){
    dbtools.clean(function(){    
      done();
    });    
  });

  /** SORTING AND GROUPING */
  it.skip("GET 200,/v1/products?sort=categories.weight", function(done){
    request(app)
      .get("/v1/products?sort=categories.weight")
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(200);
        var w=-1;
        res.body[0].vendor.should.be.an.instanceOf(Object)
        res.body.forEach(function(p){
          p.categories.weight.should.be.above(w)
          w=p.categories.weight;
        });
        done();
      });
  });

  it.skip("GET 200,/v1/products?sort=categories.name", function(done){
    request(app)
      .get("/v1/products?sort=categories.name")
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(200);
        n='';
        res.body[0].vendor.should.be.an.instanceOf(Object)
        res.body.forEach(function(p){
          p.categories.name.should.be.above(n)
          n=p.categories.name;
        });
        done();
      });
  });

  it.skip("GET 200,/v1/products?group=categories.name&sort=categories.name", function(done){
    request(app)
      .get("/v1/products?group=categories.name&sort=categories.name")
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(200);
        var n='';
        Object.keys(res.body).forEach(function(k){
          k.should.be.above(n);
          n=k;
        });

        //console.dir(res.body)
        done();
      });
  });
  
});

