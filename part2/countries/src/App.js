import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'


const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => setCountries(response.data))
  }, [])

  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesFiltered = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  let countriesToShow
  if (countriesFiltered.length <= 10) {
    if (countriesFiltered.length === 1) {
      const country = countriesFiltered[0]
      const languages = Object.keys(country.languages).map((key, i) => <li key={key}>{country.languages[key]}</li>)
      countriesToShow = <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}<br />
          area {country.area}</p>
        <h2>languages:</h2>
        <ul>{languages}</ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
        <Weather country={country} />
      </div>
    } else {
      countriesToShow = countriesFiltered.map(country => <p key={country.name.official}>{country.name.common} <button onClick={() => setCountryFilter(country.name.common)}>show</button></p>)
    }
  } else {
    countriesToShow = 'Too many matches, specify another filter'
  }

  return (
    <div>
      <div>find countries <input value={countryFilter} onChange={handleCountryChange}/></div>
      <div>{countriesToShow}</div>
    </div>
  );
}

export default App;
