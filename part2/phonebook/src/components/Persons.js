import React from 'react'
import Person from './Person'
const Persons = ({persons, searchTerm, deletePerson}) => {
    const personsToShow = searchTerm
    ? persons.filter(person => person.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    : persons;
    const rows = () => personsToShow.map(person =>
        <Person
          key={person.name}
          person={person}
          deletePerson={deletePerson}
        />
      )
return(
    <div>{rows()}</div>
    
)
}

export default Persons;