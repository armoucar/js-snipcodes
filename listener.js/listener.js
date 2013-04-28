var Listen = (function () {

  var Listen = function() {
    this.callbacks = {};
  };

  Listen.prototype.on = function (event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(callback);
  };

  Listen.prototype.trigger = function (event) {
    var args = Array.prototype.slice.call(arguments, 0)
      , e = args.slice()
      , events = this.callbacks[e];

    if (!events) return;
    
    events.forEach(function (callback) {
      callback.call(this);
    });
  };


  return Listen;
}());

module.exports = Listen;
