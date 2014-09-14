module.exports = {
  tests: [
    {
      _id: "1",
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
  ],
  
  fulfilments: [
    "ala"   
  ] 
}
