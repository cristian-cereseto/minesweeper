import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import logo from './logo.svg';
import './App.scss';
import WelcomeForm from './containers/WelcomeForm/WelcomeForm';

const App = () => {
  return (
      <Provider store={store}>
        <div className="App">
          <header className="App__header">
            <img src={logo} className="App__logo" alt="logo" />
            <p>
              <code>MINE SWEEPER</code>
            </p>
          </header>
          <div>
            <WelcomeForm />
          </div>
        </div>
      </Provider>
  );
}

export default App;
