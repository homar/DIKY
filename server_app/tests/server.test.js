var superagent = require('superagent');
var mongoskin = require('mongoskin');
var expect = require('expect.js');
var server = require('../app/server.js');
var config = require('../config/application.js')["development"];

describe('diky REST api server', function() {
  var db;

  before(function(done) {
    server.start(3000);
    db = mongoskin.db(config.db.mongodb, {safe:true});
    done();
  })


  after(function(done) {
    if (db) db.close();
    done();
  });

  beforeEach(function(done) {
    db.collection('tests').drop();
    db.collection('tests').insert([
        { from: "user1@foo.bar", about: "user2@foo.bar"},
        { from: "user3@foo.bar", about: "user1@foo.bar"}
      ], function (err, results) {
        done();        
      });
  });

  it('posts filled test', function(done) {
    superagent.post('http://localhost:3000/tests')
      .send({ from: "piotrekjanisz@gmail.com",
        about: "konraddziedzic@gmail.com"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200)
        expect(res.body).to.only.have.keys('from', 'about', '_id');
        done();
      });
  });

  it('retrieves list of user tests', function(done) {
    superagent.get('http://localhost:3000/users/user1@foo.bar/tests')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('array');
        expect(res.body.map(function (element) { return element.from })).to.contain('user1@foo.bar', 'user2@foo.bar');
        done();
      });
  });
});
