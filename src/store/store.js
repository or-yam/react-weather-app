import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '../containers/Weather/slice/slice';
import autoCompleteSlice from '../components/Search/slice/slice';
import favoritesSlice from '../containers/Favorites/slice/slice';
import appSlice from '../containers/App/slice/slice';

export default configureStore({
  reducer: {
    weather: weatherSlice,
    autoComplete: autoCompleteSlice,
    favorites: favoritesSlice,
    app: appSlice
  }
});
