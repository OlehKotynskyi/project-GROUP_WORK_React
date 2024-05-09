//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
//import { Provider } from 'react-redux';
//import { persistor, store } from './redux/store';
//import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'modern-normalize';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>*/}
    <BrowserRouter basename="/project-GROUP_WORK_React">
      <App />
    </BrowserRouter>
    {/*</PersistGate>
    </Provider>*/}
  </React.StrictMode>
);
