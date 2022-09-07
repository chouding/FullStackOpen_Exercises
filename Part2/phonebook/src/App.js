import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import AddButton from './components/AddButton'
import PhonebookList from './components/PhonebookList'
import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './services/phone'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([{ name: '', number: '' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    phoneService
      .getAll()
      .then(personsData => {
      setPersons(personsData)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let copyID = persons.filter(person => person.name === personObject.name)[0]
    if (copyID !== undefined) {
      copyID = copyID.id
    }

    if (!(personObject.name) || !(personObject.number)) {
      setMessage('Unable to add person to server, name and/or number must not be empty')
      setIsError(true)
    }
    else if (copyID !== undefined && 
       window.confirm(`${personObject.name} is already added to phone book, replace the old number with a new one?`)) {
       phoneService
       .update(copyID, personObject)
       .then(updatedPersonObj => {
        setPersons(persons.map(person => person.id !== copyID ? person : updatedPersonObj))
        setMessage(`Successfully altered ${personObject.name}'s number to ${personObject.number}`)
        setIsError(false)
       })
       .catch(error => {
        setMessage(`${error.response.data.error}`)
        setIsError(true)
       })
    }
    else { 
       phoneService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setMessage(`Added ${personObject.name}`)
        setIsError(false)
      })
      .catch(error => {
        setMessage(`${error.response.data.error}`)
        setIsError(true)
      })
    }
    setNewName('')
    setNewNumber('')
    setTimeout(() => setMessage(''), 6000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    const lowerCaseFilterName = event.target.value.toLowerCase()
    setFilterName(lowerCaseFilterName)
  }

  const filterPeople = persons.filter(person => person.name.toLowerCase().includes(filterName))

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification isError={isError} message={message} />

      <Filter value={filterName} onChange={handleFilterNameChange}/>

      <h2>add a new</h2>

      <form>
        <PersonForm text="name:" value={newName} onChange={handleNameChange}/>
        <PersonForm text="number:" value={newNumber} onChange={handleNumberChange}/>
        <AddButton onClick={addPerson}/>
      </form>

      <h2>Numbers</h2>

      <PhonebookList persons={persons} setPersons={setPersons} toMap={filterPeople}/>
    </div>
  )
}

export default App