import React from 'react';
import XferForm from './transfer/XferForm';
import TransHistory from './transactionsHistory/TransHistory';

const logo = './assets/logo.jpg';

const App = props => {
  return (
    <div className="App">
      <header>
        <div className="container">
          <i className="icon"></i>
          <img className="appLogo" src={logo} alt="Peachtree Bank" />
        </div>
      </header>
      <main>
        <div className="container">
          <XferForm />
          <TransHistory />
        </div>
      </main>
    </div>
  );
};

export default App;
