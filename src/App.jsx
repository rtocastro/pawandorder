import { useState } from "react";
import "./App.css";
import { getPawStatus } from "./utils/pawRisk";



function App() {
  const [zip, setZip] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkWeather = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${apiKey}&units=imperial`
      );

      if (!res.ok) {
        throw new Error("Location not found");
      }

      

      const data = await res.json();
      setWeather(data);
    } catch (err) {
setError("Invalid ZIP code. Try something like 91401.");
    } finally {
      setLoading(false);
    }
  };

  const temp = weather?.main?.temp;
const status = weather
  ? getPawStatus({
      temp: weather.main.temp,
      humidity: weather.main.humidity,
      windMph: weather.wind.speed,
      clouds: weather.clouds?.all ?? 50,
      condition: weather.weather?.[0]?.main ?? "",
    })
  : null;

  return (
    <main className="app">
      <section className="hero-card">
        <div className="logo-badge">🐾</div>

        <p className="eyebrow">Paw Safety Weather Checker</p>
        <h1>Paw Protect</h1>

        <p className="tagline">
          Quick check before walkies. Protect the paws. Respect the laws. 🐾
        </p>

        <form onSubmit={checkWeather} className="search-form">
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter ZIP code (e.g. 91406)"
            required
          />

          <button type="submit">
            {loading ? "Checking..." : "Check paws"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && status && (
          <section className={`result-card ${status.level}`}>
            <div className="result-top">
              <div className="dog-mascot">🐶</div>

              <div className="status-lockup">
                <div className="status-emoji">
                  {status.level === "safe" ? "✓" : "!"}
                </div>

                <div>
                  <h2>{status.title}</h2>
                  <p>{status.message}</p>
                </div>
              </div>

              <div className="weather-summary">
                <p className="location">{weather.name}</p>
                <div className="big-temp">{Math.round(temp)}°F</div>
                <p>Feels like {Math.round(weather.main.feels_like)}°F</p>
              </div>
            </div>

            <div className="weather-grid">
              <div>
                <span>Air Temp</span>
                <strong>{Math.round(temp)}°F</strong>
              </div>

              <div>
                <span>Estimated Concrete</span>
                <strong>{status.concreteTemp}°F</strong>
              </div>

              <div>
                <span>Humidity</span>
                <strong>{weather.main.humidity}%</strong>
              </div>

              <div>
                <span>Wind</span>
                <strong>{Math.round(weather.wind.speed)} mph</strong>
              </div>
            </div>

            <p className="tiny-tip">
              🐾 <strong>Paw tip:</strong> Hold the back of your hand to the
              pavement for 7 seconds. If it feels too hot, it is probably too
              hot for paws.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}

export default App;