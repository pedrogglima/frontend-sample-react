import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import PrivateRoute from './PrivateRoute';
import Header from './Header';
import Login from './Login';
import Logout from './Logout';
import Users from './Users';
import User from './User';
//import Users from './User';

const NoMatch = ({ location }) => (
  <div>
    <strong>Error!</strong> No route found matching:
    <code>{location.pathname}</code>
  </div>
);

const App = () => (
  <Grid container>
    <Header />
    <main style={{flexGrow:1}}>
      <Switch>
        <Route path='/user' component={User} />
        <PrivateRoute path='/users' component={Users} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route exact path='/' render={() => (
          <Redirect
            to='/user'
          />
        )} />

        <Route component={NoMatch} />
      </Switch>
    </main>
  </Grid>
);

export default App;
