function getUsers(req, res) {
  //...
}

function createUser(req, res) {
  //...
}

function setup(app) {
  app.get('/users', getUsers);
  app.post('/users', createUser);
}
