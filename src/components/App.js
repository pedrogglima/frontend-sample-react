import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import PrivateRoute from './PrivateRoute';
import Header from './Header';
import Login from './Login';
import Logout from './Logout';
import Users from './Users';
import User from './User';

import { client } from '../lib/Client';

class App extends Component {
  state = {
    isLoggedIn: client.isLoggedIn(),
  }

  performLogin = async (login, password) => {
    try {
      await client.login(login, password);
      this.setState({ isLoggedIn: true });
    } catch (err) {
      throw err;
    }
  }

  performLogout = () => {
    client.logout();
    this.setState({ isLoggedIn: false });
  }

  noMatch = ({ location }) => (
    <div>
      <strong>Error!</strong> No route found matching:
      <code>{location.pathname}</code>
    </div>
  );

  render() {
    return(
      <Grid container>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          onLogoutClick={this.performLogout}
        />
        <main style={{flexGrow:1}}>
          <Switch>
            <PrivateRoute path='/users/:id' component={User} />
            <PrivateRoute path='/users' component={Users} />
            <Route
              path='/login'
              render={(props) =>
                <Login
                  {...props}
                  performLogin={this.performLogin}
                />
              }
            />
            <Route path='/logout' component={Logout} />
            <Route exact path='/' render={() => (
              <Redirect
                to='/users'
              />
            )} />

            <Route component={this.noMatch} />
          </Switch>
        </main>
      </Grid>
    );
  }
}

export default App;
