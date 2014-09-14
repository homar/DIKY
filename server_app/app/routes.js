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
  var fulfilments = require('./model/fulfilment.js').init(db);

  router.get("/tests", function(req, res) {
    tests.findAll(function(err, tests) {
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


  router.get('/fulfilments', function(req, res) {
    fulfilments.findAll(function(err, fulfilments) {
      res.json(fulfilments);
    });
  });

  router.get('/fulfilments/pending/:username', function(req, res) {
    fulfilments.getPendingForUser(req.params.username, function(err, fulfilments) {
      res.json(fulfilments);
    });
  });

  router.post('/fulfilments', function(req, res) {
    fulfilments.insert(req.body, function(err, fulfilment) {
      res.json({_id: fulfilment[0]._id}); 
    });
  });

  router.put('/fulfilments/:id', function(req, res) {
    fulfilments.updateById(req.params.id, {invitee: req.body.invitee}, function(err, result) {
      res.end();
    });
  });

  router.get('/fulfilments/about/:username', function(req, res) {
    fulfilments.getAboutUser(req.params.username, function(err, fulfilments) {
      res.json(fulfilments);
    });
  });

  return router;
};
