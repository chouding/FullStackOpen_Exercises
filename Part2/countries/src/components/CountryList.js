import axios from 'axios'
import { useState } from 'react'

const CountryList = ( { handleSearchChange, searchCountry, countryData } ) => {
    const [temp, setTemp] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    const [icon, setIcon] = useState('')

    if (searchCountry === "") {
        return <div></div>
    }

    let foundCountryCount = 0
    const foundCountries = []

    for (const country of countryData) {
        if (country.name.common.toLowerCase().includes(searchCountry.toLowerCase())) {
            foundCountryCount++
            foundCountries.push(country)
        }
    }

    if (foundCountryCount > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    else if (foundCountryCount > 1) {
        return (
            <div>
                {foundCountries.map(country => 
                <div key={country.name.common}>
                    {country.name.common}
                    <button value={country.name.common} onClick={handleSearchChange}>show</button>
                </div>)}
            </div>
        )
    }

    else if (foundCountryCount === 1) { //only one country found
        const languages = []
        for (const key in foundCountries[0].languages) {
            languages.push(foundCountries[0].languages[key])
        }

        const api_key = process.env.REACT_APP_API_KEY
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${foundCountries[0].capital}&appid=${api_key}&units=metric`)
          .then(response => {
            setTemp(response.data.main.temp)
            setWindSpeed(response.data.wind.speed)
            setIcon(response.data.weather[0].icon)
          })

        return (
            <div>
                <h1>{foundCountries[0].name.common}</h1>
                <div>capital {foundCountries[0].capital}</div>
                <div>area {foundCountries[0].area}</div>
                <h4>languages:
                    <ul>
                    {languages.map(language => <li key={language}>{language}</li>)}
                    </ul>
                </h4>
                <img src={foundCountries[0].flags.png} alt={foundCountries[0].name.common} />
                <h3>Weather in {foundCountries[0].capital}</h3>
                <div>temperature {temp} Celsius</div>
                <img src={`http://openweathermap.org/img/w/${icon}.png`}/>
                <div>wind {windSpeed} m/s</div>
            </div>
        )
    }

    else {
        return <div></div>
    }

}

export default CountryList
