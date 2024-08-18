import React, { useState } from 'react';

export default function WeatherApp() {
    const [city, setCity] = useState('');
    
    // Function for getting the current weather
    const getCurrentWeather = (cityName) => {
        const weathercall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=17991d912ecf9f915449bc8b0469a6f4&units=imperial`;

        fetch(weathercall)
            .then(response => response.json())
            .then(data => {
                document.getElementById("title").textContent = `Current Weather for ${data.name}`;
                document.getElementById("iconcurrent").innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon" />`;
                document.getElementById("temp").textContent = `Temperature: ${data.main.temp} F`;
                document.getElementById("humid").textContent = `Humidity: ${data.main.humidity}`;
                document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} mph`;
            });
    };

    // Function for calling forecasted weather
    const getForecastWeather = (cityName) => {
        const weathercall = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=17991d912ecf9f915449bc8b0469a6f4&units=imperial`;

        // fetch(weathercall)
        //     .then(response => response.json())
        //     .then(data => {
        //         updateForecast(0, data);
        //         updateForecast(1, data);
        //         updateForecast(2, data);
        //         updateForecast(3, data);
        //         updateForecast(4, data);
        //     });
    };

    // const updateForecast = (dayIndex, data) => {
    //     const offset = dayIndex * 10;
    //     document.getElementById(`title${dayIndex}`).textContent = `${dayIndex === 0 ? "Tomorrow's" : `Day ${dayIndex + 1}`} Weather for ${data.city.name}`;
    //     document.getElementById(`icon${dayIndex}`).innerHTML = `<img src="https://openweathermap.org/img/w/${data.list[offset].weather[0].icon}.png" alt="weather icon" />`;
    //     document.getElementById(`temp${dayIndex}`).textContent = `Temperature: ${data.list[offset].main.temp} F`;
    //     document.getElementById(`humid${dayIndex}`).textContent = `Humidity: ${data.list[offset].main.humidity}`;
    //     document.getElementById(`wind${dayIndex}`).textContent = `Wind Speed: ${data.list[offset].wind.speed} mph`;
    //     document.getElementById(`date${dayIndex}`).textContent = `Date: ${data.list[offset].dt_txt}`;
    // };

    const start = () => {
        getCurrentWeather(city);
    };

    return (
        <div>
            <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button id="citySearch" onClick={start}>Search</button>

            <div className="card-body">
                <h5 className="card-title" id="title"></h5>
                <p className="card-text" id="iconcurrent"></p>
                <p className="card-text" id="temp"></p>
                <p className="card-text" id="humid"></p>
                <p className="card-text" id="wind"></p>
            </div>

            {/* Forecast cards for the next 5 days */}
            {[...Array(5)].map((_, i) => (
                <div key={i} className="card-body">
                    <h5 className="card-title" id={`title${i}`}></h5>
                    <p className="card-text" id={`date${i}`}></p>
                    <p className="card-text" id={`icon${i}`}></p>
                    <p className="card-text" id={`temp${i}`}></p>
                    <p className="card-text" id={`humid${i}`}></p>
                    <p className="card-text" id={`wind${i}`}></p>
                </div>
            ))}
        </div>
    );
}
