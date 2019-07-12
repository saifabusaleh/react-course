import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import Filter from './components/Filter'
import Content from './components/Content'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('') 
  const [visibleCountries, setVisibleCountries] = useState([]) 
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleChanges = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
    let copy = countries.filter((country) => {
      return country.name.toLowerCase().includes(event.target.value.toLowerCase())
      
    });
    
    setVisibleCountries(copy);
  }

  return (
    <div className="App">
      <Filter searchValue={searchTerm} handleChange={(event) => handleChanges(event)}></Filter>
      <div>
      <Content visibleCountries={visibleCountries}></Content>
        </div>
    </div>
  );
}

export default App;
