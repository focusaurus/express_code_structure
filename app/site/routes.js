//Here's a set of routes for the full HTML pages on our site
var express = require('express');

function home(req, res) {
  res.render("site/home");
}

function team(req, res) {
  res.render("site/team");
}

function setup(app) {
  app.use(express.static(__dirname + "../wwwroot"));
  app.get('/', home);
  app.get('/team', team);
}

module.exports = setup;
