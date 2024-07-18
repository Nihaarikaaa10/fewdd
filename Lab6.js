import React, {useState} from 'react'
import axios from 'axios';
const Lab6 = () => {
    const [weather,setWeather] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [city,setCity] = useState('');
    const apiKey = '61a1d8419f9d307924240958d89e284d';
    const fetchWeather = async ()=>{
        setLoading(true);
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            setWeather(response.data);
            setLoading(false);
        } catch(err){
            setError(err);
            setLoading(false);
        }

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        fetchWeather();
        setCity("");
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>City name:</label>
            <input type='text' value={city} onChange={(e)=>{
                setCity(e.target.value);
            }}/>
            <button type='submit'>Submit</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching: {error.message}</p>}
        {weather && (
            <div>
                <p>Weather in {weather.name}</p>
                <p>Temperature: {(weather.main.temp- 273.15).toFixed(2)}</p>
                <p>Condition: {weather.weather[0].description}</p>

            </div>
        )}
    </div>
  )
}

export default Lab6