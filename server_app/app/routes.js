var express = require('express')
var router = express.Router() 

function isEmptyObject(obj) {
    return !Object.keys(obj).length
}

module.exports = function() {
  var config = require('../config/application.js')
  var mongoskin = require('mongoskin')
  var db = mongoskin.db(config.db.mongodb, {safe:true})
  var Test = require('./model/test.js')
  var Fulfilment = require('./model/fulfilment.js')

  router.get("/tests", function(req, res) {
    Test.findAll(function(err, tests) {
      res.json(tests)
    })
  })
  
  router.get("/tests/:name", function(req, res) {
    Test.findByName(req.params.name, function(err, test) {
      if (!test || isEmptyObject(test)) {
        res.writeHead(404, {
          'Content-Type': 'text/plain' 
        })
        res.end("No test with name: " + req.params.name)
      } else {
        res.json(test)
      }
    })
  })


  router.get('/fulfilments', function(req, res) {
    Fulfilment.findAll(function(err, fulfilments) {
      res.json(fulfilments)
    })
  })

  router.get('/fulfilments/pending/:username', function(req, res) {
    Fulfilment.getPendingForUser(req.params.username, function(err, fulfilments) {
      res.json(fulfilments)
    })
  })

  router.post('/fulfilments', function(req, res) {
    Fulfilment.create(req.body, function(err, fulfilment) {
      if (err || !fulfilment) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end(JSON.stringify(err))
      } else { 
        res.json({_id: fulfilment._id}) 
      }
    })
  })

  router.put('/fulfilments/:id', function(req, res) {
    Fulfilment.updateById(req.params.id, {invitee: req.body.invitee}, function(err, result) {
      res.end()
    })
  })

  router.get('/fulfilments/about/:username', function(req, res) {
    Fulfilment.getAboutUser(req.params.username, function(err, fulfilments) {
      res.json(fulfilments)
    })
  })

  return router
}
