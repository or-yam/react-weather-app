import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation, getUserCity } from '../containers/App/slice/slice';
import { selectUserLocation } from '../containers/App/slice/selectors';

export default () => {
  const dispatch = useDispatch();
  const userLocation = useSelector(selectUserLocation);

  const success = ({ coords }) => {
    const { latitude: lat, longitude: lon } = coords;
    dispatch(setUserLocation({ lat, lon }));
  };

  const error = (err) => {
    console.warn(err);
    return err;
  };

  const getLocation = () => {
    const geo = navigator.geolocation;
    if (!geo) {
      console.warn('Geolocation is not supported');
      return;
    }
    geo.getCurrentPosition(success, error);
  };

  React.useEffect(() => {
    userLocation && dispatch(getUserCity(userLocation));
  }, [userLocation.lat]);

  return { userLocation, getLocation };
};
