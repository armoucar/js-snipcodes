var Oath = (function () {
  "use strict";

  var Oath = function() {
    this.funcs = [];
    this._done = false;
    this._result = undefined;
  };

  Oath.prototype.then = function(callback) {
    if (this._done) {
      callback(this._result);
    } else {
      var func = callback.bind(this);
      this.funcs.push(func);
    }
  };

  Oath.prototype.done = function(result) {
    if (this.funcs.length) {
      this.funcs.forEach(function (f) {
        f(result);
      });

      this.funcs = [];
    }

    this._done = true;
    this._result = result;
  };

  Oath.chain = function() {
    var args = Array.prototype.slice.apply(arguments); 
    console.log(args);
  };

  return Oath;
}());

module.exports = Oath;
