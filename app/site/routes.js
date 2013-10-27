//Here's a set of routes for the full HTML pages on our site

function home(req, res) {
  res.render("site/home");
}

function team(req, res) {
  res.render("site/team");
}

function setup(app) {
  app.get('/', home);
  app.get('/team', team);
}

module.exports = setup;
