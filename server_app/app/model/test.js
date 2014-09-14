module.exports.init = function(db) {
  db.bind('tests').bind({
    findByName: function(name, callback) {
      this.findOne({name: name}, callback);
    }
  });

  return db.tests;
}
