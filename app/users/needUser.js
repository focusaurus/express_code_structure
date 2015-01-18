function needUser(req, res, next) {
  if (req.session.user) {
    next();
    return;
  }
  //This is pseudocode, just to convey a basic idea...
  res.redirect("/sign-in?next=" + encodeURIComponent(req.path));
}

module.exports = needUser;
