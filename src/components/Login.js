import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

//import { client } from '../lib/Client';

class Login extends Component {
  state = {
    loginInProgress: false,
    shouldRedirect: false,
  };

  performLogin = () => {
    this.setState({ loginInProgress: true });
    // await client.login();
    this.setState({ shouldRedirect: true });
  };

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    return pathname || '/users';
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.redirectPath()} />
      );
    } else {
      return (
        <main style={{flexGrow:1}}>
          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Card>
                <CardHeader
                  title="Login"
                />
                <CardContent>
                  {
                    this.state.loginInProgress ? (
                      <div>Loading...</div>
                    ) : (
                      <div>
                        Form para preenchimento
                        <div
                          onClick={this.performLogin}
                        >
                          Click para logar
                        </div>
                      </div>
                    )
                  }
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </main>
      );
    }
  }
}

export default Login;
