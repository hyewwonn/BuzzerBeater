import React, { useRef, useEffect } from 'react';
import styles from '../styles/MainPage.module.css';
import Image from 'next/image';
import logo from '../../public/img/logo.png';
import goalpost from '../../public/img/goalpost.png';
import bb from '../../public/img/blueball.png';
import pb from '../../public/img/pinkball.png';
import ob from '../../public/img/orangeball.png';
import gb from '../../public/img/greenball.png';
import c1 from '../../public/img/cloud1.png';
import c2 from '../../public/img/cloud2.png';
import c3 from '../../public/img/cloud3.png';
import trophy from '../../public/img/trophy.svg';
import basicSound from '../../public/audio/basicSound.mp3';
import btnSound from '../../public/audio/btnClickSound.mp3';

function App() {
  const audioRef = useRef(null);
  const btnAudioRef = useRef(null);

  useEffect(() => {
    audioRef.current.play();
  }, []);

  const handleClick = () => {
    btnAudioRef.current.play();
  };

  return (
    <div className={styles['Main-wrapper']}>
      <div className={styles.container}>
        <div className={styles['bg-container']}>
          <Image className={`${styles.cloud} ${styles.c1}`} src={c1} alt="cloud" />
          <Image className={`${styles.cloud} ${styles.c2}`} src={c2} alt="cloud" />
          <Image className={`${styles.cloudStart} ${styles.c3}`} src={c3} alt="cloud" />
          <Image className={styles.goalpost} src={goalpost} alt="goalpost" />
          <Image className={styles.blueball} src={bb} alt="blueball" />
          <Image className={styles.orangeball} src={ob} alt="orangeball" />
          <Image className={styles.pinkball} src={pb} alt="pinkball" />
          <Image className={styles.greenball} src={gb} alt="greenball" />
        </div>
        <div className={styles.logo}>
          <Image className={`${styles['logo-img']}`} src={logo} alt="logo" />
        </div>
        <div className={styles.btn}>
          <a className={styles.a} href="RulePage">
            <button className={styles['how-btn']} onClick={handleClick}>
              게임방법
            </button>
          </a>
          <a className={styles.a} href="GamePage">
            <button className={styles['start-btn']} onClick={handleClick}>
              게임시작
            </button>
          </a>
        </div>
        <div className={styles.rankingbtn}>
          <a className={styles.a} href="Ranking">
            <button className={styles['ranking-btn']} onClick={handleClick}>
              <Image className={styles['ranking-icon']} src={trophy} alt="trophy" />
            </button>
          </a>
        </div>
      </div>
      <audio ref={audioRef} src={basicSound} autoPlay loop />
      <audio ref={btnAudioRef} src={btnSound} />
    </div>
  );
}

export default App;