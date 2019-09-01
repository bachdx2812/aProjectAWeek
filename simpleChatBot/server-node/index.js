const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get(
  '/api/questions', (req, res) => res.send([
    {
      isQuestion: false,
      content: 'Welcome to my chat bot',
    },
    {
      isQuestion: true,
      content: 'What is your name?',
      type: 1
    },
    {
      isQuestion: false,
      isNameQuestion: true,
      content: 'Hello {name}'
    },
    {
      isQuestion: true,
      content: 'Gender',
      type: 2,
      options: [
        { label: 'Male', value: 1 },
        { label: 'Female', value: 2 },
        { label: 'Unknown', value: 0 }
      ]
    },
  ])
)

app.post('/api/answer' , (req, res) => {
  console.log(req.body);

  res.send('thank you');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))