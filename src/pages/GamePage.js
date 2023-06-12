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
  const getColorAltText = (color) => {
    if (color === bb) {
      return 'blue';
    } else if (color === pb) {
      return 'pink';
    } else if (color === ob) {
      return 'orange';
    } else if (color === gb) {
      return 'green';
    }
  };

  const colorAlt = getColorAltText(image);

  return (
    <div className={styles.ball}>
      <Image src={image} alt={colorAlt} className={styles.ballImg} />
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
  const [score, setScore] = useState(0);

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

      setTime(60);
      setIsSoundPlaying(true);
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

  // Ball 컴포넌트에서 getColorAltText 함수를 가져오도록 수정
const getColorAltText = (color) => {
  if (color === bb) {
    return 'blue';
  } else if (color === pb) {
    return 'pink';
  } else if (color === ob) {
    return 'orange';
  } else if (color === gb) {
    return 'green';
  }
};

// handleGoalClick 함수에서 getColorAltText를 가져와 사용
const handleGoalClick = (goalColor) => {
  const currentBallColor = getColorAltText(ballsQueue[0]); // 현재 나오고 있는 공의 색깔

  if (currentBallColor === goalColor) {
    // 색상이 일치하는 경우
    setScore((prevScore) => prevScore + 1);
    console.log(`[${currentBallColor}] 골대에 골을 넣었습니다.`);
    // 실제로 골을 넣는 동작을 구현하세요.
  } else {
    console.log("선택한 골대의 색깔과 공의 색깔이 다릅니다.");
    // 다른 색상이면 튕겨나가는 애니메이션 등을 구현할 수 있습니다.
  }
};

  
  useEffect(() => {
    const currentBallColor = ballsQueue[0]; // 현재 나오고 있는 공의 색깔
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        if (currentBallColor == gb) {
          console.log('연두색 공!!!');
        } else {
          return;
        }
      } else if (event.key === 'ArrowDown') {
        if (currentBallColor == bb) {
          console.log('파란색 공!!!');
        } else {
          return;
        }
      } else if (event.key === 'ArrowRight') {
        if (currentBallColor == ob) {
          console.log('주황색 공!!!');
        } else {
          return;
        }
      } else if (event.key === 'ArrowLeft') {
        if (currentBallColor == pb) {
          console.log('분홍색 공!!!');
        } else {
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const insertBallToBasket = (color) => {
    setScore((prevScore) => prevScore + 1);
    if(`${color}`=='green') {
      console.log(`[${color}] 골대에 골을 넣었습니다.`);
    } else if(`${color}`=='blue') {
      console.log(`[${color}] 골대에 골을 넣었습니다.`);
    } else if(`${color}`=='orange') {
      console.log(`[${color}] 골대에 골을 넣었습니다.`);
    } else if(`${color}`=='pink') {
      console.log(`[${color}] 골대에 골을 넣었습니다.`);
    }
  };

  return (
    <div className={styles.box}>
      <Howler src={gameSound} playing={isSoundPlaying} loop={true} />
      <div className={styles.top}>
        <div style={leftstyle} className={styles.score}>
          {`${score}`}
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
      <Image className={styles.blueGoalpost} src={bgp} alt="blue-goalpost" onClick={() => handleGoalClick('blue')} />
      <Image className={styles.pinkGoalpost} src={pgp} alt="pink-goalpost" onClick={() => handleGoalClick('pink')} />
      <Image className={styles.greenGoalpost} src={ggp} alt="green-goalpost" onClick={() => handleGoalClick('green')} />
      <Image className={styles.orangeGoalpost} src={ogp} alt="orange-goalpost" onClick={() => handleGoalClick('orange')} />
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