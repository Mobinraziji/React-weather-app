import { useState, useEffect } from "react";

import WeatherDetails from "./WeatherDetails";
import WeatherOverview from "./WeatherOverview";
import {
  getWeatherApiData,
  getWeeklyForcast,
  getWeatherByCoords,
} from "./services/weatherApi";

import styles from "./WeatherContainer.module.css";

function WeatherContainer() {
  const [city, setCity] = useState("tehran");
  const [weather, setWeather] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;
      setIsLoading(true);

      try {
        const todayData = await getWeatherApiData(city, unit);
        const weekly = await getWeeklyForcast(city, unit);

        setWeather(todayData);
        setWeeklyData(weekly);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div className={styles.weatherBox}>
      <WeatherOverview
        city={city}
        setCity={setCity}
        weather={weather}
        isLoading={isLoading}
        unit={unit}
        setUnit={setUnit}
      />
      <WeatherDetails
        weeklyData={weeklyData}
        isLoading={isLoading}
        weather={weather}
        unit={unit}
        setUnit={setUnit}
      />
    </div>
  );
}

export default WeatherContainer;
