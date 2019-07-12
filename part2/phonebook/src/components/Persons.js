import React from 'react'
import Person from './Person'
const Persons = ({persons, searchTerm}) => {
    const personsToShow = searchTerm
    ? persons.filter(person => person.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    : persons;
    console.log('personsToShow ', personsToShow);

    const rows = () => personsToShow.map(person =>
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
        />
      )
return(
    <div>{rows()}</div>
    
)
}

export default Persons;