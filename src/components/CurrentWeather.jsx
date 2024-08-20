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
                document.getElementById("temp").textContent = `Temperature: ${data.main.temp} F°`;
                document.getElementById("humid").textContent = `Humidity: ${data.main.humidity}`;
                document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} mph`;
                document.getElementById("pettemp").textContent = `Day time Concrete/Asphalt Temperature: ${data.main.temp + 20} F°`;
                document.getElementById("grasstemp").textContent = `Day time grass Temperature: ${data.main.temp + 10} F°`;
            });

    };

    // Function for calling forecasted weather
    const getForecastWeather = (cityName) => {
        const weathercall = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=17991d912ecf9f915449bc8b0469a6f4&units=imperial`;

    };

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
                placeholder="Enter City Name"
            />
            <br />
            <br />
            <button id="citySearch" onClick={start}>Search</button>

            <div className="card-body">
                <h3 className="card-title" id="title"></h3>
                <p className="card-text" id="iconcurrent"></p>
                <p className="card-text" id="temp"></p>
                <p className="card-text" id="humid"></p>
                <p className="card-text" id="wind"></p>
               <strong><p className="card-text" id="pettemp"></p></strong>
               <strong><p className="card-text" id="grasstemp"></p></strong>
            </div>
        </div>
    );
}
