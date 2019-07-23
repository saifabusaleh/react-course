require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const PersonModel = require('./models/person')
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
  res.send('<h1>Welcome to Phone book App</h1>')
})

app.get('/api/persons', (req, res) => {
  // res.json(phonebook)
  PersonModel.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  });
})

app.get('/info', (req, res) => {
    let info = `Phone book has info of ${phonebook.length} people`
    PersonModel.find({}).then(persons => {
      let requestTime = new Date()
      res.send(persons.length + '\n' + requestTime)
    });
    
  })

  app.get('/api/persons/:id', (request, response, next) => {
  //  const id = Number(request.params.id)
    PersonModel.findById(request.params.id).then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
      
    })  
    .catch(error => {
      next(error);
    }) 
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    PersonModel.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    // phonebook = phonebook.filter(person => person.id !== id)
  
    // response.status(204).end()
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

  const validatePerson = (body, response) => {
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
    // validatePerson(body, response);

    // const personToUpdate = phonebook.find(person=>person.id==request.params.id)
    // if(!personToUpdate) {
    //   return response.status(400).json({ 
    //     error: 'person to update id is missing' 
    //   })
    // }
    // console.log("person to update is: ", personToUpdate)
    // personToUpdate.name = body.name
    // personToUpdate.number = body.number
    // response.json(personToUpdate)
    const person = {
      name: body.name,
      number: body.number,
    }
  
    PersonModel.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  })

  app.post('/api/persons', (request, response, next) => {
    
    const body = request.body
    console.log("request body is ", body);
    // validatePerson(body);
    const isNameExists = phonebook.find(person=> person.name==body.name)
    if (isNameExists) {
      return response.status(400).json({ 
        error: 'The name already exists' 
      })
    }
    const person = new PersonModel({
      name: body.name,
      number: body.number,
    })
  
   // phonebook = phonebook.concat(person)
   person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
   }) 
   .catch(error => next(error));
    
  })


  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    }  else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})