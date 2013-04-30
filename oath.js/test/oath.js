var assert = require("assert");
var Oath = require("../oath.js");

describe('Oath', function(){

  it('sync', function(){
    var sync = function(value) {
      var oath = new Oath();
      oath.done(value);
      return oath;
    };

    sync("123").then(function(result) {
      assert.equal("123", result);
    });
  });

  it('async', function(done){

    var asyn = function(value) {
      var oath = new Oath();

      setTimeout(function() {
        oath.done(value);
      }, 200);

      return oath;
    };

    asyn("123").then(function(result) {
      assert.equal("123", result);

      done();
    });
  });

  it('two asyncs', function(done){
    var asyn = function(value) {
      var oath = new Oath();

      setTimeout(function() {
        oath.done(value);
      }, 200);

      return oath;
    };

    asyn("123").then(function(result) {
      assert.equal("123", result);

      asyn("345").then(function(result2) {
        assert.equal("345", result2);

        done();
      });
    });
  });

  it('chain', function(done) {

    var counter = 0;

    var async = function(value) {
      var oath = new Oath();

      setTimeout(function() {
        var newValue = "";
        var i, l;
        for (i = 0, l = value.length; i < l; i ++) {
          var v = parseInt(value.charAt(i), 10) + 1;
          newValue += v;
        }

        counter++;
        // console.log("b: counter++ :" + counter);

        oath.done(newValue);
      }, 200);

      return oath;
    };

    var f = function() {
      var oath = new Oath();

      setTimeout(function() {
        counter++;
        // console.log("a: counter++ :" + counter);
        oath.done("123");
      }, 200);

      return oath;
    };

    Oath.chain([f, async, async]).then(function(res) {

      assert.equal(3, counter);
      assert.equal("345", res);
      done();
    });
  });

});
