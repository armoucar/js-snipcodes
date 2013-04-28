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

});
