var superagent = require('superagent')
var mongoskin = require('mongoskin')
var expect = require('expect.js')
var server = require('../app/server.js')
var config = require('../config/application.js')
var Test = require('../app/model/test.js')
var Fulfilment = require('../app/model/fulfilment.js')

describe('diky REST api server', function() {
  var db
  var test_data

  before(function(done) {
    server.start(3000)
    db = mongoskin.db(config.db.mongodb, {safe:true})
    test_data = require('./test_data.js')
    done()
  })



  describe('/tests endpoint', function() {
    beforeEach(function(done) {
      Test.remove({}).exec()
      Test.createAll(test_data.tests, function(err) {
        if (err && err.length) {
          console.log("ERROR: " + err)
        }
        done()
      })
    })

    it('retrieves list of tests', function(done) {
      superagent.get('http://localhost:3000/tests')
        .end(function(err, res) {
          expect(err).to.eql(null)
          expect(res.body).to.be.an('array')
          expect(res.body.map(function (test) { return test.name })).to.contain('test1')
          done()
        })
    })

    it('retrieves test of a given name', function(done) {
      superagent.get('http://localhost:3000/tests/test1')
        .end(function(err, res) {
          expect(err).to.eql(null)
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.eql('test1')
          done()
        })
    })

    it('returns 404 when no test of given name', function(done) {
      superagent.get('http://localhost:3000/tests/not_existing')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(404)
          done()
        })
    })
  })

  describe('/fulfilments endpoint', function() {
    beforeEach(function(done) {
      Fulfilment.remove({}).exec()
      Fulfilment.createAll(test_data.fulfilments, function(err) {
        if (err && err.length) {
          console.log(err)
        }

        done()
      })
    })
    
    it('retrieves all fulfilments', function(done) {
      superagent.get('http://localhost:3000/fulfilments')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })

    it('retrieves pending invitations for user', function(done) {
      superagent.get('http://localhost:3000/fulfilments/pending/user2')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200)
          expect(res.body).to.be.an('array')
          expect(res.body.map(function(f) { return f.invitee.username})).to.only.contain('user2')
          expect(res.body.map(function(f) { return f.invitee.answers && f.invitee.answers.length ? 'defined' : 'undefined' })).to.only.contain('undefined')
          done()
        })
    })

    it('creates test fulfilment', function(done) {
      superagent.post('http://localhost:3000/fulfilments')
        .send(
          {
            _id: "3",
            test_id: "1",
            initiator: {
                username: "user3",
                answers: [
                  { question_number: "1", answer: "opt1" },
                  { question_number: "2", answer: "user3 answer" }
                ]
            },

            invitee: {
              username: "user1"
            }
          }
        )
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200)
          expect(res.body._id).to.be.ok()
          done()
        })
    })

    it('allows to submit test fulfilment', function(done) {
      superagent.put('http://localhost:3000/fulfilments/2')
        .send(
          {
            invitee: {
              username: "user2",
              answers: [
                { question_number: 1, answer: "opt1" },
                { question_number: 2, answer: "user2 answer" }
              ]
            }
          }
        )
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200) 
          Fulfilment.findById("2", function(err, fulfilment) {
            expect(fulfilment.invitee.answers).to.be.an('array')
            expect(fulfilment.invitee.username).to.eql('user2')
            done()
          })
        })
    })

    it('gets tests about user', function(done) {
      superagent.get('http://localhost:3000/fulfilments/about/user2')
        .end(function(err, res) {
          expect(res.statusCode).to.eql(200)
          expect(res.body.map(function(f) {
            if (f.initiator.username == 'user2' 
              || f.invitee.username == 'user2') return 'about'
            else return 'not_about_user2'
          })).to.only.contain('about')
          done()
        })
    })
  })
   
  after(function(done) {
    if (db) db.close()
    done()
  })
})
