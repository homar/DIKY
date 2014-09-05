var mongoskin = require('mongoskin');
var express = require('express');
var winston = require('winston');
var expressWinston = require('express-winston');
var app = express();

var config = require('../config/application.js')[app.settings.env];

var bodyparser = require('body-parser');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'error' }),
    new (winston.transports.File)({ level: 'info', filename: config.logging.file})
  ]
});

app.use(bodyparser.json());
app.use(expressWinston.logger({
  transports: [
    logger
  ],
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}" 
}));

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

var db = mongoskin.db(config.db.mongodb, {safe:true});

app.post("/tests", function(req, res) {
  db.collection('tests').insert(req.body, function(err, result) {
    if (err) return res.end(err);
    res.json(result[0]);
  });
});

app.get("/users/:username/tests", function(req, res, username) {
  var query = {
    $or: [{from: username}, {about: username}]
  };
  db.collection('tests').find(query).toArray(function(err, results) {
    res.json(results);
  });
});


function start(port) {
  port = port || 3000;
  app.listen(3000);
  logger.log("info", "DIKY server listening on port %d in %s mode", port, app.settings.env);
}

exports.start = start;
