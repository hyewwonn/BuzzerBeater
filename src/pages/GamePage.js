import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/GamePage.module.css';
import Image from 'next/image';
import Howler from 'react-howler'; // react-howler 라이브러리 임포트
import bb from '../../public/img/blueball.png';
import pb from '../../public/img/pinkball2.png';
import ob from '../../public/img/orangeball.png';
import gb from '../../public/img/greenball2.png';
import bgp from '../../public/img/bluegoalpost.png';
import pgp from '../../public/img/pinkgoalpost.png';
import ogp from '../../public/img/orangegoalpost.png';
import ggp from '../../public/img/greengoalpost.png';
import gameSound from '../../public/audio/gameSound.mp3';

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
  const [isSoundPlaying, setIsSoundPlaying] = useState(false); // 음악 재생 상태를 저장하는 상태 변수
  const intervalRef = useRef(null);

  useEffect(() => {
    // 게임 시작 전 카운트다운 처리
    if (startCountdown > 0) {
      intervalRef.current = setInterval(() => {
        setStartCountdown(prevCount => prevCount - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);

      setShowStart(false);

      // 1초 후에 5개의 랜덤한 공 추가
      setTimeout(() => {
        setBallsQueue(Array(5).fill().map(() => {
          const randomImage =
            ballImages[Math.floor(Math.random() * ballImages.length)];
          return randomImage;
        }));
      }, 1000);

      // 1초마다 공 추가
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

      // 60초 카운트다운 시작
      setTime(60);

      // 음악 재생 시작
      setIsSoundPlaying(true);
    }

    return () => clearInterval(intervalRef.current);
  }, [startCountdown]);

  useEffect(() => {
    // 게임 시작 후 타이머 처리
    if (!showStart && time > 0) {
      const interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          return newTime < 0 ? 0 : newTime;
        });
      }, 1000);

      if (time === 0) {
        clearInterval(intervalRef.current);
        setBallsQueue([]);
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [showStart, time]);

  return (
    <div className={styles.box}>
      {/* react-howler를 사용하여 음악을 재생 */}
      {isSoundPlaying && <Howler src={gameSound} playing={true} loop={true} />}
      
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
