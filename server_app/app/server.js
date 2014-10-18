var express = require('express')
var winston = require('winston')
var mongoose = require('mongoose')
var expressWinston = require('express-winston')
var app = express()

process.env.DIKY_ENV = app.settings.env

var config = require('../config/application.js')

var bodyparser = require('body-parser')

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'error' }),
    new (winston.transports.File)({ level: 'info', filename: config.logging.file})
  ]
})

app.use(bodyparser.json())
app.use(expressWinston.logger({
  transports: [
    logger
  ],
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}" 
}))

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}))


app.use('/tests', require('./controllers/testController.js'))
app.use('/fulfilments', require('./controllers/fulfilmentController.js'))


var server = undefined

exports.start = function(port) {
  mongoose.connect(config.db.mongodb)

  port = port || 3000
  server = app.listen(3000)
  logger.log("info", "DIKY server listening on port %d in %s mode", port, app.settings.env)
}

exports.stop = function() {
  if (server) server.close()
  mongoose.disconnect()
}
