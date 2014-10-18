var express = require('express')
var router = express.Router()
var Fulfilment = require('../model/fulfilment.js')

router.get('/', function(req, res) {
  Fulfilment.findAll(function(err, fulfilments) {
    res.json(fulfilments)
  })
})

router.get('/pending/:username', function(req, res) {
  Fulfilment.getPendingForUser(req.params.username, function(err, fulfilments) {
    res.json(fulfilments)
  })
})

router.post('/', function(req, res) {
  Fulfilment.create(req.body, function(err, fulfilment) {
    if (err || !fulfilment) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(JSON.stringify(err))
    } else {
      res.json({_id: fulfilment._id})
    }
  })
})

router.put('/:id', function(req, res) {
  Fulfilment.updateById(req.params.id, {invitee: req.body.invitee}, function(err, result) {
    res.end()
  })
})

router.get('/about/:username', function(req, res) {
  Fulfilment.getAboutUser(req.params.username, function(err, fulfilments) {
    res.json(fulfilments)
  })
})

module.exports = router