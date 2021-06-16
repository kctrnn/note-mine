import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import store from './app/store';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
