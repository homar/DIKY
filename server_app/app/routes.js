var express = require('express');
var router = express.Router(); 


module.exports = function(app) {
  var config = require('../config/application.js')[app.settings.env];
  var mongoskin = require('mongoskin');
  var db = mongoskin.db(config.db.mongodb, {safe:true});

  router.post("/tests", function(req, res) {
    db.collection('tests').insert(req.body, function(err, result) {
      if (err) return res.end(err);
      res.json(result[0]);
    });
  });

  router.get("/users/:username/tests", function(req, res, username) {
    var query = {
      $or: [{from: username}, {about: username}]
    };
    db.collection('tests').find(query).toArray(function(err, results) {
      res.json(results);
    });
  });

  return router;
};
