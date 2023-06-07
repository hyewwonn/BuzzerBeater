import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ob from '../../public/img/orangeball.png';
import styles from '../styles/PCrule.module.css';
import mobileStyles from '../styles/MOBILErule.module.css';

function Rule() {
  const ballStyle = { float: 'left' };
  const [isMobile, setIsMobile] = useState(false); // 모바일인지 여부를 상태로 관리

  useEffect(() => {
    // 화면 크기 변화 감지
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={isMobile ? mobileStyles.box : styles.box}>
      <div className={isMobile ? mobileStyles['content-box'] : styles['content-box']}>
        <div className={isMobile ? mobileStyles.title : styles.title}>
          <div style={ballStyle}>
            {isMobile ? (
              <Image className={mobileStyles.ball} src={ob} alt="orangeball" />
            ) : (
              <Image className={styles.ball} src={ob} alt="orangeball" />
            )}
          </div>
          <div style={ballStyle}>
            <p>Rule</p>
          </div>
          <div>
            {isMobile ? (
              <Image className={mobileStyles.ball} src={ob} alt="orangeball" />
            ) : (
              <Image className={styles.ball} src={ob} alt="orangeball" />
            )}
          </div>
        </div>
        <div className={isMobile ? mobileStyles.main : styles.main}>
          <div className={isMobile ? mobileStyles.rule1 : styles.rule1}>
            <div className={isMobile ? mobileStyles.ruletit1 : styles.ruletit1}>
              경기규칙1.
            </div>
            <div className={isMobile ? mobileStyles.rulecon1 : styles.rulecon1}>
              {isMobile
                ? '농구골대를 터치해 농구공을 색깔에 따라 구분해 알맞은 골대에 넣기!'
                : '키보드 방향키를 사용해 농구공을 색깔에 따라 구분해 알맞은 골대에 넣기!'}
            </div>
          </div>
          <div className={isMobile ? mobileStyles.rule2 : styles.rule2}>
            <div className={isMobile ? mobileStyles.ruletit2 : styles.ruletit2}>
              경기규칙2.
            </div>
            <div className={isMobile ? mobileStyles.rulecon2 : styles.rulecon2}>
              농구공을 맞게 던지면 점수가 올라가고 Combo 획득!
            </div>
          </div>
          <div className={isMobile ? mobileStyles.tips : styles.tips}>
            <div className={isMobile ? mobileStyles.tip : styles.tip}>tip!</div>
            <div className={isMobile ? mobileStyles.tip1 : styles.tip1}>
              모여있는 농구공을 잘 보면서 색깔 예측하기!
            </div>
            <div className={isMobile ? mobileStyles.tip2 : styles.tip2}>
              Combo를 많이 쌓을수록 등수가 올라요!
            </div>
          </div>
          <div className={isMobile ? mobileStyles.ment : styles.ment}>
            마지막까지 최선을 다해서 버저비터를 노려보세요!
          </div>
        </div>
        <div className={isMobile ? mobileStyles.button : styles.button}>
          <a className={styles.a} href="MainPage"><button className={isMobile ? mobileStyles['btn-first'] : styles['btn-first']}>처음으로 </button></a>
          <a className={styles.a} href="GamePage"><button className={isMobile ? mobileStyles['btn-start'] : styles['btn-start']}>게임시작 </button></a>
        </div>
      </div>
    </div>
  );
}

export default Rule;