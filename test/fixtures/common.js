
var async     = require("async");
  
var mongoose  = require("mongoose");
var Products  = mongoose.model('Products');
var Shops     = mongoose.model('Shops');
var Users     = mongoose.model('Users');
var Sequences = mongoose.model('Sequences');
var Categories= mongoose.model('Categories');


exports.clean=function(done){
  async.waterfall([
    function(cb){
      Users.remove({}, function(e) {
        cb(e);
      });    
    },
    function(cb){
      Shops.remove({}, function(e) {
        cb(e);
      });
    },
    function(cb){
      Categories.remove({}, function(e) {
        cb(e);
      });
    },
    function(cb){
      Products.remove({}, function(e) {
        cb(e);
      });
    },
    function(cb){
      Sequences.remove({}, function(e) {
        cb(e);
      });
    },
    function(cb){
      Shops.remove({}, function(e) {
        cb(e);
      });
    }
  ],
  function(e,r){
    done();
  });
};
