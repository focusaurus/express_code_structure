function needUser(req, res, next) {
  if (req.session.user) {
    next();
    return;
  }
  //This is pseudocode, just to convey a basic idea...
  res.redirect("/sign-in?next=" + encodeURIComponent(req.path));
}

function notFound(req, res) {
  res.status(404).render("errors/notFound");
}

module.exports = {
  needUser: needUser,
  notFound: notFound
};
