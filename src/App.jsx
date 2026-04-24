{weather && status && (
  <section className={`result-card ${status.level}`}>
    <div className="result-top">
      <div className="dog-mascot">🐶</div>

      <div className="status-lockup">
        <div className="status-emoji">
          {status.level === "safe" ? "✓" : status.level === "caution" ? "!" : "!"}
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
        <span>Estimated Pavement</span>
        <strong>{Math.round(temp + 20)}°F</strong>
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
      🐾 <strong>Paw tip:</strong> Hold the back of your hand to the pavement for 7 seconds.
      If it feels too hot, it is probably too hot for paws.
    </p>
  </section>
)}