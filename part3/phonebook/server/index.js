const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :body '));
app.use(cors())
app.use(express.static('build'))


app.use(bodyParser.json())

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

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(person => person.id === id)
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    console.log(id);
    phonebook = phonebook.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const generateId = () => {
    const maxId = phonebook.length > 0
      ? Math.max(...phonebook.map(n => n.id))
      : 0
    return getRandomArbitrary(maxId+1,1000000)
  }

  const validatePerson = (body) => {
    if (!body || !body.name || !body.number) {
      return response.status(400).json({ 
        error: 'The name or number is missing' 
      })
    }
  }
  app.put('/api/persons/:id', (request, response) => {
    const body = request.body
    console.log("request body is ", body);
    console.log("put id is ", request.params.id);
    validatePerson(body);

    const personToUpdate = phonebook.find(person=>person.id==request.params.id)
    if(!personToUpdate) {
      return response.status(400).json({ 
        error: 'person to update id is missing' 
      })
    }
    console.log("person to update is: ", personToUpdate)
    personToUpdate.name = body.name
    personToUpdate.number = body.number
    response.json(personToUpdate)
  })

  app.post('/api/persons', (request, response) => {
    
    const body = request.body
    console.log("request body is ", body);
    validatePerson(body);
    const isNameExists = phonebook.find(person=> person.name==body.name)
    if (isNameExists) {
      return response.status(400).json({ 
        error: 'The name already exists' 
      })
    }
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    phonebook = phonebook.concat(person)
  
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})