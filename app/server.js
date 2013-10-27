#!/usr/bin/env node
var config = require("app/config");
var express = require("express");
var app = express();
//Use whichever logging system you prefer.
//Doesn't have to be winston, I just wanted something more or less realistic
var log = require("winston").loggers.get("app:server");

app.set("views", __dirname);

//Load the routes ("controllers" -ish)
[
  "app/users/routes",
  "app/vehicles/routes",
  "app/customers/routes",
  "app/deals/routes",
  "app/site/routes"
].forEach(function (routePath) {
    require(routePath)(app);
});

//Note that there's not much logic in this file.
//The server should be mostly "glue" code to set things up and
//then start listening

app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    log.error("Unable to listen for connections", error);
    process.exit(10);
  }
  log.info("express is listening on http://" +
    config.express.ip + ":" + config.express.port);
});
