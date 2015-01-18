var test = require("tape");
var customer = require("./customerModel");

test("customer.findAll should return an array", function(assert) {
  customer.findAll(function(error, result) {
    assert.error(error);
    assert.ok(Array.isArray(result));
    assert.end();
  });
});
