import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Routing from './Components/Routing';
import UseRedux from './Components/UseRedux';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import ReactReduxConnect from './Components/ReactReduxConnect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ReactReduxConnect/>
    </Provider>
    {/* <BrowserRouter>
      <Routing/>
    </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
