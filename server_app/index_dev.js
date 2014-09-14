var server = require("./app/server.js");
var mongoskin = require('mongoskin');

var config = require('./config/application.js')['development'];
var db = mongoskin.db(config.db.mongodb, {safe:true});

var dev_data = require('./test/dev_test_data.js');

db.collection('tests').insert(dev_data.tests, function(err, res) {   
});
db.collection('fulfilments').insert(dev_data.fulfilments, function(err, res) {
  server.start();
});

