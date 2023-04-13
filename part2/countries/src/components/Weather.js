import { useState, useEffect } from 'react'
import axios from 'axios'

const OPENWEATHERMAP_API_KEY = process.env.REACT_APP_API_KEY

const Weather = (props) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (OPENWEATHERMAP_API_KEY === undefined) {
      console.warn('Missing OpenWeatherMap API key!')
    } else {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.country.capitalInfo.latlng[0]}&lon=${props.country.capitalInfo.latlng[1]}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`).then(response => setWeather(response.data))
    }
  }, [props])

  return (
    <div>
      <h2>Weather in {props.country.capital}</h2>
      {weather ? <div>temperature {weather.main.temp} Celsius<br/>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} /><br/>
        wind {weather.wind.speed} m/s</div>
      : <span>Could not fetch weather, check console</span>}
    </div>
  );
}

export default Weather;