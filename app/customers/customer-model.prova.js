var test = require('prova')
var customer = require('./customer-model')

test('customer.findAll should return an array', function (assert) {
  customer.findAll(function (error, result) {
    assert.error(error)
    assert.ok(Array.isArray(result))
    assert.end()
  })
})
