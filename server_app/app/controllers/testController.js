var express = require('express')
var router = express.Router()

var responses = require('./apiResponses.js')

function isEmptyObject(obj) {
  return !Object.keys(obj).length
}

var Test = require('../model/test.js')

router.get("/", function (req, res) {
  Test.findAll(function (err, tests) {
    responses.ok(res, tests)
  })
})

router.get("/:name", function (req, res) {
  Test.findByName(req.params.name, function (err, test) {
    if (!test || isEmptyObject(test)) { responses.notFound(res, "No test with name: " + req.params.name)
    } else {
      responses.ok(res, test)
    }
  })
})


module.exports = router

