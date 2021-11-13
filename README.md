# Weather App 🌦️

## Live app [here](https://weatherapp-liard-five.vercel.app/)

## Repo [Link](https://bitbucket.org/oryamne/weather-app/src/main/)

## Running the app locally

### Prerequisites

You can run the app using real live data or local moc-data

#### Using real data

1. Get api key from [AccuWeather api](https://developer.accuweather.com/)
2. Paste the key under `REACT_APP_API_API_KEY` in `.env.example` file.
3. Rename `.env.example` to `.env`

#### Using local data

- Open `src/services/api.js`
- Uncomment all json files imports (lines 2-5)
- Comment all uses of `makeRequest`
- Uncomment the mock data instance

Example :

```js
export const fetchGeoLocation = ({ lat, lon }) =>
  // makeRequest('get', GEO_LOCATION_ENDPOINT, { q: `${lat},${lon}` });

  // mock data
  geoLocationData;
```

1. Clone the repo
2. Run `npm i`
3. Run `npm start` (will start the app on localhost:3000)

## Tools and libs

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
- [Axios](https://www.npmjs.com/package/axios) for data fetching
- [React router dom](https://reactrouter.com/) (v6) for SPA navigation
- [Material UI](https://mui.com/) for styling
- Weather data from [AccuWeather api](https://developer.accuweather.com/)
- Geolocation [API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- Deployed on [Vercel](https://vercel.com/)
