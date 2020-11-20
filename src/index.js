import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyFooter from "./Components/Layout/Footer";


ReactDOM.render(
  <React.StrictMode>
    <App />
    <MyFooter/>
  </React.StrictMode>,
  document.getElementById('root')
);


