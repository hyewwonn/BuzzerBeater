import React, { useState, useEffect } from 'react';
import styles from '../styles/GamePage.module.css';
import Image from 'next/image';
import bb from '../../public/img/blueball.png';
import pb from '../../public/img/pinkball.png';
import ob from '../../public/img/orangeball.png';
import gb from '../../public/img/greenball.png';
import bgp from '../../public/img/bluegoalpost.png';
import pgp from '../../public/img/pinkgoalpost.png';
import ogp from '../../public/img/orangegoalpost.png';
import ggp from '../../public/img/greengoalpost.png';

export default function GamePage() {
  const leftstyle = { float: 'left' };
  const rightstyle = { float: 'right' };
  const ballImages = [bb, pb, ob, gb];
  const [ballPosition, setBallPosition] = useState(0);
  const [ballImage, setBallImage] = useState(ballImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBallPosition(prevPosition => prevPosition + 2);
      setBallImage(ballImages[Math.floor(Math.random() * ballImages.length)]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.top}>
        <div style={leftstyle} className={styles.score}>000</div>
        <div style={rightstyle} className={styles.timeClock}>TIME 00</div>
      </div>
      <div className={styles.ballsContainer}>
        <div className={styles.balls} style={{ marginTop: `${ballPosition}px` }}>
          <Image className={styles.ball} src={ballImage} alt="ball" width={100} height={100} />
        </div>
      </div>
      <div className={styles.goalPostsContainer}>
        <div className={styles.goalPosts}>
          <Image className={styles.blueGoalpost} src={bgp} alt="blue-goalpost" />
          <Image className={styles.pinkGoalpost} src={pgp} alt="pink-goalpost" />
          <Image className={styles.greenGoalpost} src={ggp} alt="green-goalpost" />
          <Image className={styles.orangeGoalpost} src={ogp} alt="orange-goalpost" />
        </div>
      </div>
    </div>
  );
}
