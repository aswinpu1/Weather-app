import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchicon from '../assets/search.png'
import clearicon from '../assets/clear.png'
import cloudicon from '../assets/cloud.png'
import drizzleicon from '../assets/drizzle.png'
import humidityicon from '../assets/humidity.png'
import rainicon from '../assets/rain.png'
import snowicon from '../assets/snow.png'
import windicon from '../assets/wind.png'

const Weather = () => {
    const inputRef=useRef()
    const [wetherData, setWeatherData] = useState(false);


    const allIcons={
    "01d":clearicon,
    "01n":clearicon,
    "02d":cloudicon,
    "02n":cloudicon,
    "03d":cloudicon,
    "03n":cloudicon,
    "04d":drizzleicon,
    "04n":drizzleicon,
    "09d":rainicon,
    "09n":rainicon,
    "10d":rainicon,
    "10n":rainicon,
    "13d":snowicon,
    "13n":snowicon,
    
    }

    const search = async (city) => {
  if(city ===""){
    alert("enter city name")
    return;
  }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url)
            const data = await response.json()
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clearicon
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature:Math.floor( data.main.temp),
                location:data.name,
                icon: icon
            })

        } catch (error) {

        }

    }
    useEffect(() => {
        search("New York");
    },[])

    return (
        <div className='weather'>
            <div className="search_bar">
                <input ref={inputRef} type="text" placeholder="Search" id="" />
                <img src={searchicon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>
            <img src={wetherData.icon} alt="" className='weather-icon' />
            <p className='temperature'>{wetherData.temperature}°C</p>
            <p className='location'>{wetherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidityicon} alt="" />
                    <div>
                        <p>{wetherData.humidity}</p><span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={windicon} alt="" />
                    <div>
                        <p>{wetherData.windSpeed}</p><span>wind speed</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Weather