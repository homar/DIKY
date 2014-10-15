var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Types.ObjectId

var FulfilmentSchema = new Schema({
  test_id: {type: String, ref: 'Test'},
  initiator: {
    username: String,
    answers: [{question_number: Number, answer: String}]
  },

  invitee: {
    username: String,
    answers: [{question_number: Number, answer: String}]
  }
})

var Fulfilment = mongoose.model('Fulfilment', FulfilmentSchema)

Fulfilment.createAll = function(fulfilments, callback) {
  var toBeCreated = fulfilments.length
  var errors = []
  for(var i in fulfilments) {
    var fulfilment = fulfilments[i]
    this.create(fulfilment, function(err, f) {
      if (err) err.push(err)
      toBeCreated--
      if (toBeCreated <= 0) {
        callback(errors.length ? errors : null)
      }
    })
  } 
}

Fulfilment.findAll = function(callback) {
  this.find({}, null, callback)
}

Fulfilment.getPendingForUser = function(username, callback) {
  this.find({
      'invitee.username': username,
      'invitee.answers': { $not: { $exists: true, $not: { $size: 0 } } }
  }).exec(callback)
}

Fulfilment.getAboutUser = function(username, callback) {
  var query = {
    $or: [
      { 'invitee.username': username },
      { 'initiator.username': username }
    ]
  };

  this.find(query).exec(callback) 
},

Fulfilment.updateById = function(id, value, callback) {
  this.update({_id: ObjectId(id)}, value, callback); 
}

module.exports = Fulfilment
