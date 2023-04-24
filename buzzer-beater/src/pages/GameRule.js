// import React from 'react';
// // import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import '../css/GameRule.css';

// function GameRule() {
//   const handlePcButtonClick = () => {
//     window.location.href = '../pages/PCrule.js';
//   };

//   const handleMobileButtonClick = () => {
//     window.location.href = '../pages/MOBILErule.js';
//   };

//   return (
//     <div className="box">
//       <div className="content-box">
//       <div className="btn1">
//           <button type="button" className="pc" onClick={handlePcButtonClick}>PC</button>
//         </div>
//         <div className="btn2">
//           <button type="button" className="mobile" onClick={handleMobileButtonClick}>MOBILE</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GameRule;
import React from 'react';
import '../css/GameRule.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PCrule from '../pages/PCrule';
import MOBILErule from '../pages/MOBILErule';

function Menu(){
  return <div className="box">
  <div className="content-box">
    <div className="btn1">
      <Link to="/PCrule">
        <button type="button" className="pc">PC</button>
      </Link>
    </div>
    <div className="btn2">
      <Link to="/MOBILErule">
        <button type="button" className="mobile">MOBILE</button>
      </Link>
    </div>
  </div>
</div>
}

function GameRule() {
  return (
    <Router>
      <div className='GameRule'>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/pcrule" element={<PCrule/>} />
          <Route path="/mobilerule" element={<MOBILErule/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default GameRule;