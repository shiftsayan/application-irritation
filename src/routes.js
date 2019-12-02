import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import Hello from './components/Hello';
import Name from './components/Name';

function Routes() {
  return (
    <App >
      <Switch>
        <Route exact path='/' component={Hello} />
        <Route exact path='/name' component={Name} />
      </Switch>
    </App>
  );
}

export default Routes;