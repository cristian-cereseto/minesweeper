import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '../src/redux/store';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import WelcomeForm from './containers/WelcomeForm/WelcomeForm';
import Board from './containers/Board/Board';

const App = () => {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <header className="App__header">
              <img src={logo} className="App__logo" alt="logo" />
              <p>
                <code>MINE SWEEPER</code>
              </p>
            </header>
            <Router>
              <Switch>
                <Route exact path="/">
                  <WelcomeForm />
                </Route>
                <Route exact path="/board">
                  <Board />
                </Route>
              </Switch>
            </Router>
          </div>
        </PersistGate>
      </Provider>
  );
}

export default App;
