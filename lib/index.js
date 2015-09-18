var
  Request = require("request"),
  _ = require("lodash");

/**
 * @param {String} trackingId - tracking id, UA-XXXX-Y
 * @param {Object} [options]
 * @param {Number} [options.poolSize=32] - max number of parallel connections to google analytics server
 * @param {Number} [options.protocol=http] - protocol used to connect analtics server, "https" or "http"
 */
var Client = function(trackingId, options) {
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
  params.tid = this._trackingId;
  params.v = 1;
  this._request({
    url: this._options.protocol + "://" + this._analyticsHost + "/collect",
    form: params
  }, cb);
};

module.exports = Client;