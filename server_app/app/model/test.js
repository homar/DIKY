module.exports.init = function(db) {
  db.bind('tests').bind({
    findAll: function(callback) {
      this.find().toArray(callback);
    },
    findByName: function(name, callback) {
      this.findOne({name: name}, callback);
    }
  });

  return db.tests;
}
