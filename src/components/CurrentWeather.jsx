import React, { useState } from 'react';
import rainday from '../assets/rainday.png';
import clearday from '../assets/clearday.png';
import hotday from '../assets/hotday.png';

export default function WeatherApp() {
    const [city, setCity] = useState('');
    const [weatherImage, setWeatherImage] = useState(null);

    // Function for getting the current weather
    const getCurrentWeather = (cityName) => {
        const weathercall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=17991d912ecf9f915449bc8b0469a6f4&units=imperial`;

        fetch(weathercall)
            .then(response => response.json())
            .then(data => {
                const temp = data.main.temp;
                const iconcode = data.weather[0].icon;
                const iconurl = `https://openweathermap.org/img/w/${iconcode}.png`;

                // Update DOM elements
                document.getElementById("title").textContent = `Current Weather for ${data.name}`;
                document.getElementById("iconcurrent").innerHTML = `<img src="${iconurl}" alt="weather icon" />`;
                document.getElementById("temp").textContent = `Temperature: ${temp} F°`;
                document.getElementById("humid").textContent = `Humidity: ${data.main.humidity}`;
                document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} mph`;
                document.getElementById("pettemp").textContent = `Day time Concrete/Asphalt Temperature: ${temp + 20} F°`;
                document.getElementById("grasstemp").textContent = `Day time Grass Temperature: ${temp + 10} F°`;

                // Logic for displaying the correct weather image based on conditions
                if ([
                    'https://openweathermap.org/img/w/09d.png',
                    'https://openweathermap.org/img/w/09n.png',
                    'https://openweathermap.org/img/w/10d.png',
                    'https://openweathermap.org/img/w/10n.png',
                    'https://openweathermap.org/img/w/11d.png',
                    'https://openweathermap.org/img/w/11n.png',
                    'https://openweathermap.org/img/w/13d.png',
                    'https://openweathermap.org/img/w/13n.png'
                ].includes(iconurl)) {
                    setWeatherImage(rainday);
                } else if (temp > 70) {
                    setWeatherImage(hotday);
                } else if (temp > 20 && temp < 70) {
                    setWeatherImage(clearday);
                } else {
                    setWeatherImage(null); // No image to display
                }
            })
            .catch(error => {
                console.error("Error fetching the weather data:", error);
            });
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
                {weatherImage && <img src={weatherImage} alt="Weather Condition" />}
            </div>
        </div>
    );
}
