var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TestSchema = new Schema({
  _id: String,
  name: String,
  description: String,
  
  questions: [{
    number: Number,
    type: { type: String, enum: ['open', 'closed'] },
    text: String,
    opts: [String]
  }]
})

var Test = mongoose.model('Test', TestSchema)

Test.createAll = function(tests, callback) {
  var toBeCreated = tests.length
  var errors = []
  for(var i in tests) {
    var test = tests[i]
    this.create(test, function(err, small) {
      if (err) err.push(err)
      toBeCreated--
      console.log(toBeCreated)
      if (toBeCreated <= 0) {
        callback(errors.length ? errors : null)
      }
    })
  } 
}

Test.findAll = function(callback) {
  this.find({}, null, function(err, tests) {
    callback(err, tests)
  })
}

Test.findByName = function(name, callback) {
  this.findOne({name: name}, callback)
}

module.exports = Test
