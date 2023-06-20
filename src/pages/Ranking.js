import { useEffect, useState } from 'react';
import styles from '../styles/Ranking.module.css';

function Ranking() {

  return (
    <div className={styles.rankingContainer}>
      <div className={styles.ranking}>
        <h1 className={styles.title}>Ranking</h1>
        <div className={styles.ranks}>
          <div className={styles.ranktitle}>
            <p className={styles.titlename}>name</p>
            <p className={styles.titlescore}>score</p>
          </div>
          <div className={styles.rank} key={index}>
            <p className={styles.name}>{rank.name}</p>
            <p className={styles.score}>{rank.score}</p>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <a className={styles.a} href="MainPage">
            <button className={styles.btnMain}>처음으로</button>
          </a>
          <a className={styles.a} href="GamePage">
            <button className={styles.btnRestart}>다시하기</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Ranking;