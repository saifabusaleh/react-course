import React from 'react'

const Person = ({person, deletePerson}) => {
const onDeletePerson = () => {
    deletePerson(person);
}
return(
    <div>
    {person.name} {person.number}  
    <button onClick={onDeletePerson}>delete</button>
    </div>
)
}

export default Person;