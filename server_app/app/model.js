var config = require('../config/application.js')[app.settings.env];
var mongoskin = require('mongoskin');
var db = mongoskin.db(config.db.mongodb, {safe:true});
