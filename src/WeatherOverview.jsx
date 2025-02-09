import styles from "./WeatherOverview.module.css";
import { FaSearch } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { FaLocationDot } from "react-icons/fa6";

import { useState } from "react";

function WeatherOverview({ city, setCity, weather, isLoading }) {
  const [searchCity, setSearchCity] = useState("");

  const searchButtonHandeler = () => {
    if (searchCity.trim() !== "") {
      setCity(searchCity);
      setSearchCity("");
    }
  };

  const getLocationWeather = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button onClick={searchButtonHandeler}>
          <FaSearch />
        </button>
        <button className={styles.locationButton} onClick={getLocationWeather}>
          <FaLocationDot />
        </button>
      </div>

      {isLoading ? (
        <BeatLoader color="#E3B505" />
      ) : weather ? (
        <div className={styles.weatherCard}>
          <div className={styles.leftPanel}>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <p>{weather.weather[0].description}</p>
            <p className={styles.cityName}>
              {weather.name}, {weather.sys.country}
            </p>
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.infoBox}>
              <h4>Humidity:</h4>
              <p>{weather.main.humidity}%</p>
            </div>

            <div className={styles.infoBox}>
              <h4>Wind:</h4>
              <p>{weather.wind.speed} km/h</p>
            </div>

            <div className={styles.infoBox}>
              <h4>Visibility:</h4>
              <p>{weather.visibility / 1000} km</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default WeatherOverview;
