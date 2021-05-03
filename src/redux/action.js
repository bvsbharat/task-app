import axios from "axios";
import { mapData } from "../utils";

export const SET_DATA = "SET_DATA";
export const FAILURE = "FAILURE";
export const TOGGLE_TEMP = "TOGGLE_TEMP";

const key = "82bc0d2d2aa2db497547b0da40fb0dcf"; //process.env.REACT_APP_API_KEY;
const lang = "en";
const forecast = "https://api.openweathermap.org/data/2.5/onecall";

export const getData = (options) => async (dispatch) => {
  const { unit, query } = options;
  let params = {
    appid: key,
    lang,
    units: unit,
    lat: 11,
    lon: 11,
  };

  const geoCode = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&&limit=1&appid=${key}`;

  try {
    const geocode = await axios.get(geoCode);
    const [geoData] = geocode.data;
    params.lat = geoData.lat;
    params.lon = geoData.lon;
    const forecastResponse = await axios.get(forecast, { params });
    const payload = await mapData(
      forecastResponse.data.daily,
      forecastResponse.data.current,
      geoData,
      lang
    );

    dispatch({
      type: SET_DATA,
      payload: payload,
    });
  } catch (error) {
    dispatch({ type: FAILURE, payload: true });
  }
};

export const toggleTemp = (options) => async (dispatch) => {
  const { unit, query } = options;
  let params = {
    appid: key,
    lang,
    units: unit,
    lat: 11,
    lon: 11,
  };

  const geoCode = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&&limit=1&appid=${key}`;

  try {
    const geocode = await axios.get(geoCode);
    const [geoData] = geocode.data;
    params.lat = geoData.lat;
    params.lon = geoData.lon;
    const forecastResponse = await axios.get(forecast, { params });
    const data = await mapData(
      forecastResponse.data.daily,
      forecastResponse.data.current,
      geoData,
      lang
    );

    dispatch({
      type: TOGGLE_TEMP,
      payload: { data, unit },
    });
  } catch (error) {
    dispatch({ type: FAILURE, payload: true });
  }
};
