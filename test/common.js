var
  should = require("should"),
  Client = require("../lib/index"),
  http = require("http"),
  querystring = require("querystring");

describe("common", function() {
  it("should set default values", function() {
    var c = new Client("tid");
    c._trackingId.should.equal("tid");
    c._options.poolSize.should.equal(32);
    c._options.protocol.should.equal("http");
  });

  describe("test request", function() {
    var server;
    var data = {};
    before(function() {
      server = http.createServer(function(req, res) {
        var rawData = "";
        req.on("data", function(chunk) {
          rawData += chunk;
        });
        req.on("end", function() {
          var r = querystring.parse(rawData);
          r.should.eql({
            tid: "trid",
            t: "pageview",
            dh: "host.com",
            dp: "/",
            v: "1"
          });
          res.write("hello");
          res.end();
        });
      });
      server.listen(4001);
    });
    after(function() {
      server.close();
    });
    it("should make request", function(done) {
      var client = new Client("trid");
      client._analyticsHost = "localhost:4001";
      client.send({
        t: "pageview",
        dh: "host.com",
        dp: "/",
      }, done);
    });
  });
});