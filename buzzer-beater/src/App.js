import bg from './img/bg1.png';
import logo from './img/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="bg-container">
          <img className="background" src={bg}></img>
        </div>
        <div className="logo">
          <img className="logo-img" src={logo}></img>
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
