var
  Request = require("request"),
  _ = require("lodash"),
  util = require("util"),
  EventEmitter = require("events");

/**
 * @param {String} trackingId - tracking id, UA-XXXX-Y
 * @param {Object} [options]
 * @param {Number} [options.poolSize=32] - max number of parallel connections to google analytics server
 * @param {Number} [options.protocol=http] - protocol used to connect analtics server, "https" or "http"
 */
var Client = function(trackingId, options) {
  EventEmitter.call(this);
  this._trackingId = trackingId;
  this._analyticsHost = "www.google-analytics.com";
  this._options = _.defaults(options || {}, {
    poolSize: 32,
    protocol: "http"
  });
  this._request = Request.defaults({
    forever: true,
    pool: {maxSockets: this._options.poolSize}
  });
};

/**
 * send data to google analytics
 * @param  {Object}   params - data to send
 * @param  {Function} cb
 */
Client.prototype.send = function(params, cb) {
  var self = this;
  if (!params.tid) {
    params.tid = this._trackingId;
  }
  params.v = 1;
  var req = this._request.post({
    url: this._options.protocol + "://" + this._analyticsHost + "/collect",
    form: params
  }, cb);
  req.on("error", function(err) {
    self.emit("error", err);
  });
};

util.inherits(Client, EventEmitter);

module.exports = Client;