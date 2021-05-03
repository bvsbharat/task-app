import dayjs from "dayjs";
import { getIcon } from "./iconsMap";

const formatDate = (dte, lang) => {
  if (lang && lang !== "en") {
    dayjs.locale(lang.replace("_", "-"));
  }
  if (dte && dayjs().isValid(dte)) {
    return dayjs.unix(dte).format("ddd D MMMM");
  }
  return "";
};

const mapCurrent = (day, geoData, lang) => {
  return {
    city: geoData.name,
    state: geoData.state,
    country: geoData.country,
    date: formatDate(day.dt, lang),
    description: day.weather[0] ? day.weather[0].description : null,
    icon: day.weather[0] && getIcon(day.weather[0].icon),
    temperature: {
      current: day.temp.toFixed(0),
      min: undefined, // openweather doesnt provide min/max on current weather
      max: undefined,
    },
    wind: day.wind_speed,
    humidity: day.humidity,
    pressure: day.pressure,
  };
};

const mapForecast = (forecast, lang) => {
  const mappedForecast = [];
  for (let i = 0; i < 8; i += 1) {
    mappedForecast.push({
      date: formatDate(forecast[i].dt, lang),
      description: forecast[i].weather[0]
        ? forecast[i].weather[0].description
        : null,
      icon: forecast[i].weather[0] && getIcon(forecast[i].weather[0].icon),
      temperature: {
        min: forecast[i].temp.min.toFixed(0),
        max: forecast[i].temp.max.toFixed(0),
      },
      wind: forecast[i].wind_speed.toFixed(0),
      humidity: forecast[i].humidity,
      pressure: forecast[i].pressure,
    });
  }
  return mappedForecast;
};

const mapData = (forecastData, todayData, geoData, lang) => {
  const mapped = {};
  if (forecastData && todayData) {
    const daysData = forecastData;
    mapped.current = mapCurrent(todayData, geoData, lang);
    mapped.forecast = mapForecast(daysData);
  }
  return mapped;
};

export { mapData };
