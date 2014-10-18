var superagent = require('superagent')
var expect = require('expect.js')
var server = require('../app/server.js')
var Fulfilment = require('../app/model/fulfilment.js')

describe('fulfilmentController', function () {
  var test_data

  before(function (done) {
    server.start(3000)
    test_data = require('./test_data.js')
    done()
  })

  after(function (done) {
    server.stop()
    done()
  })

  beforeEach(function (done) {
    Fulfilment.remove({}).exec()
    Fulfilment.createAll(test_data.fulfilments, function (err) {
      if (err && err.length) {
        console.log(err)
      }
      done()
    })
  })

  it('retrieves all fulfilments', function (done) {
    superagent.get('http://localhost:3000/fulfilments')
      .end(function (err, res) {
        expect(res.statusCode).to.eql(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('retrieves pending invitations for user', function (done) {
    superagent.get('http://localhost:3000/fulfilments/pending/user2')
      .end(function (err, res) {
        expect(res.statusCode).to.eql(200)
        expect(res.body).to.be.an('array')
        expect(res.body.map(function (f) {
          return f.invitee.username
        })).to.only.contain('user2')
        expect(res.body.map(function (f) {
          return f.invitee.answers && f.invitee.answers.length ? 'defined' : 'undefined'
        })).to.only.contain('undefined')
        done()
      })
  })

  it('creates test fulfilment', function (done) {
    superagent.post('http://localhost:3000/fulfilments')
      .send(
      {
        test_id: test_data.test1._id,
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
      .end(function (err, res) {
        expect(res.statusCode).to.eql(200)
        expect(res.body._id).to.be.ok()
        done()
      })
  })

  it('allows to submit test fulfilment', function (done) {
    superagent.put('http://localhost:3000/fulfilments/' + test_data.pending_fulfilment._id)
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
      .end(function (err, res) {
        expect(res.statusCode).to.eql(200)
        Fulfilment.findById(test_data.pending_fulfilment._id, function (err, fulfilment) {
          expect(fulfilment.invitee.answers).to.be.an('array')
          expect(fulfilment.invitee.username).to.eql('user2')
          done()
        })
      })
  })

  it('gets tests about user', function (done) {
    superagent.get('http://localhost:3000/fulfilments/about/user2')
      .end(function (err, res) {
        expect(res.statusCode).to.eql(200)
        expect(res.body.map(function (f) {
          if (f.initiator.username == 'user2'
            || f.invitee.username == 'user2') return 'about'
          else return 'not_about_user2'
        })).to.only.contain('about')
        done()
      })
  })
})
