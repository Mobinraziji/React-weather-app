import styles from "./WeatherDetails.module.css";
import { BeatLoader } from "react-spinners";

import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { GiPressureCooker } from "react-icons/gi";
import { FaCloud } from "react-icons/fa";

import { convertTemperature } from "./services/weatherApi";

import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";

function WeatherDetails({ weeklyData, isLoading, weather, unit, setUnit }) {
  console.log(weather);

  return (
    <div className={styles.detailContainer}>
      <div className={styles.navbar}>
        <h3>This Week:</h3>
        <div className={styles.buttonsClick}>
          <button
            className={
              unit === "metric" ? styles.activeUnit : styles.unitButton
            }
            onClick={() => setUnit("metric")}
          >
            °C
          </button>
          <button
            className={
              unit === "imperial" ? styles.activeUnit : styles.unitButton
            }
            onClick={() => setUnit("imperial")}
          >
            °F
          </button>
          <img src="./myPhoto.png" alt="photo" />
        </div>
      </div>

      <div className={styles.otherDays}>
        {isLoading ? (
          <BeatLoader color="#E3B505" />
        ) : weeklyData.length > 0 ? (
          weeklyData.map((day) => {
            const date = new Date(day.dt_txt);
            const weekday = date.toLocaleDateString("en", { weekday: "long" });

            return (
              <div key={day.dt} className={styles.dailyCard}>
                <p className={styles.date}>{weekday}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="weather icon"
                  className={styles.icon}
                />
                <p className={styles.temp}>
                  {Math.round(convertTemperature(day.main.temp, unit))}°
                  {unit === "metric" ? "C" : "F"}
                </p>

                <p className={styles.desc}>{day.weather[0].description}</p>
              </div>
            );
          })
        ) : (
          <p>No forecast data available</p>
        )}
      </div>

      <div className={styles.todayshilights}>
        <h4>Today's Highlights:</h4>
        {weather ? (
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <FaTemperatureArrowDown />
              <h5>Temp Min:</h5>
              <p>
                {Math.round(convertTemperature(weather.main.temp_min, unit))}°
                {unit === "metric" ? "C" : "F"}
              </p>
            </div>
            <div className={styles.highlightCard}>
              <FaTemperatureArrowUp />
              <h5>Temp Max:</h5>
              <p>
                {Math.round(convertTemperature(weather.main.temp_max, unit))}°
                {unit === "metric" ? "C" : "F"}
              </p>
            </div>
            <div className={styles.highlightCard}>
              <GiPressureCooker />
              <h5>Pressure:</h5>
              <p>{weather.main.pressure} hPa</p>
            </div>
            <div className={styles.highlightCard}>
              <FaCloud fontSize={"17px"} />
              <h5>Cloud Coverage:</h5>
              <p>{weather.clouds.all}%</p>
            </div>
            <div className={styles.highlightCard}>
              <FiSunrise />
              <h5>Sunrise:</h5>
              <p>
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </p>{" "}
            </div>
            <div className={styles.highlightCard}>
              <FiSunset />
              <h5>Sunset:</h5>
              <p>
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </p>{" "}
            </div>
          </div>
        ) : (
          <p>Weather data not available</p>
        )}
      </div>
    </div>
  );
}

export default WeatherDetails;
