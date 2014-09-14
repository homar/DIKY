module.exports = {
  tests: [
    {
      _id: "1",
      name: "test1",
      description: "Jak dobrze się znacie",
      questions: [
        {
          number: "1",
          type: "Pytanie otwarte",
          text: "",
          options: ["opcja1", "opcja2"],
        },
        {
          number: "2",
          type: "open",
          text: "Jakiego koloru ma włosy",
        }
      ]
    }
  ],
  
  fulfilments: [
    {
      _id: "1",
      test_id: "1",
      initiator: {
        username: 'piotrekjanisz',
        answers: [
          { question_number: "1", answer: "opcja1" },
          { question_number: "2", answer: "czarne" },
        ], 
      },
      invitee: {
        username: 'konraddziedzic',
        answers: [
          { question_number: "1", answer: "opcja2" },
          { question_number: "2", answer: "brązowe" },
        ],
      },
    },

    {
      _id: "2",
      test_id: "1",
      initiator: {
        username: 'dariuszgałysa',
        answers: [
          { question_number: "1", answer: "opcja2" },
          { question_number: "2", answer: "blond" },
        ], 
      },
      invitee: {
        username: 'dominikagałysa',
      },
    },
  ] 
}
