import React from 'react'

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, AddName}) => {
return(
    <form onSubmit={AddName}> 
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
          <div>
            number: <input value={newNumber}
          onChange={handleNumberChange}/></div>

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)
}

export default PersonForm;