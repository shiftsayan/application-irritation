import React from 'react';
import '../stylesheets/App.css';
import BackArrow from './BackArrow';
import ForwardArrow from './ForwardArrow';

function App() {
  return (
    <div className="App">
      <BackArrow />
      <ForwardArrow url="/name"/>
      <header className="App-header">
        Hello!
      </header>
    </div>
  );
}

export default App;
