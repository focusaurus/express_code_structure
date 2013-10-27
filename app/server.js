var express = require("express");
var app = express();

app.set("views", __dirname);

//Load the routes ("controllers" -ish)
[
  "app/users/routes",
  "app/vehicles/routes",
  "app/customers/routes",
  "app/deals/routes"
].forEach(function (routePath) {
    require(routePath)(app);
});
