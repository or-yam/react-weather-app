import axios from 'axios';
import weatherData from '../moc-data/currentconditions.json';
import forecastData from '../moc-data/5day.json';
import autoCompleteData from '../moc-data/autocomplete.json';
import geoLocationData from '../moc-data/geopositionsearch.json';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_API_KEY;
const FIVE_DAYS_ENDPOINT = 'forecasts/v1/daily/5day/';
const CURRENT_WEATHER_ENDPOINT = 'currentconditions/v1/';
const LOCATIONS_ENDPOINT = 'locations/v1/cities/';
const AUTOCOMPLETE_ENDPOINT = `${LOCATIONS_ENDPOINT}autocomplete/`;
const GEO_LOCATION_ENDPOINT = `${LOCATIONS_ENDPOINT}geoposition/search`;

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.params = { apikey: API_KEY };

const makeRequest = async (method, endpoint, params) => {
  try {
    return (await axios[method](`/${endpoint}`, { params })).data;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const fetchCurrentWeather = async (locationKey) => {
  // const [data] = makeRequest(
  //   'get',
  //   `${CURRENT_WEATHER_ENDPOINT}${locationKey}`
  // );
  const [data] = weatherData;
  return { ...data, key: locationKey };
};

export const fetchForecast = (locationKey, isMetric = true) => forecastData;
// makeRequest('get', `${FIVE_DAYS_ENDPOINT}${locationKey}`, {
//   metric: isMetric
// });

export const fetchAutoCompleteCitiesList = (query) => autoCompleteData;
// makeRequest('get', AUTOCOMPLETE_ENDPOINT, { q: query });

export const fetchGeoLocation = ({ lat, lon }) => geoLocationData;
// makeRequest('get', GEO_LOCATION_ENDPOINT, { q: `${lat},${lon}` });
