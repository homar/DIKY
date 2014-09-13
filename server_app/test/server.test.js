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



  beforeEach(function(done) {
    db.collection('tests').drop();
    db.collection('tests').insert([
        {
          name: "test1",
          description: "desc",
          questions: [
            {
              number: "1",
              type: "closed",
              text: "question1",
              options: ["opt1", "opt2"],
            },
            {
              number: "2",
              type: "open",
              text: "question2",
            }
          ]
        }
      ], function (err, results) {
        done(); 
      });
  });

  it('retrieves list of tests', function(done) {
    superagent.get('http://localhost:3000/tests')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('array');
        expect(res.body.map(function (test) { return test.name })).to.contain('test1');
        done();
      });
  });

  it('retrieves test of a given name', function(done) {
    superagent.get('http://localhost:3000/tests/test1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.eql('test1');
        done();
      });
  });

  it('returns 404 when no test of given name', function(done) {
    superagent.get('http://localhost:3000/tests/not_existing')
      .end(function(err, res) {
        expect(res.statusCode).to.eql(404);
        console.log(res.body);
        done();
      });
  });
 
  afterEach(function(done) {
    if (db) {
      db.collection('tests').drop();
      done();
    }
  });
   
  after(function(done) {
    if (db) db.close();
    done();
  });
});
