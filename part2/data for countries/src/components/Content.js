import React from 'react'
import Country from './Country';

const Content = ({ visibleCountries}) => {

    if(visibleCountries.length > 10) {
        return(
            <div>Too many matches, specify another filter</div>
        )
    }
    if(visibleCountries.length === 1) {
        return(
            <Country
          country={visibleCountries[0]}
          showInfo="true"
        />
        )
    }
    const rows = () => visibleCountries.map(country =>
        <Country
          key={country.name}
          country={country}
        />
      )
    return(
        <div>
            { rows() }
        </div>
    )
}

export default Content;
