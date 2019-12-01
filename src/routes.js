import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './components/App';
import Name from './components/Name';

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={App}></Route>
      <Route exact path='/name' component={Name}></Route>
    </Switch>
  );
}

export default Routes;