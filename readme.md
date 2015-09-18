# Install

`npm install g-analytics`

# Usage

## Create `Client` instance

```js
var Client = require("g-analytics");
var client = new Client({
  trackingId: "UA-XXXX-Y",
  poolSize: 10
});
```

## Options

### trackingId

Tracking ID for Google Analytics in format `UA-XXXX-Y`

### poolSize

For high load applications it's good idea to reuse connections to Google Analytics server instead of creation new for each Hit/Event/etc.., so this option set maximium parallel connections to analytics servers.

## Send info to google analytics

This lib doesn't have methods for different analytics stats types, so it has only one method `send`, which does all work to send data to analytics server:

```js
client.send({
  "t": "pageview",
  "cid": 123456,
  "dh": "host.com",
  "dp": "/"
});
```

More Google Analytics parameters you can see here: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cs.