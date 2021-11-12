import axios from 'axios';
// import weatherData from '../moc-data/currentconditions.json';
// import forecastData from '../moc-data/5day.json';
// import autoCompleteData from '../moc-data/autocomplete.json';
// import geoLocationData from '../moc-data/geopositionsearch.json';

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
    return { error: error.message };
  }
};
export const fetchCurrentWeather = async (locationKey) => {
  const data = await makeRequest(
    'get',
    `${CURRENT_WEATHER_ENDPOINT}${locationKey}`
  );

  return data.error
    ? { error: data.error, key: locationKey }
    : { ...data[0], key: locationKey };

  // mock data
  // const [data] = weatherData;
  // return { ...data, key: locationKey };
};

export const fetchForecast = (locationKey, isMetric = true) =>
  makeRequest('get', `${FIVE_DAYS_ENDPOINT}${locationKey}`, {
    metric: isMetric ? 'true' : 'false'
  });

// mock data
// forecastData;

export const fetchAutoCompleteCitiesList = (query) =>
  makeRequest('get', AUTOCOMPLETE_ENDPOINT, { q: query });

// mock data
// autoCompleteData;

export const fetchGeoLocation = ({ lat, lon }) =>
  makeRequest('get', GEO_LOCATION_ENDPOINT, { q: `${lat},${lon}` });

// mock data
// geoLocationData;
