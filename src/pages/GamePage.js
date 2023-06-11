import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/GamePage.module.css';
import Image from 'next/image';
import Howler from 'react-howler';
import bb from '../../public/img/blueball.png';
import pb from '../../public/img/pinkball2.png';
import ob from '../../public/img/orangeball.png';
import gb from '../../public/img/greenball2.png';
import bgp from '../../public/img/bluegoalpost.png';
import pgp from '../../public/img/pinkgoalpost.png';
import ogp from '../../public/img/orangegoalpost.png';
import ggp from '../../public/img/greengoalpost.png';
import gameSound from '../../public/audio/gameSound.mp3';
import countDown from '../../public/audio/countDown.mp3';

const Ball = ({ image }) => {
  return (
    <div className={styles.ball}>
      <Image src={image} alt="ball" className={styles.ballImg} />
    </div>
  );
};

export default function GamePage() {
  const leftstyle = { float: 'left' };
  const rightstyle = { float: 'right' };
  const ballImages = [bb, pb, ob, gb];
  const [ballsQueue, setBallsQueue] = useState([]);
  const [time, setTime] = useState(60);
  const [startCountdown, setStartCountdown] = useState(3);
  const [showStart, setShowStart] = useState(true);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (startCountdown > 0) {
      intervalRef.current = setInterval(() => {
        setStartCountdown(prevCount => prevCount - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setShowStart(false);
  
      setTimeout(() => {
        setBallsQueue(Array(5).fill().map(() => {
          const randomImage =
            ballImages[Math.floor(Math.random() * ballImages.length)];
          return randomImage;
        }));
        setTime(60);
        setIsSoundPlaying(true); // 사운드 재생을 지연시키기 위해 setTimeout 안으로 이동합니다.
      }, 1000);
  
      intervalRef.current = setInterval(() => {
        setBallsQueue(prevBallsQueue => {
          if (prevBallsQueue.length === 5) {
            clearInterval(intervalRef.current);
            return prevBallsQueue;
          }
          const randomImage =
            ballImages[Math.floor(Math.random() * ballImages.length)];
          const newBallsQueue = [randomImage, ...prevBallsQueue];
          return newBallsQueue;
        });
      }, 1000);
    }
  
    return () => clearInterval(intervalRef.current);
  }, [startCountdown]);

  useEffect(() => {
    if (!showStart && time > 0) {
      const interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          if (newTime === 0) {
            setIsSoundPlaying(false);
            clearInterval(intervalRef.current);
            setBallsQueue([]);
          }
          return newTime < 0 ? 0 : newTime;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showStart, time]);

  useEffect(() => {
    if (showStart && startCountdown === 3) {
      const countDownAudio = new Audio(countDown);
      countDownAudio.play().catch(error => {
        console.log('Error playing countDown audio:', error);
      });
    }
  }, [showStart, startCountdown]);

  return (
    <div className={styles.box}>
      <Howler src={gameSound} playing={isSoundPlaying} loop={true} />
      <div className={styles.top}>
        <div style={leftstyle} className={styles.score}>
          000
        </div>
        <div style={rightstyle} className={styles.timeClock}>
          TIME {time < 10 ? `0${time}` : time}
        </div>
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
      {showStart && (
        <div className={styles.startCountdown}>{startCountdown}</div>
      )}
      {!showStart && time === 60 && (
        <div className={styles.startText}>START</div>
      )}
    </div>
  );
}
