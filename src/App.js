import React from 'react';
import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <img src={logo} className="App__logo" alt="logo" />
        <p>
          <code>MINE SWEEPER</code>
        </p>
        <div className="App__welcome-form">
          <label htmlFor="width">Width</label>
          <input type="number" id="width"/>
          <label htmlFor="height">Height</label>
          <input type="number" id="height"/>
          <label htmlFor="mines">Mines Amount</label>
          <input type="number" id="mines"/>
        </div>
        <a
            className="App__link"
            href="#"
            rel="noopener noreferrer"
        >
          Start
        </a>
      </header>
    </div>
  );
}

export default App;
