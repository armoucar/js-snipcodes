var assert = require("assert");
var Listen = require("../listener.js");

describe('Listen', function(){
  describe('#on()', function(){

    it('should bind callback events', function(){
      var listen = new Listen();

      listen.on('a', function() {});
      assert.equal(listen.callbacks["a"].length, 1);

      listen.on('a', function() {});
      assert.equal(listen.callbacks['a'].length, 2);
    });

    it('should bind callbacks to different events', function(){
      var listen = new Listen();

      listen.on('a', function() {});
      assert.equal(listen.callbacks["a"].length, 1);

      listen.on('a', function() {});
      assert.equal(listen.callbacks["a"].length, 2);

      listen.on('b', function() {});
      assert.equal(listen.callbacks["b"].length, 1);
    });
  });

  describe('#trigger()', function(){
    it('should trigger existent events', function(){
      var listen = new Listen(),
          mockObject = {};

      listen.on("jump", function (callback) {
        mockObject["jump"] = "called";
      });

      assert.equal(Object.keys(mockObject).length, 0);

      listen.trigger("jump");

      assert.equal(mockObject["jump"], "called");
    });

    it('should trigger two callbacks on the same event', function(){
      var listen = new Listen(),
          mockObject = {};

      listen.on("add", function (callback) {
        mockObject["one"] = "called";
      });

      listen.on("add", function (callback) {
        mockObject["two"] = "called";
      });

      assert.equal(Object.keys(mockObject).length, 0);

      listen.trigger("add");
      assert.equal(mockObject["one"], "called");
      assert.equal(mockObject["two"], "called");
    });
  });

  describe('extending Listener', function() {
    it('should reuse #on and #trigger methods', function() {
      var AnyObj = function () {};
      AnyObj.prototype = new Listen();

      var mock = {
        screamed: 0,
        scream: function() {
          this.screamed += 1;
        }
      };

      var any = new AnyObj();
      any.on("scream", function() { mock.scream(); });

      assert.equal(mock.screamed, 0);

      any.trigger("scream");
      assert.equal(mock.screamed, 1);

      any.trigger("scream");
      assert.equal(mock.screamed, 2);
    });
  });
});
