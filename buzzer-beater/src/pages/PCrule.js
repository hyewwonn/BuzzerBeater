import React from 'react';
import '../css/PCrule.css';
import ob from '../img/orangeball.png';

function PCrule () {
    const ballStyle = { float: 'left' };
    return (
        <div className="box">
            <div className="content-box">
                <div className="title">
                    <div style={ballStyle}><img className="ball" src={ob} alt="orangeball" /></div>
                    <div style={ballStyle}><p>Rule</p></div>
                    <div><img className="ball" src={ob} alt="orangeball" /></div>
                </div>
                <div className="main">
                    <div className="rule1">
                        <div className="ruletit1">
                            경기규칙1.
                        </div>
                        <div className="rulecon1">
                            키보드 방향키를 사용해 농구공을 색깔에 따라 구분해 알맞은 골대에 넣기!
                        </div>
                    </div>
                    <div className="rule2">
                        <div className="ruletit2">
                            경기규칙2.
                        </div>
                        <div className="rulecon2">
                            농구공을 맞게 던지면 점수가 올라가고 Combo 획득!
                        </div>
                    </div>
                    <div className="tips">
                        <div className="tip">tip!</div>
                        <div className="tip1">
                            모여있는 농구공을 잘 보면서 색깔 예측하기!
                        </div>
                        <div className="tip2">
                            Combo를 많이 쌓을수록 등수가 올라요!
                        </div>
                    </div>
                    <div className="ment">
                        마지막까지 최선을 다해서 버저비터를 노려보세요!
                    </div>
                </div>
                <div className="button">
                    <button className="btn-first">처음으로</button>
                    <button className="btn-start">게임시작</button>
                </div>
            </div>
        </div>
    );
}

export default PCrule;
