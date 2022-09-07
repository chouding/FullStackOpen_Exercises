const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/people')

// Run first
app.use(express.static('build'))
app.use(express.json())
app.use(cors())


morgan.token('person', (req, res) => {
  const name = req.body.name
  const number = req.body.number
  return JSON.stringify({name: name, number: number})
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))


const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(people => {
    response.send(`<div>Phonebook has info for ${people.length} people</div>
    <div>${new Date()}</div>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error =>  {
    next(error)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(person => {
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body

  if (!(person.name) || !(person.number)) {
    response.status(404).json({error: 'name or number is missing'})
  }

  else {
    const newPerson = new Person(person)
    newPerson.save()
      .then(result => {
        response.json(result)
      })
      .catch(error => next(error))
  }

})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name: name, number : number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

