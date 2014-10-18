var express = require('express')
var router = express.Router()
var Fulfilment = require('../model/fulfilment.js')
var responses = require('./apiResponses.js')

router.get('/', function(req, res) {
  Fulfilment.findAll(function(err, fulfilments) {
    responses.ok(res, fulfilments)
  })
})

router.get('/pending/:username', function(req, res) {
  Fulfilment.getPendingForUser(req.params.username, function(err, fulfilments) {
    responses.ok(res, fulfilments)
  })
})

router.post('/', function(req, res) {
  Fulfilment.create(req.body, function(err, fulfilment) {
    if (err || !fulfilment) {
      responses.notFound(res, err)
    } else {
      responses.ok(res, {_id: fulfilment._id})
    }
  })
})

router.put('/:id', function(req, res) {
  Fulfilment.updateById(req.params.id, {invitee: req.body.invitee}, function(err, result) {
    if (!result) {
      responses.notFound(res, "Not found fulfilment with ID: " + req.params.id)
    } else if (err) {
      responses.internalError(res)
    } else {
      responses.ok(res)
    }
  })
})

router.get('/about/:username', function(req, res) {
  Fulfilment.getAboutUser(req.params.username, function(err, fulfilments) {
    responses.ok(res, fulfilments)
  })
})

module.exports = router