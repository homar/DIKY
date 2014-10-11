var config = require('../config/application.js');
var mongoskin = require('mongoskin');
var db = mongoskin.db(config.db.mongodb, {safe:true});
