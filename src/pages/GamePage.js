import React from "react";
import '../css/GamePage.css';
import bb from '../img/blueball.png';
import pb from '../img/pinkball2.png';
import ob from '../img/orangeball.png';
import gb from '../img/greenball2.png';
import bgp from '../img/bluegoalpost.png';
import pgp from '../img/pinkgoalpost.png';
import ogp from '../img/orangegoalpost.png';
import ggp from '../img/greengoalpost.png';

export default function GamePage() {
  const leftstyle = { float: 'left' };
  const rightstyle = { float: 'right' };

  return (
    <div className="box">
      <div className="top">
        <div style={leftstyle} className="score">000</div>
        <div style={rightstyle} className="time-clock">TIME 00</div>
      </div>
      <div className="balls">
        <img className="blueBall" src={bb} alt="blueball"/>
        <img className="orangeBall" src={ob} alt="orangeball"/>
        <img className="pinkBall" src={pb} alt="pinkball"/>
        <img className="greenBall" src={gb} alt="greenball"/>
      </div>
      <div className="goal-posts">
        <img className="blue-goalpost" src={bgp} alt="blue-goalpost"/>
        <img className="pink-goalpost" src={pgp} alt="pink-goalpost"/>
        <img className="green-goalpost" src={ggp} alt="green-goalpost"/>
        <img className="orange-goalpost" src={ogp} alt="orange-goalpost"/>
      </div>
    </div>
  );
}