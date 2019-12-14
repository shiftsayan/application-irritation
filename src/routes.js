import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import Hello from './components/Hello';
import Name from './components/Name';
import Birthday from  './components/Birthday';

function Routes() {
  return (
    <App >
      <Switch>
        <Route exact path='/' component={Hello} />
        <Route exact path='/name' component={Name} />
        <Route exact path='/birthday' component={Birthday} />
      </Switch>
    </App>
  );
}

export default Routes;