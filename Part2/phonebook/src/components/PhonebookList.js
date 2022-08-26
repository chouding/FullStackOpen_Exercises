import phoneService from '../services/phone'

const PhonebookList = ( { persons, setPersons, toMap }) => {
    const handleDelete = (id) => {
        const specificPerson = persons.filter(person => person.id === id)[0]
        if (window.confirm(`Delete ${specificPerson.name} ?`))
        phoneService
          .remove(id).then(returnedPerson => {
            setPersons(persons.filter(person => person.id !== id))
          })
    }

    return (
        toMap.map(person => (
            <div key={person.number}>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
        ))
    )
}

export default PhonebookList