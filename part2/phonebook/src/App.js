import React, { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-789'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')


  const AddName = (event) => {
    event.preventDefault();
    let isPersonAlreadyExist = persons.find((person)=> person.name === newName);
    if(isPersonAlreadyExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      id: persons.length + 1
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTermChange={(event)=> handleSearchTermChange(event)}></Filter>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={(event)=>handleNameChange(event)}
                  handleNumberChange={(event)=> handleNumberChange(event)} AddName={(event)=>AddName(event)}></PersonForm>
      
      <Persons searchTerm={searchTerm} persons={persons}></Persons>
      
    </div>
  )
}

export default App