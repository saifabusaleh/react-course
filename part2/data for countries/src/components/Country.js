import React from 'react'

const Language = ({ value }) => (
      <p>{value}</p>
  )
  

const Country = ({ country, showInfo}) => {

    const mapLanguages = () => country.languages.map((language)=> 
    <Language
    key={language.name}
    value={language.name}
  />)
        
    
    if(showInfo) {
        return(
            <div>
                <h2>{country.name}</h2>

                <p>Capital: {country.capital}</p>
                <p>population: {country.population}</p>

                <h2>Languages</h2>
                <div>
                    {mapLanguages()}
                </div>


                <div><img src={country.flag} alt="flag" width="200" height="200"></img></div>
            </div>
        )
    }
    return(
        <div>
            <p>{country.name}</p>
        </div>
    )
}

export default Country;
