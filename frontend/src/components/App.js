import React from 'react';
import '../stylesheets/App.css';

function App(props) {
  return (
    <div className="App">
      { props.children }
    </div>
  );
}

export default App;
