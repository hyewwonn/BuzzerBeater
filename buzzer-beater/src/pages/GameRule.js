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
        
      </div>
    </div>
  );
}

export default GameRule;
