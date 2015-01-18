function notFound(req, res) {
  res.status(404).render("errors/notFound");
}

module.exports = notFound;
