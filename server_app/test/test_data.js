module.exports = {
  tests: [
    {
      _id: "1",
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
  ],
  
  fulfilments: [
    {
      _id: "1",
      test_id: "1",
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
    },

    {
      _id: "2",
      test_id: "1",
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
    },
  ] 
}
