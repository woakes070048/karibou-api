// Use a different DB for tests
var app = require("../app");

var db = require('mongoose');
var dbtools = require("./fixtures/dbtools");
var should = require("should");

var Products=db.model('Products')
  , Orders=db.model('Orders')
  , criteria={}
  , today=new Date()
  , toshortDay
  , okDay;


describe("orders.validate.repport", function(){
  var _ = require("underscore");


  var oneweek=Orders.findOneWeekOfShippingDay();
  var sellerDay=Orders.findCurrentShippingDay();
  var customerDay=oneweek[0];

  function setCriteriaDateByMonthAndYear (criteria,month,year) {
    criteria.from=new Date()
    criteria.from.setDate(1)
    criteria.from.setMonth(month)
    if(year)criteria.from.setMonth(year);
    criteria.from.setHours(1,0,0,0)    

    criteria.to=new Date(criteria.from);
    criteria.to.setDate(criteria.from.daysInMonth());
    criteria.to.setHours(23,0,0,0);    

  }
  //price depends on:
  //-> item fullfilment != failure
  //-> item finalprice
  //-> payment gateway
  //-> shipping

  before(function(done){
    setCriteriaDateByMonthAndYear(criteria,sellerDay.getMonth())

    // show !fulfilled items
    criteria.showAll=false;

    // TODO those 2 criterias should set by default?
    // only fulfilled
    criteria.fulfillment='fulfilled';
    // only closed
    criteria.closed=true;


    // restrict to a list of shops
    // criteria.shop=req.user.shops.map(function(i){ return i.urlpath})      



    dbtools.clean(function(e){
      dbtools.load(["../fixtures/Users.js","../fixtures/Categories.js","../fixtures/Orders.repport.js"],db,function(err){
        should.not.exist(err);
        // Orders.find({}).exec(function(e,os){
        //   os.forEach(function(o){
        //     o.print();
        //   })
        // })
        done();
      });
    });      
  });

  
  after(function(done){
    dbtools.clean(function(){    
      done();
    });    
  });

  it("validate repport content ", function(done){

    Orders.generateRepportForShop(criteria,function(err,repport){
      should.not.exist(err)
      Object.keys(repport.shops).forEach(function (slug) {
        // console.log('-----',slug,repport.shops[slug])

      })


      repport.shops['mon-shop'].monthitems.should.equal(2);
      repport.shops['mon-shop'].monthamount.should.equal(5);
      repport.shops['mon-shop'].monthorders.should.equal(2);

      // fees are changing for mon-shop
      //-------- mon-shop 2.5 0.15 0.375
      //last day mon-shop 2.5 0.3 0.75
      repport.shops['mon-shop'].monthfees.should.equal(1.13);
      repport.shops['mon-shop'].details.fees.should.equal(0.3);

      repport.shops['super-shop'].monthitems.should.equal(3);
      repport.shops['super-shop'].monthamount.should.equal(10);
      repport.shops['super-shop'].monthorders.should.equal(1);
      repport.shops['super-shop'].monthfees.should.equal(1.6);
      repport.shops['super-shop'].details.fees.should.equal(0.16);

      repport.shops['un-autre-shop'].monthitems.should.equal(16);
      repport.shops['un-autre-shop'].monthamount.should.equal(54.6);
      repport.shops['un-autre-shop'].monthorders.should.equal(4);
      repport.shops['un-autre-shop'].monthfees.should.equal(7.64);
      repport.shops['un-autre-shop'].details.fees.should.equal(0.14);
      repport.monthamount.should.equal(69.6);
      // fees are changing for mon-shop
      //-------- mon-shop total was 9.99 + 0.375
      repport.monthca.should.equal(10.37);
      repport.monthitems.should.equal(21);
      repport.monthorders.should.equal(4);



      // item!='failure' => E(item.price) + gateway fees + shipping fees
      // this order contains only shipping
      done();
    });
  });


  it("validate repport content for unknown year ", function(done){
    setCriteriaDateByMonthAndYear(criteria,sellerDay.getMonth(),1989)

    Orders.generateRepportForShop(criteria,function(err,repport){
      should.not.exist(err)

      repport.monthamount.should.equal(0);
      repport.monthca.should.equal(0);
      repport.monthitems.should.equal(0);
      repport.monthorders.should.equal(0);


      // item!='failure' => E(item.price) + gateway fees + shipping fees
      // this order contains only shipping
      done();
    });
  });





});
