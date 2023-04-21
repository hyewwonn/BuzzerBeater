import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../css/GameRule.css';

function GameRule() {
  const handlePcButtonClick = () => {
    window.location.href = '../pages/PCrule.js';
  };

  const handleMobileButtonClick = () => {
    window.location.href = 'mobile.html';
  };

  return (
      <div className="box">
        <div className="content-box">
          <div className="btn1">
            <button type="button" className="pc" onClick={handlePcButtonClick}>PC</button>
          </div>
          <div className="btn2">
            <button type="button" className="mobile" onClick={handleMobileButtonClick}>MOBILE</button>
          </div>
        </div>
    </div>
  );
}

export default GameRule;
