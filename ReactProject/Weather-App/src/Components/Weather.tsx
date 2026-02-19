import {useEffect, useState, useRef} from "react";
import "./weather.css";
import search from '../assets/search.png';
import cloudy from '../assets/cloudy.png';
import drizzle from '../assets/drizzle.png';
import humidity from '../assets/humidity.png';
import snow from '../assets/snow.png';
import sun from '../assets/sun.png';
import wind from '../assets/wind.png';
import rainy from '../assets/rainy.png';


function Weather() {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": sun,
    "01n": sun,
    "02d": cloudy,
    "02n": cloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rainy,
    "09n": rainy,
    "10d": rainy,
    "10n": rainy,
    "13d": snow,
    "13n": snow
  }

  const searching = async(city) => {

    if (!city) {
      alert("Please Enter correct City Name");
      return;
    }

    try{
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
          const response = await fetch(url);
          const data = await response.json();

          const icon = allIcons[data.weather[0].icon] || sun;

          setWeatherData({
            humid: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
          })
    }catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
    
  }

useEffect(() => {
        searching("new york");
      }, []);

  return (
    <div className="weather">

        <div className="search">
          <input ref={inputRef} type="text" placeholder="Enter city..."/>
          <img src={search} alt="search icon" onClick={()=> searching(inputRef.current.value)} />
        </div>
        
        {weatherData? <>
        <img src={weatherData.icon} alt="weather icon" className="weather-icon" />
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity} alt="" className="temp-icon"/>
            <div>
              <p>{weatherData.humid} %</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img src={wind} alt="" className="temp-icon"/>
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
        </>:<p className="error">City Not Found</p>}


    </div>
  );
}

export default Weather;