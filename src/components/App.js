import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

//import PrivateRoute from './PrivateRoute';
//import Header from './Header';
//import Login from './Login';
//import Logout from './Logout';
//import Users from './Users';

const NoMatch = ({ location }) => (
  <div>
    <strong>Error!</strong> No route found matching:
    <code>{location.pathname}</code>
  </div>
);

const App = () => {
  <Grid container>
    <Grid item xs={2}></Grid>
    <Grid item xs={8}>
      // <Header />
      <Switch>
        // <PrivateRoute path='/users' component={Users}/>
        // <Route path='/login' component={Login} />
        // <Route path='/logout' component={Logout} />
        // <Route exact path='/' render={() => (
        //   <Redirect
        //     to='/home'
        //   />
        // )} />

        <Route component={NoMatch} />
      </Switch>

    </Grid>
    <Grid item xs={2}></Grid>
  </Grid>
}

export default App;
