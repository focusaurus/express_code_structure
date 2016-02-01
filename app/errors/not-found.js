function notFound (req, res) {
  res.status(404).render('errors/not-found')
}

module.exports = notFound
