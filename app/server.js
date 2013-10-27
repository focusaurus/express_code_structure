#!/usr/bin/env node
var config = require("app/config");
var express = require("express");
var app = express();
//Use whichever logging system you prefer.
//Doesn't have to be winston, I just wanted something more or less realistic
var log = require("winston").loggers.get("app:server");

app.set("views", __dirname);
//use whatever templating system(s) you like
app.set("view engine", "jade");

//See the README about ordering of middleware
var AUTOUSING_THE_ROUTER_IS_A_NUISANCE = app.router;
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

//OK, routes are loaded, NOW use the router:
app.use(app.router);

//FINALLY, use any error handlers
app.use(require("app/middleware").notFound);

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
