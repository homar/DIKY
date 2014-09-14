var express = require('express');
var router = express.Router(); 

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

module.exports = function(app) {
  var config = require('../config/application.js')[app.settings.env];
  var mongoskin = require('mongoskin');
  var db = mongoskin.db(config.db.mongodb, {safe:true});
  var tests = require('./model/test.js').init(db);

  router.get("/tests", function(req, res) {
    tests.find().toArray(function(err, tests) {
      res.json(tests);
    });
  });
  
  router.get("/tests/:name", function(req, res) {
    tests.findByName(req.params.name, function(err, test) {
      if (!test || isEmptyObject(test)) {
        res.writeHead(404, {
          'Content-Type': 'text/plain' 
        });
        res.end("No test with name: " + req.params.name);
      } else {
        res.json(test);
      }
    });
  });

  return router;
};
