import styles from "./WeatherOverview.module.css";
import { FaSearch } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { FaLocationDot } from "react-icons/fa6";

import { getWeatherByCoords, convertTemperature } from "./services/weatherApi";

import { useState } from "react";

function WeatherOverview({ city, setCity, weather, isLoading, unit, setUnit }) {
  const [searchCity, setSearchCity] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const searchButtonHandeler = () => {
    if (searchCity.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    setCity(searchCity);
    setSearchCity("");
  };

  const getLocationWeather = () => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setIsLocating(false);
          const { latitude, longitude } = position.coords;

          try {
            const data = await getWeatherByCoords(latitude, longitude);
            setCity(data.name);
          } catch (error) {
            console.error("Error fetching weather by location:", error);
            alert("Failed to fetch weather data. Please try again.");
          }
        },
        (error) => {
          setIsLocating(false);
          let errorMessage =
            "An unknown error occurred while fetching location.";
          if (error.code === 1) {
            errorMessage =
              "Location access was denied. Please enable location services in your browser settings.";
          } else if (error.code === 2) {
            errorMessage = "Location information is unavailable.";
          } else if (error.code === 3) {
            errorMessage = "Location request timed out.";
          }
          alert(errorMessage);
        }
      );
    } else {
      alert("Your browser does not support geolocation.");
    }
  };

  return (
    <div className={styles.container}>
      {isLocating && <p>Fetching your location...</p>}
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
            <h1>
              {Math.round(convertTemperature(weather.main.temp, unit))}°
              {unit === "metric" ? "C" : "F"}
            </h1>

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
