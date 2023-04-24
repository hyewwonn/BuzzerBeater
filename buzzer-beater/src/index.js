import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import GameRule from './pages/GameRule';
// import PCrule from './pages/PCrule';
import reportWebVitals from './reportWebVitals';
import GameRule from './pages/GameRule';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameRule/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();