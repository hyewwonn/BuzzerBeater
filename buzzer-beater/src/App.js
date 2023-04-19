import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameRule from './pages/GameRule';
import logo from './img/logo.png';
import goalpost from './img/goalpost.png';
import bb from './img/blueball.png';
import pb from './img/pinkball.png';
import ob from './img/orangeball.png';
import gb from './img/greenball.png';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <div className="bg-container">
            <img className="goalpost" src={goalpost} alt="goalpost" />
            <img className="blueball" src={bb} alt="blueball" />
            <img className="orangeball" src={ob} alt="orangeball" />
            <img className="pinkball" src={pb} alt="pinkball" />
            <img className="greenball" src={gb} alt="greenball" />
          </div>
          <div className="logo">
            <img className="logo-img" src={logo} alt="logo" />
          </div>
          <div className="btn">
            <Link to="/gamerule" className="how-btn">게임방법</Link>
            <Link to="/gamepage" className="start-btn">게임시작</Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path="/gamerule" component={GameRule} />
      </Routes>
    </Router>
  );
}

export default App;