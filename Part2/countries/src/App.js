import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import CountryList from './components/CountryList'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [countryData, setCountryData] = useState([])

  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryData(response.data)
      })
    }, [])

  return (
    <div>
      <Form value={searchCountry} onChange={handleSearchChange} />
      <CountryList handleSearchChange={handleSearchChange} searchCountry={searchCountry} countryData={countryData} />
    </div>
  );
}

export default App;
