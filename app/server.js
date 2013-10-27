var express = require("express");
var app = express();

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

app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    log.error("Unable to listen for connections", error);
    process.exit(10);
  }
  log.info("express is listening on " +
    config.express.ip + ":" + config.express.port);
});
