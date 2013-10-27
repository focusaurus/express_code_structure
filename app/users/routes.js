function getUsers(req, res) {
  //...
}

function createUser(req, res) {
  //...
}

function setup(app) {
  app.post('/users', createUser);
  app.get('/users', getUsers);
}

module.exports = setup;
