function getCustomers(req, res) {
  //...
}

function createCustomer(req, res) {
  //...
}

function setup(app) {
  app.post('/customers', createCustomer);
  app.get('/customers', getCustomers);
}

module.exports = setup;
