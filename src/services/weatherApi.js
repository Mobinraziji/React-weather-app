const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "51478f21d013c828cbf085532f1016cd";

const getWeatherApiData = async (city, unit = "metric") => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  const json = await res.json();
  return json;
};

const getWeeklyForcast = async (city, unit = "metric") => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  const json = await res.json();
  const dailyForecast = json.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );
  return dailyForecast;
};

const getWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const json = await res.json();
  return json;
};

const convertTemperature = (temp, unit) => {
  if (unit === "imperial") {
    return (temp * 9) / 5 + 32;
  }
  return temp;
};

export {
  getWeatherApiData,
  getWeeklyForcast,
  getWeatherByCoords,
  convertTemperature,
};
