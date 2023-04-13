import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({message: '', type: ''})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)
    if (person !== undefined) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          ...person,
          number: newNumber
        }

        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNotification({message: `Updated ${person.name}`, type: 'success'})
            setTimeout(() => {
              setNotification({message: '', type: ''})
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotification({message: `Information of ${person.name} has already been removed from server, resubmit to add as new`, type: 'error'})
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification({message: `Added ${returnedPerson.name}`, type: 'success'})
          setTimeout(() => {
            setNotification({message: '', type: ''})
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (person) => {
    personService.remove(person.id).then(response => {
      setPersons(persons.filter(p => p.id !== person.id))
      setNotification({message: `Removed ${person.name}`, type: 'success'})
      setTimeout(() => {
        setNotification({message: '', type: ''})
      }, 5000)
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handlePersonRemove = (person, event) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      removePerson(person)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson}
                  name={newName}
                  handleNameChange={handleNameChange}
                  number={newNumber}
                  handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handlePersonRemove={handlePersonRemove} />
    </div>
  )

}

export default App