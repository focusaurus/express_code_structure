var customer = require('./customer-model')
var log = require('bole')('customers/router')
var router = require('express').Router()

function getCustomers (req, res) {
  customer.findAll(function (error, customers) {
    if (error) {
      log.error(error, 'error finding customers')
      res.status(500).send(error)
      return
    }
    res.json(customers)
  })
}

function createCustomer (req, res) {
  res.status(201).send()
}

router.post('/customers', createCustomer)
router.get('/customers', getCustomers)

module.exports = router
