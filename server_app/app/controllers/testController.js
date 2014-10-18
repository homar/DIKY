var express = require('express')
var router = express.Router()

function isEmptyObject(obj) {
  return !Object.keys(obj).length
}

var Test = require('../model/test.js')

router.get("/", function (req, res) {
  Test.findAll(function (err, tests) {
    res.json(tests)
  })
})

router.get("/:name", function (req, res) {
  Test.findByName(req.params.name, function (err, test) {
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


module.exports = router

