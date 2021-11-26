import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './containers/App/App';

import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
 TODO:
 Remove bitbucket from origins
 add a 404 page
 Handle errors in a better way (RTK query?)
 Improve slice dividing (less slices, share data better)
 Auto-complete debounce - avoid race conditions by using abort call with axios
 Auto-complete state should't be in redux
 Use context for App state
 Replace to a free weather api
 Replace to a free auto complete api
 Update styles to look and feel like google weather app
 */
