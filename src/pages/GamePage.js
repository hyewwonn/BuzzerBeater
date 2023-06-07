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

  return (
    <div className={styles.box}>
      <div className={styles.top}>
        <div style={leftstyle} className={styles.score}>000</div>
        <div style={rightstyle} className={styles.timeClock}>TIME 00</div>
      </div>
      <div className={styles.ballsContainer}>
        <div className={styles.balls}>
          <Image className={styles.blueBall} src={bb} alt="blueball"/>
          <Image className={styles.orangeBall} src={ob} alt="orangeball"/>
          <Image className={styles.pinkBall} src={pb} alt="pinkball"/>
          <Image className={styles.greenBall} src={gb} alt="greenball"/>
        </div>
      </div>
      <div className={styles.goalPostsContainer}>
        <div className={styles.goalPosts}>
          <Image className={styles.blueGoalpost} src={bgp} alt="blue-goalpost"/>
          <Image className={styles.pinkGoalpost} src={pgp} alt="pink-goalpost"/>
          <Image className={styles.greenGoalpost} src={ggp} alt="green-goalpost"/>
          <Image className={styles.orangeGoalpost} src={ogp} alt="orange-goalpost"/>
        </div>
      </div>
    </div>
  );
}