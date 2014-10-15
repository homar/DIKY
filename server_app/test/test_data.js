
var ObjectId = require('mongoose').Types.ObjectId

var test1 = {
  _id: ObjectId(),
  name: "test1",
  description: "desc",
  questions: [
    {
      number: 1,
      type: "closed",
      text: "question1",
      opts: ["opt1", "opt2"],
    },
    {
      number: 2,
      type: "open",
      text: "question2",
      opts: []
    }
  ]
}

var completed_fulfilment = {
  _id: ObjectId(),
  test_id: test1._id,
  initiator: {
    username: 'user1',
    answers: [
      { question_number: "1", answer: "opt1" },
      { question_number: "2", answer: "answer1" },
    ], 
  },
  invitee: {
    username: 'user2',
    answers: [
      { question_number: "1", answer: "opt1" },
      { question_number: "2", answer: "answer2" },
    ],
  },
}

var pending_fulfilment = {
  _id: ObjectId(),
  test_id: test1._id,
  initiator: {
    username: 'user3',
    answers: [
      { question_number: "1", answer: "opt1" },
      { question_number: "2", answer: "answer1" },
    ], 
  },
  invitee: {
    username: 'user2',
  },
}

module.exports = {
  test1: test1,
  completed_fulfilment: completed_fulfilment,
  pending_fulfilment: pending_fulfilment,

  tests: [ test1 ],
  
  fulfilments: [ completed_fulfilment, pending_fulfilment ] 
}
