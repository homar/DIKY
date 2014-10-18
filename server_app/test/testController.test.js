var superagent = require('superagent')
var expect = require('expect.js')
var server = require('../app/server.js')
var Test = require('../app/model/test.js')

describe('testController', function () {
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
    Test.remove({}).exec()
    Test.createAll(test_data.tests, function (err) {
      if (err && err.length) {
        console.log("ERROR: " + err)
      }
      done()
    })
  })

  it('retrieves list of tests', function (done) {
    superagent.get('http://localhost:3000/tests')
      .end(function (err, res) {
        expect(err).to.eql(null)
        expect(res.body).to.be.an('array')
        expect(res.body.map(function (test) {
          return test.name
        })).to.contain('test1')
        done()
      })
  })

  it('retrieves test of a given name', function (done) {
    superagent.get('http://localhost:3000/tests/test1')
      .end(function (err, res) {
        expect(err).to.eql(null)
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.eql('test1')
        done()
      })
  })

  it('returns 404 when no test of given name', function (done) {
    superagent.get('http://localhost:3000/tests/not_existing')
      .end(function (err, res) {
        expect(res.statusCode).to.eql(404)
        done()
      })
  })
})