import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import styles from '../styles/Ranking.module.css';
import { collection, getFirestore, getDocs } from "firebase/firestore";

function Ranking() {
  const [rankings, setRankings] = useState([]);
  const db = getFirestore(firebase);
  const rank = 1;

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const rankingsCollectionRef = collection(db, "ranking");
        const querySnapshot = await getDocs(rankingsCollectionRef);
    
        const rankingData = querySnapshot.docs.map((doc) => doc.data());
        const sortedRankings = rankingData.sort((a, b) => b.score - a.score);
    
        let currentRank = 1;
        let prevScore = null;
        const rankingsWithRank = sortedRankings.map((ranking) => {
          if (ranking.score !== prevScore) {
            prevScore = ranking.score;
            ranking.rank = currentRank;
          }
          currentRank++;
          return ranking;
        });
    
        setRankings(rankingsWithRank);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };
    
  
    fetchRankings();
  }, []);
  
  

  return (
  <div className={styles.rankingContainer}>
    <div className={styles.ranking}>
      <h1 className={styles.title}>Ranking</h1>
      <div className={styles.ranks}>
        <div className={styles.ranktitle} key="ranktitle">
          <p className={styles.titlerank}>Rank</p>
          <p className={styles.titlename}>Name</p>
          <p className={styles.titlescore}>Score</p>
        </div>
        {rankings.map((ranking, index) => {
          const prevRanking = rankings[index - 1];
          const currentRank = prevRanking && prevRanking.score === ranking.score ? prevRanking.rank : index + 1;

          return (
            <div key={ranking.id} className={styles.rank}>
              <p className={styles.gameRank}>{currentRank}</p>
              <p className={styles.name}>{ranking.name}</p>
              <p className={styles.score}>{ranking.score}</p>
            </div>
          );
        })}
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
