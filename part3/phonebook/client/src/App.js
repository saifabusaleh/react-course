import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personsService from './services/personsService';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-789'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(true)

  const updateMessage = (message, isSuccess) => {
    setIsSuccess(isSuccess);
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  useEffect(() => {
    personsService
    .getAll()
      .then(persons => {
        setPersons(persons)
      })
      .catch(error => {
        console.log('getAll persons failed ', error)
        if(error.response.data.error) {
          updateMessage(`failed to getAll, ${error.response.data.error}`,false);
        } else {
          updateMessage(`failed to getAll, ${error}`,false);
        }
        
      })
  }, [])

  const AddName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }

    let isPersonAlreadyExist = persons.find((person)=> person.name === newName);
    if(isPersonAlreadyExist) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        personsService
        .update(isPersonAlreadyExist.id, personObject)
          .then(addedPersonResult => {
            setPersons(persons.map(person => person.id !== isPersonAlreadyExist.id ? person : addedPersonResult))
            setNewName('')
            setNewNumber('')

            updateMessage(`${addedPersonResult.name} updated.`, true);
          })
          .catch(error => {
            console.log('update person failed ', error)
            if(error.response.data.error) {
              updateMessage(`failed to update person, ${error.response.data.error}`,false);
            } else {
              updateMessage(`failed to update person, ${error}`,false);
            }
          })
      }
    } else {
      personsService
      .create(personObject)
        .then(addedPersonResult => {
          console.log('added person: ', addedPersonResult)
          setPersons(persons.concat(addedPersonResult))
          setNewName('')
          setNewNumber('')
          updateMessage(`${addedPersonResult.name} added.`, true);
        })
        .catch(error => {
          console.log('create person failed ', error)
          if(error.response.data.error) {
            updateMessage(`failed to create person, ${error.response.data.error}`,false);
          } else {
            updateMessage(`failed to create person, ${error}`,false);
          }
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const deletePerson = (personToBeDeleted) => {
    if (window.confirm(`Do you really want to delete ${personToBeDeleted.name}?`))  {
      personsService
      .deletePerson(personToBeDeleted.id)
        .then(deletePersonResult => {
          console.log(deletePersonResult);
          setPersons(persons.filter(person=>person.id !== personToBeDeleted.id));
          setNewName('')
          setNewNumber('')
          updateMessage(`${personToBeDeleted.name} deleted.`, true);
        })
        .catch(error => {
          console.log('create person failed ', error)
          if(error.response.data.error) {
            updateMessage(`failed to delete, ${error.response.data.error}`,false);
          } else {
            updateMessage(`failed to delete, ${error}`,false);
          }
         
        })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} isSuccess={isSuccess}/>

      <Filter searchTerm={searchTerm} handleSearchTermChange={(event)=> handleSearchTermChange(event)}></Filter>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={(event)=>handleNameChange(event)}
                  handleNumberChange={(event)=> handleNumberChange(event)} AddName={(event)=>AddName(event)}></PersonForm>
      
      <Persons searchTerm={searchTerm} persons={persons}
                deletePerson={(personId)=>deletePerson(personId)}></Persons>
      
    </div>
  )
}

export default App