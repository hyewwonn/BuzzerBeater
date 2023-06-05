import React from 'react';
import '../css/MainPage.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameRule from '../pages/GameRule';
import GamePage from '../pages/GamePage';
import logo from '../img/logo.png';
import goalpost from '../img/goalpost.png';
import bb from '../img/blueball.png';
import pb from '../img/pinkball.png';
import ob from '../img/orangeball.png';
import gb from '../img/greenball.png';
import c1 from '../img/cloud1.png';
import c2 from '../img/cloud2.png';

function App() {
  return (
    <Router>
      <div className="Main-wrapper">
        <div className="container">
          <div className="bg-container">
            <img className="cloud c1" src={c1} alt="cloud" />
            <img className="cloud c2" src={c2} alt="cloud" />
            <img className="goalpost" src={goalpost} alt="goalpost" />
            <img className="blueball" src={bb} alt="blueball" />
            <img className="orangeball" src={ob} alt="orangeball" />
            <img className="pinkball" src={pb} alt="pinkball" />
            <img className="greenball" src={gb} alt="greenball" />
          </div>
          <div className="logo">
            <Link to="/" className='main'>
            <img className="logo-img" src={logo} alt="logo" /></Link>
          </div>
          <div className="btn">
            <Link to="/gamerule" className="how-btn">게임방법</Link>
            <Link to="/gamepage" className="start-btn">게임시작</Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/gamerule" element={<GameRule/>} />
        <Route path="/gamepage" element={<GamePage/>} />
      </Routes>
    </Router>
  );
}

export default App;