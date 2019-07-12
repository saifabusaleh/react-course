import React from 'react'

const Filter = ({ searchValue, handleChange}) => {
 
    return(
        <div>
            find countries <input onChange={handleChange} value={searchValue}></input>
        </div>
    )
}

export default Filter;
