import React, { useState, useEffect } from 'react';
import styles from '../styles/GamePage.module.css';
import Image from 'next/image';
import bb from '../../public/img/blueball.png';
import pb from '../../public/img/pinkball2.png';
import ob from '../../public/img/orangeball.png';
import gb from '../../public/img/greenball2.png';
import bgp from '../../public/img/bluegoalpost.png';
import pgp from '../../public/img/pinkgoalpost.png';
import ogp from '../../public/img/orangegoalpost.png';
import ggp from '../../public/img/greengoalpost.png';

const Ball = ({ image }) => {
  return (
    <div className={styles.ball}>
      <Image src={image} alt="ball" width={100} height={100} />
    </div>
  );
};

export default function GamePage() {
  const leftstyle = { float: 'left' };
  const rightstyle = { float: 'right' };
  const ballImages = [bb, pb, ob, gb];
  const [ballsQueue, setBallsQueue] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomImage = ballImages[Math.floor(Math.random() * ballImages.length)];
      setBallsQueue(prevBallsQueue => {
        // 큐의 크기를 제한하고 가장 오래된 이미지를 제거합니다.
        const newBallsQueue = [...prevBallsQueue, randomImage].slice(-5);
        return newBallsQueue;
      });
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
        <div className={styles.ballBox}>
          <div className={styles.balls}>
            {ballsQueue.map((image, index) => (
              <Ball key={index} image={image} />
            ))}
          </div>
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
