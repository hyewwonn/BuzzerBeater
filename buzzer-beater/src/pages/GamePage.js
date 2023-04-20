import React from "react";
import '../css/GamePage.css';
import bb from '../img/blueball.png';
import pb from '../img/pinkball.png';
import ob from '../img/orangeball.png';
import gb from '../img/greenball.png';
import bgp from '../img/bluegoalpost.png';
import pgp from '../img/pinkgoalpost.png';
import ogp from '../img/orangegoalpost.png';
import ggp from '../img/greengoalpost.png';

export default function GamePage() {
  return (
    <div className="box">
      <div className="score"></div>
      <div className="time-clock"></div>
      <div className="balls">
        <img className="blueball" src={bb} alt="blueball"/>
        <img className="orangeball" src={ob} alt="orangeball"/>
        <img className="pinkball" src={pb} alt="pinkball"/>
        <img className="greenball" src={gb} alt="greenball"/>
      </div>
      <div className="goal-posts">
        <img className="blue-goalpost" src={bgp} alt="blue-goalpost"/>
        <img className="orange-goalpost" src={ogp} alt="orange-goalpost"/>
        <img className="pink-goalpost" src={pgp} alt="pink-goalpost"/>
        <img className="green-goalpost" src={ggp} alt="green-goalpost"/>
      </div>
      <div className="buttons">
        <button className="up-btn">↑</button>
        <button className="down-btn">↓</button>
        <button className="left-btn">←</button>
        <button className="right-btn">→</button>
      </div>
    </div>
  );
}