import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import Hello from './components/Hello';
import Name from './components/Name';
import Gender from  './components/Gender';
import Picture from  './components/Picture';

function Routes() {
  return (
    <App >
      <Switch>
        <Route exact path='/' component={Hello} />
        <Route exact path='/name' component={Name} />
        <Route exact path='/gender' component={Gender} />
        <Route exact path='/picture' component={Picture} />
      </Switch>
    </App>
  );
}

export default Routes;