const express = require('express')
const app = express()

let phonebook = [
    {
      id: 1,
      name: "A",
      number: "123-456-789",
    },
    {
        id: 2,
        name: "B",
        number: "123-456-789",
    },
    {
        id: 3,
        name: "C",
        number: "123-456-789",
    },
    {
        id: 1,
        name: "A",
        number: "123-456-789",
    }
  ]
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/info', (req, res) => {
    let info = `Phone book has info of ${phonebook.length} people`
    let requestTime = new Date()
    res.send(info + '\n' + requestTime)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})