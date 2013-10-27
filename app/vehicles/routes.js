function getVehicles(req, res) {
  //...
}

function createVehicle(req, res) {
  //...
}

function setup(app) {
  app.post('/vehicles', createVehicle);
  app.get('/vehicles', getVehicles);
}

module.exports = setup;
