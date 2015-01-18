var express = require("express");
var join = require("path").join;

var router = new express.Router();

function home(req, res) {
  res.render("site/home");
}

function team(req, res) {
  res.render("site/team");
}

router.use(express.static(join(__dirname, "../../wwwroot")));
router.get("/", home);
router.get("/team", team);

module.exports = router;
