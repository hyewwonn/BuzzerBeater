import bg from './img/bg1.png';
import logo from './img/logo.png';
import goalpost from './img/goalpost.png';
import bb from './img/blueball.png';
import pb from './img/pinkball.png';
import ob from './img/orangeball.png';
import gb from './img/greenball.png';
import be from './img/b-effect.png';
import pe from './img/p-effect.png';
import oe from './img/o-effect.png';
import ge from './img/g-effect.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="bg-container">
          <img className="goalpost" src={goalpost} />
          <img className="blueball" src={bb} />
          <img className="orangeball" src={ob} />
          <img className="pinkball" src={pb} />
          <img className="greenball" src={gb} />
        </div>
        <div className="logo">
          <img className="logo-img" src={logo}/>
        </div>
        <div className="btn">
          <div className="how-btn">게임방법</div>
          <div className="start-btn">게임시작</div>
        </div>
      </div>
    </div>
  );
}

export default App;
