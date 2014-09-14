module.exports.init = function(db) {
  db.bind('fulfilments').bind({
    findAll: function(callback) {
      this.find().toArray(callback);
    },

    getById: function(id, callback) {
      this.findOne({_id: id}, callback);
    },

    getPendingForUser: function(username, callback) {
      var query = {
        $and: [
          {'invitee.username': username},
          {'invitee.answers': {$exists: false}}
        ]
      };

      this.find(query).toArray(callback);
    },

    getAboutUser: function(username, callback) {
      var query = {
        $or: [
          { 'invitee.username': username },
          { 'initiator.username': username }
        ]
      };

      this.find(query).toArray(callback);
    },

    updateById: function(id, value, callback) {
      this.update({_id: id}, value, callback); 
    }
  });

  return db.fulfilments;
}
