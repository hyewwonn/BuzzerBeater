import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
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
import firebase from '../../firebase';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const getRandomBallColor = () => {
  const colors = [gb, bb, ob, pb];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Ball = ({ image, isActive }) => {
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
  const animationClass = isActive
    ? getColorAltText(image) === 'blue'
      ? styles.blueAnimation
      : getColorAltText(image) === 'pink'
      ? styles.pinkAnimation
      : getColorAltText(image) === 'green'
      ? styles.greenAnimation
      : styles.orangeAnimation
    : '';

  return (
    <div className={`${styles.ball} ${isActive ? styles.active : ''} ${animationClass}`}>
      <Image src={image} alt={colorAlt} className={styles.ballImg} />
    </div>
  );
};

function getPosition(element) {
  const rect = element.getBoundingClientRect();
  const { left, top } = rect;
  return { x: left, y: top };
}

function GamePage() {
  const leftstyle = { float: 'left' };
  const rightstyle = { float: 'right' };
  const ballImages = [bb, pb, ob, gb];
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const modal = useRef(null);
  const router = useRouter();
  const [ballsQueue, setBallsQueue] = useState([]);
  const [time, setTime] = useState(60);
  const [startCountdown, setStartCountdown] = useState(3);
  const [showStart, setShowStart] = useState(true);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const intervalRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isGoalActive, setIsGoalActive] = useState(false);
  const goalRef = useRef(null);
  const [goalPosition, setGoalPosition] = useState({ x: 0, y: 0 });
  const db = getFirestore(firebase);

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
          const newTime = prevTime;
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

  // let isGoalScored = false; // 골이 이미 득점되었는지 여부를 추적하는 플래그
  // let isClickable = true; // 클릭 가능한 상태를 추적하는 플래그
  
  // // handleGoalClick 함수에서 getColorAltText를 가져와 사용
  // const handleGoalClick = (goalColor) => {
  //   const currentBallColor = getColorAltText(ballsQueue[0]); // 현재 나오고 있는 공의 색깔
  
  //   if (currentBallColor === goalColor && !isGoalScored) {
  //     // 색상이 일치하고 골이 아직 득점되지 않았을 경우
  //     setScore((prevScore) => prevScore + 2);
  //     console.log(`[${currentBallColor}] 골대에 골을 넣었습니다.`);
  //     // 실제로 골을 넣는 동작을 구현하세요.
  //     setIsGoalActive(true);
  //     // 득점되었음을 표시하기 위한 플래그를 설정합니다.
  //     isGoalScored = true;

  //     // 일정 시간 후에 애니메이션 클래스를 제거
  //     setTimeout(() => {
  //       setIsGoalActive(false);
  //       setBallsQueue((prevQueue) => {
  //         // 첫번째 공을 제외한 나머지 공들을 앞으로 당김
  //         const updatedQueue = prevQueue.slice(1);
  //         // 마지막에 새로운 랜덤 공 추가
  //         const newBallColor = getRandomBallColor();
  //         return [...updatedQueue, newBallColor];
  //       });
  //       // 애니메이션이 완료된 후에 플래그를 재설정합니다.
  //       isGoalScored = false;
  //     }, 500);
  //   } else {
  //     console.log("선택한 골대의 색깔과 공의 색깔이 다릅니다.");
  //     isClickable = false;
  //     setTimeout(() => {
  //       isClickable = true;
  //     }, 500);
  //   }
  // };
  
  useEffect(() => {
    const currentBallColor = ballsQueue[0]; // 현재 나오고 있는 공의 색깔
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        if (currentBallColor === gb) {
          setScore((prevScore) => prevScore + 2);
          console.log('연두색 골대에 골을 넣었습니다.');
          // 실제로 골을 넣는 동작을 구현하세요.
          setIsGoalActive(true);
          // 바로 공을 제거하고 다음 공을 추가
          setBallsQueue((prevQueue) => {
            const updatedQueue = prevQueue.slice(1); // 첫번째 공을 제외한 나머지 공들을 앞으로 당김
            const newBallColor = getRandomBallColor(); // 마지막에 새로운 랜덤 공 추가
            return [...updatedQueue, newBallColor];
          });
        } else if (currentBallColor === bb || currentBallColor === ob || currentBallColor === pb) {
          setScore((prevScore) => prevScore + 0);
          console.log('잘못된 색깔의 골대를 골랐습니다.');
        }
      } else if (event.key === 'ArrowLeft') {
        if (currentBallColor === bb) {
          setScore((prevScore) => prevScore + 2);
          console.log('파란색 골대에 골을 넣었습니다.');
          // 실제로 골을 넣는 동작을 구현하세요.
          setIsGoalActive(true);
          // 바로 공을 제거하고 다음 공을 추가
          setBallsQueue((prevQueue) => {
            const updatedQueue = prevQueue.slice(1); // 첫번째 공을 제외한 나머지 공들을 앞으로 당김
            const newBallColor = getRandomBallColor(); // 마지막에 새로운 랜덤 공 추가
            return [...updatedQueue, newBallColor];
          });
        } else if (currentBallColor === gb || currentBallColor === ob || currentBallColor === pb) {
          setScore((prevScore) => prevScore + 0);
          console.log('잘못된 색깔의 골대를 골랐습니다.');
        }
      } else if (event.key === 'ArrowRight') {
        if (currentBallColor === ob) {
          setScore((prevScore) => prevScore + 2);
          console.log('주황색 골대에 골을 넣었습니다.');
          // 실제로 골을 넣는 동작을 구현하세요.
          setIsGoalActive(true);
          // 바로 공을 제거하고 다음 공을 추가
          setBallsQueue((prevQueue) => {
            const updatedQueue = prevQueue.slice(1); // 첫번째 공을 제외한 나머지 공들을 앞으로 당김
            const newBallColor = getRandomBallColor(); // 마지막에 새로운 랜덤 공 추가
            return [...updatedQueue, newBallColor];
          });
        } else if (currentBallColor === gb || currentBallColor === bb || currentBallColor === pb) {
          setScore((prevScore) => prevScore + 0);
          console.log('잘못된 색깔의 골대를 골랐습니다.');
        }
      } else if (event.key === 'ArrowUp') {
        if (currentBallColor === pb) {
          setScore((prevScore) => prevScore + 2);
          console.log('분홍색 골대에 골을 넣었습니다.');
          // 실제로 골을 넣는 동작을 구현하세요.
          setIsGoalActive(true);
          // 바로 공을 제거하고 다음 공을 추가
          setBallsQueue((prevQueue) => {
            const updatedQueue = prevQueue.slice(1); // 첫번째 공을 제외한 나머지 공들을 앞으로 당김
            const newBallColor = getRandomBallColor(); // 마지막에 새로운 랜덤 공 추가
            return [...updatedQueue, newBallColor];
          });
        } else if (currentBallColor === gb || currentBallColor === bb || currentBallColor === ob) {
          setScore((prevScore) => prevScore + 0);
          console.log('잘못된 색깔의 골대를 골랐습니다.');
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ballsQueue]);
  
  
  // useEffect(() => {
  //   const goalElement = goalRef.current;
  //   const { x, y } = getPosition(goalElement);
  //   console.log('Goal position - x:', x, 'y:', y);
  //   setGoalPosition({ x, y });
  // }, []);

  // modal
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 10) {
      setName(inputValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await setDoc(doc(db, "ranking", name), {
        name: name,
        score: score
      });
      console.log('Document written with ID:', score.toString());
    } catch (error) {
      console.error('Error adding document:', error);
    }
  
    setShowModal(false);
    router.push('/Ranking');
  };
  
  useEffect(() => {
    if (!showStart && time > 0) {
      const interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          if (newTime === 0) {
            setIsSoundPlaying(false);
            clearInterval(intervalRef.current);
            setBallsQueue([]);
            setShowModal(true);
          }
          return newTime < 0 ? 0 : newTime;
        });
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }
  }, [showStart, time]);  

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
              <Ball key={index} image={image} isActive={index === 0 && isGoalActive}/>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.goalPostsContainer}>
        <div className={styles.goalPosts}>
          <Image className={styles.blueGoalpost} ref={goalRef} src={bgp} alt="blue-goalpost" onClick={() => handleGoalClick('blue')} />
          <Image className={styles.pinkGoalpost} ref={goalRef} src={pgp} alt="pink-goalpost" onClick={() => handleGoalClick('pink')} />
          <Image className={styles.greenGoalpost} ref={goalRef} src={ggp} alt="green-goalpost" onClick={() => handleGoalClick('green')} />
          <Image className={styles.orangeGoalpost} ref={goalRef} src={ogp} alt="orange-goalpost" onClick={() => handleGoalClick('orange')} />
        </div>
      </div>
      {showStart && (
        <div className={styles.startCountdown}>{startCountdown}</div>
      )}
      {!showStart && time === 60 && (
        <div className={styles.startText}>START</div>
      )}
      {showModal && (
        <div className={styles.modal}>
          <form ref={modal} onSubmit={handleSubmit} className={styles.modalform}>
            <div className={styles.modalscore}>점수 : {score}</div>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={handleNameChange}
            />
            <p className={styles.warning}>이름을 입력하지 않으시면, 저장이 되지 않습니다.</p>
            <div className={styles.buttonContainer}>
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default GamePage;