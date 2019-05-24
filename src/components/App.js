import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Redirect, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import PrivateRoute from './PrivateRoute';
import Header from './shared/Header';
import Login from './Login';
import Logout from './Logout';
import Users from './Users';
import User from './User';

import { client } from '../lib/client';

const styles = theme => ({
  main: {
    flexGrow: 1,
  },
});

class App extends Component {
  state = {
    isLoggedIn: client.isLoggedIn(),
  };

  performLogin = async (login, password) => {
    try {
      await client.login(login, password);
      this.setState({
        isLoggedIn: true,
      });
    } catch (err) {
      throw err;
    }
  };

  performLogout = () => {
    client.logout();
    this.setState({
      isLoggedIn: false,
    });
  };

  noMatch = ({ location }) => (
    <div>
      <strong>Error!</strong> No route found matching:
      <code>{location.pathname}</code>
    </div>
  );

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          onLogoutClick={this.performLogout}
        />
        <main className={classes.main}>
          <Switch>
            <PrivateRoute path="/users/:id" component={User} />
            <PrivateRoute path="/users" component={Users} />
            <Route
              path="/login"
              render={props => (
                <Login {...props} performLogin={this.performLogin} />
              )}
            />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" render={() => <Redirect to="/users" />} />

            <Route component={this.noMatch} />
          </Switch>
        </main>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
